#!/usr/bin/env tsx
/**
 * Best-effort public traffic estimate fetcher.
 *
 * Usage:
 *   npm run fetch-traffic
 *   npm run fetch-traffic -- --slug elevenlabs
 *   npm run fetch-traffic -- --dry-run
 *   npm run fetch-traffic -- --missing-only
 */
import { readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { basename, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import matter from 'gray-matter';

const ROOT = process.cwd();
const TOOLS_DIR = join(ROOT, 'src/content/tools');
const FETCH_TIMEOUT_MS = 18_000;
const USER_AGENT = 'Mozilla/5.0 (compatible; VoiceToolsDirectoryTrafficFetcher/0.1; +https://voice.tools/about)';
const MIN_CREDIBLE_VISITS = 1_000;
const BROAD_PRODUCT_PAGE_HOSTS = new Set([
  'openai.com',
  'platform.openai.com',
  'support.google.com',
  'twilio.com',
  'www.twilio.com',
]);
const COMMON_SECOND_LEVEL_TLDS = new Set(['co', 'com', 'net', 'org', 'gov', 'edu', 'ac']);
let rdapBootstrapCache: Promise<any> | null = null;

export type TrafficEstimate = {
  source: string;
  source_url: string;
  captured_at: string;
  period_label: string;
  visits_last_month?: number;
  monthly_visits: Array<{ month: string; visits: number; is_partial: boolean; note?: string }>;
  change_mom_percent?: number;
  bounce_rate_percent?: number;
  pages_per_visit?: number;
  avg_visit_duration?: string;
  domain_created_at?: string;
  domain_created_source_url?: string;
  global_rank?: number;
  country_rank?: number;
  country?: string;
  note?: string;
};

export type ToolFile = {
  slug: string;
  path: string;
  data: Record<string, any>;
  content: string;
};

export type FetchResult = {
  estimate?: TrafficEstimate;
  attempts: string[];
};

export type CliOptions = {
  slug?: string;
  dryRun: boolean;
  domainCreatedOnly: boolean;
  missingOnly: boolean;
};

export function parseArgs(argv: string[]): CliOptions {
  const options: CliOptions = { dryRun: false, domainCreatedOnly: false, missingOnly: false };
  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (arg === '--dry-run') {
      options.dryRun = true;
    } else if (arg === '--missing-only') {
      options.missingOnly = true;
    } else if (arg === '--domain-created-only') {
      options.domainCreatedOnly = true;
    } else if (arg === '--slug') {
      options.slug = argv[++i];
    } else if (arg.startsWith('--slug=')) {
      options.slug = arg.slice('--slug='.length);
    } else {
      throw new Error(`Unknown argument: ${arg}`);
    }
  }
  return options;
}

function readTools(onlySlug?: string): ToolFile[] {
  const tools = readdirSync(TOOLS_DIR)
    .filter((file) => file.endsWith('.md'))
    .sort()
    .map((file) => {
      const path = join(TOOLS_DIR, file);
      const parsed = matter(readFileSync(path, 'utf-8'));
      return {
        slug: basename(file, '.md'),
        path,
        data: parsed.data,
        content: parsed.content.trimStart(),
      };
    })
    .filter((tool) => !onlySlug || tool.slug === onlySlug);

  if (tools.length === 0) throw new Error(onlySlug ? `No tool found for slug "${onlySlug}"` : 'No tool files found');
  return tools;
}

function domainFromWebsite(url: string): { domain: string; skipReason?: string } | null {
  try {
    const parsed = new URL(url);
    if (!/^https?:$/.test(parsed.protocol)) return null;
    const host = parsed.hostname.toLowerCase().replace(/^www\./, '');
    if (!host || host === 'github.com') return null;
    const hasProductPath = parsed.pathname.replace(/\/+$/, '').length > 0;
    if (hasProductPath && BROAD_PRODUCT_PAGE_HOSTS.has(parsed.hostname.toLowerCase())) {
      return { domain: host, skipReason: `skipped: ${parsed.hostname} is a broad parent/support domain and cannot isolate this product page` };
    }
    return { domain: host };
  } catch {
    return null;
  }
}

function registrableDomain(hostname: string): string {
  const parts = hostname.toLowerCase().replace(/^www\./, '').split('.').filter(Boolean);
  if (parts.length <= 2) return parts.join('.');
  const tld = parts.at(-1) ?? '';
  const second = parts.at(-2) ?? '';
  if (tld.length === 2 && COMMON_SECOND_LEVEL_TLDS.has(second) && parts.length >= 3) {
    return parts.slice(-3).join('.');
  }
  return parts.slice(-2).join('.');
}

function todayIso(): string {
  return new Date().toISOString().slice(0, 10);
}

function formatMonth(value: string): string {
  const match = value.match(/^(\d{4})-(\d{2})/);
  return match ? `${match[1]}-${match[2]}` : value.slice(0, 7);
}

function parseCompactNumber(value: unknown): number | undefined {
  if (typeof value === 'number' && Number.isFinite(value)) return Math.round(value);
  if (typeof value !== 'string') return undefined;
  const normalized = value.replace(/,/g, '').trim();
  const match = normalized.match(/([0-9]+(?:\.[0-9]+)?)\s*([KMB])?/i);
  if (!match) return undefined;
  const base = Number(match[1]);
  if (!Number.isFinite(base)) return undefined;
  const unit = match[2]?.toUpperCase();
  const multiplier = unit === 'K' ? 1_000 : unit === 'M' ? 1_000_000 : unit === 'B' ? 1_000_000_000 : 1;
  return Math.round(base * multiplier);
}

function parsePercent(value: unknown): number | undefined {
  if (typeof value === 'number' && Number.isFinite(value)) return value > 0 && value <= 1 ? round(value * 100, 2) : round(value, 2);
  if (typeof value !== 'string') return undefined;
  const match = value.replace(/,/g, '').match(/-?[0-9]+(?:\.[0-9]+)?/);
  if (!match) return undefined;
  const parsed = Number(match[0]);
  return parsed > 0 && parsed <= 1 ? round(parsed * 100, 2) : round(parsed, 2);
}

function formatDuration(value: unknown): string | undefined {
  if (typeof value === 'string' && /^\d{1,2}:\d{2}(?::\d{2})?$/.test(value)) return value;
  const seconds = typeof value === 'number' ? value : typeof value === 'string' ? Number(value) : Number.NaN;
  if (!Number.isFinite(seconds) || seconds < 0) return undefined;
  const rounded = Math.round(seconds);
  const minutes = Math.floor(rounded / 60);
  const remainder = rounded % 60;
  return `${minutes}:${String(remainder).padStart(2, '0')}`;
}

function parseRank(value: unknown): number | undefined {
  const parsed = parseCompactNumber(value);
  return parsed && parsed > 0 ? parsed : undefined;
}

function round(value: number, digits: number): number {
  const factor = 10 ** digits;
  return Math.round(value * factor) / factor;
}

async function fetchText(url: string, accept = 'text/html,application/xhtml+xml,application/json;q=0.9,*/*;q=0.8'): Promise<string> {
  const res = await fetch(url, {
    redirect: 'follow',
    signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
    headers: {
      'Accept': accept,
      'User-Agent': USER_AGENT,
      'Accept-Language': 'en-US,en;q=0.9',
    },
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.text();
}

async function fetchDomainCreated(domain: string): Promise<Pick<TrafficEstimate, 'domain_created_at' | 'domain_created_source_url'> | null> {
  const rootDomain = registrableDomain(domain);
  const urls = await rdapUrlsForDomain(rootDomain);
  let lastError = '';
  for (const url of urls) {
    try {
      const text = await fetchText(url, 'application/rdap+json,application/json,text/plain;q=0.8,*/*;q=0.5');
      const data = JSON.parse(text);
      const created = extractDomainCreatedDate(data);
      if (!created) {
        lastError = `${url}: no creation date`;
        continue;
      }
      return {
        domain_created_at: created,
        domain_created_source_url: url,
      };
    } catch (error) {
      lastError = `${url}: ${error instanceof Error ? error.message : String(error)}`;
    }
  }
  if (lastError) throw new Error(lastError);
  return null;
}

function extractDomainCreatedDate(data: any): string | null {
  const registrationEvent = Array.isArray(data.events)
    ? data.events.find((event: any) => {
      const action = String(event.eventAction ?? '').toLowerCase();
      return ['registration', 'registered'].includes(action) || action.includes('registration');
    })
    : undefined;
  const created = registrationEvent?.eventDate;
  return typeof created === 'string' && /^\d{4}-\d{2}-\d{2}/.test(created) ? created.slice(0, 10) : null;
}

async function rdapUrlsForDomain(rootDomain: string): Promise<string[]> {
  const encodedDomain = encodeURIComponent(rootDomain);
  const urls = new Set<string>([`https://rdap.org/domain/${encodedDomain}`]);
  const tld = rootDomain.split('.').at(-1);
  if (!tld) return [...urls];
  try {
    rdapBootstrapCache ??= fetchText('https://data.iana.org/rdap/dns.json', 'application/json,text/plain;q=0.9,*/*;q=0.5')
      .then((text) => JSON.parse(text));
    const bootstrap = await rdapBootstrapCache;
    for (const service of bootstrap.services ?? []) {
      const tlds = service?.[0] ?? [];
      const serviceUrls = service?.[1] ?? [];
      if (!Array.isArray(tlds) || !Array.isArray(serviceUrls)) continue;
      if (!tlds.map((item: unknown) => String(item).toLowerCase()).includes(tld)) continue;
      for (const base of serviceUrls) {
        if (typeof base !== 'string') continue;
        urls.add(`${base.replace(/\/+$/, '')}/domain/${encodedDomain}`);
      }
    }
  } catch {
    // Keep rdap.org as the fallback if the bootstrap file is unavailable.
  }
  return [...urls];
}

async function fetchSimilarwebDataApi(domain: string, capturedAt: string): Promise<TrafficEstimate | null> {
  const url = `https://data.similarweb.com/api/v1/data?domain=${encodeURIComponent(domain)}`;
  const text = await fetchText(url, 'application/json,text/plain;q=0.9,*/*;q=0.8');
  const data = JSON.parse(text);
  const monthlyRaw = data.EstimatedMonthlyVisits ?? data.estimatedMonthlyVisits ?? data.estimated_monthly_visits;
  const monthly = objectMonthlyVisits(monthlyRaw);
  const visits = parseCompactNumber(data.Engagments?.Visits ?? data.engagements?.visits ?? data.visits);
  const bounce = parsePercent(data.Engagments?.BounceRate ?? data.engagements?.bounceRate ?? data.bounce_rate);
  const pages = typeof data.Engagments?.PagePerVisit === 'string'
    ? Number(data.Engagments.PagePerVisit)
    : Number(data.Engagments?.PagesPerVisit ?? data.engagements?.pagesPerVisit);
  const duration = formatDuration(data.Engagments?.TimeOnSite ?? data.engagements?.avgVisitDuration);
  const last = monthly.at(-1)?.visits ?? visits;
  if ((!last || last < MIN_CREDIBLE_VISITS) && monthly.length === 0) return null;

  return {
    source: 'Similarweb public data endpoint',
    source_url: url,
    captured_at: capturedAt,
    period_label: monthly.at(-1)?.month ?? 'Latest public estimate',
    visits_last_month: last,
    monthly_visits: monthly,
    bounce_rate_percent: bounce,
    pages_per_visit: Number.isFinite(pages) ? round(pages, 2) : undefined,
    avg_visit_duration: duration,
    global_rank: parseRank(data.GlobalRank?.Rank ?? data.global_rank),
    country_rank: parseRank(data.CountryRank?.Rank ?? data.country_rank),
    country: typeof data.CountryRank?.Country === 'string' ? data.CountryRank.Country : undefined,
    note: 'Public web-traffic estimate; use directionally, not as audited analytics.',
  };
}

function objectMonthlyVisits(value: unknown): TrafficEstimate['monthly_visits'] {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return [];
  return Object.entries(value as Record<string, unknown>)
    .map(([month, visits]) => ({ month: formatMonth(month), visits: parseCompactNumber(visits) ?? 0, is_partial: false }))
    .filter((entry) => entry.visits > 0)
    .sort((a, b) => a.month.localeCompare(b.month))
    .slice(-3);
}

async function fetchSimilarwebPage(domain: string, capturedAt: string): Promise<TrafficEstimate | null> {
  const url = `https://www.similarweb.com/website/${domain}/`;
  const html = await fetchText(url);
  const text = html.replace(/\s+/g, ' ');
  const visits = parseFirstNumber(text, [
    /Monthly Visits[^0-9]{0,80}([0-9][0-9.,]*\s*[KMB]?)/i,
    /Total Visits[^0-9]{0,80}([0-9][0-9.,]*\s*[KMB]?)/i,
    /visits[^0-9]{0,40}([0-9][0-9.,]*\s*[KMB]?)/i,
  ]);
  if (!visits || visits < MIN_CREDIBLE_VISITS) return null;
  return {
    source: 'Similarweb public website overview',
    source_url: url,
    captured_at: capturedAt,
    period_label: extractPeriodLabel(text) ?? 'Latest public estimate',
    visits_last_month: visits,
    monthly_visits: [],
    bounce_rate_percent: parseFirstPercent(text, [/Bounce Rate[^0-9]{0,80}([0-9.]+%)/i]),
    pages_per_visit: parseFirstFloat(text, [/Pages per Visit[^0-9]{0,80}([0-9.]+)/i]),
    avg_visit_duration: text.match(/Visit Duration[^0-9]{0,80}([0-9]{1,2}:[0-9]{2})/i)?.[1],
    global_rank: parseFirstRank(text, [/Global Rank[^0-9]{0,80}#?\s*([0-9,]+)/i]),
    note: 'Public web-traffic estimate scraped from Similarweb overview; use directionally.',
  };
}

async function fetchSemrush(domain: string, capturedAt: string): Promise<TrafficEstimate | null> {
  const url = `https://www.semrush.com/website/${domain}/overview/`;
  const html = await fetchText(url);
  const text = html.replace(/\s+/g, ' ');
  const monthly = parseSemrushHistory(html);
  const visits = monthly.at(-1)?.visits ?? parseFirstNumber(text, [
    /Traffic Stats[^0-9]{0,200}Visits\s*([0-9][0-9.,]*\s*[KMB])/i,
    /Web Traffic Statistics[^0-9]{0,400}([0-9][0-9.,]*\s*[KMB])/i,
  ]);
  if (!visits || visits < MIN_CREDIBLE_VISITS) return null;
  return {
    source: 'SEMrush public website overview',
    source_url: url,
    captured_at: capturedAt,
    period_label: monthly.at(-1)?.month ?? extractSemrushPeriod(text) ?? 'Latest public estimate',
    visits_last_month: visits,
    monthly_visits: monthly,
    note: 'Public SEMrush estimate; SEMrush and Similarweb numbers can differ by methodology.',
  };
}

function parseSemrushHistory(html: string): TrafficEstimate['monthly_visits'] {
  const decoded = html.replace(/&quot;/g, '"');
  const entries: TrafficEstimate['monthly_visits'] = [];
  const pattern = /"displayDate":\s*\[\s*0\s*,\s*"(\d{4}-\d{2})-\d{2}"\s*\][\s\S]{0,220}?"visits":\s*\[\s*0\s*,\s*([0-9]+)\s*\]/g;
  for (const match of decoded.matchAll(pattern)) {
    const visits = Number(match[2]);
    if (Number.isFinite(visits) && visits > 0) {
      entries.push({ month: match[1], visits, is_partial: false });
    }
  }
  const unique = new Map<string, TrafficEstimate['monthly_visits'][number]>();
  for (const entry of entries) unique.set(entry.month, entry);
  return [...unique.values()].sort((a, b) => a.month.localeCompare(b.month)).slice(-3);
}

async function fetchHypestat(domain: string, capturedAt: string): Promise<TrafficEstimate | null> {
  const url = `https://hypestat.com/info/${domain}`;
  const html = await fetchText(url);
  const text = html.replace(/\s+/g, ' ');
  const visits = parseFirstNumber(text, [
    /Monthly Visits:\s*([0-9][0-9.,]*\s*[KMB]?)/i,
    /Monthly Visits[^0-9]{0,80}([0-9][0-9.,]*\s*[KMB]?)/i,
    /equates to about\s*([0-9][0-9.,]*\s*[KMB]?)\s*monthly/i,
  ]);
  if (!visits || visits < MIN_CREDIBLE_VISITS) return null;
  return {
    source: 'HypeStat public traffic analysis',
    source_url: url,
    captured_at: capturedAt,
    period_label: 'Latest public estimate',
    visits_last_month: visits,
    monthly_visits: [],
    bounce_rate_percent: parseFirstPercent(text, [/Bounce rate:\s*([0-9.]+%)/i, /Bounce Rate[^0-9]{0,80}([0-9.]+%)/i]),
    pages_per_visit: parseFirstFloat(text, [/Pages per Visit:\s*([0-9.]+)/i, /Pages per Visit[^0-9]{0,80}([0-9.]+)/i]),
    avg_visit_duration: text.match(/Avg\. visit duration:\s*([0-9]{1,2}:[0-9]{2})/i)?.[1],
    global_rank: parseFirstRank(text, [/ranked\s*#?([0-9,]+)\s*in the world/i, /HypeRank:\s*([0-9,]+)/i]),
    note: 'Public HypeStat estimate; use directionally and prefer direct analytics when available.',
  };
}

function parseFirstNumber(text: string, patterns: RegExp[]): number | undefined {
  for (const pattern of patterns) {
    const value = parseCompactNumber(text.match(pattern)?.[1]);
    if (value) return value;
  }
  return undefined;
}

function parseFirstPercent(text: string, patterns: RegExp[]): number | undefined {
  for (const pattern of patterns) {
    const value = parsePercent(text.match(pattern)?.[1]);
    if (value !== undefined) return value;
  }
  return undefined;
}

function parseFirstFloat(text: string, patterns: RegExp[]): number | undefined {
  for (const pattern of patterns) {
    const match = text.match(pattern)?.[1];
    if (!match) continue;
    const value = Number(match);
    if (Number.isFinite(value)) return round(value, 2);
  }
  return undefined;
}

function parseFirstRank(text: string, patterns: RegExp[]): number | undefined {
  for (const pattern of patterns) {
    const value = parseRank(text.match(pattern)?.[1]);
    if (value) return value;
  }
  return undefined;
}

function extractPeriodLabel(text: string): string | undefined {
  return text.match(/\b(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*\s+\d{4}\b/i)?.[0];
}

function extractSemrushPeriod(text: string): string | undefined {
  return text.match(/\b(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*\s+\d{4}\s+Traffic Stats\b/i)?.[0]
    ?.replace(/\s+Traffic Stats$/i, '');
}

function withoutUndefined<T>(value: T): T {
  if (Array.isArray(value)) return value.map(withoutUndefined).filter((item) => item !== undefined) as T;
  if (!value || typeof value !== 'object') return value;
  return Object.fromEntries(
    Object.entries(value as Record<string, unknown>)
      .map(([key, entry]) => [key, withoutUndefined(entry)])
      .filter(([, entry]) => entry !== undefined)
  ) as T;
}

function serializeDates<T>(value: T): T {
  if (value instanceof Date) return value.toISOString().slice(0, 10) as T;
  if (Array.isArray(value)) return value.map(serializeDates) as T;
  if (!value || typeof value !== 'object') return value;
  return Object.fromEntries(
    Object.entries(value as Record<string, unknown>).map(([key, entry]) => [key, serializeDates(entry)])
  ) as T;
}

function normalizeDateLike(value: unknown): string | undefined {
  if (value instanceof Date) return value.toISOString().slice(0, 10);
  if (typeof value === 'string' && /^\d{4}-\d{2}-\d{2}/.test(value)) return value.slice(0, 10);
  return undefined;
}

async function fetchTrafficEstimate(tool: ToolFile, capturedAt: string): Promise<FetchResult> {
  const attempts: string[] = [];
  const website = String(tool.data.website ?? '');
  const domainInfo = domainFromWebsite(website);
  if (!domainInfo) {
    return {
      attempts: ['skipped: no public website domain; GitHub-only projects should rely on github_metrics instead'],
    };
  }
  if (domainInfo.skipReason) return { attempts: [domainInfo.skipReason] };
  const { domain } = domainInfo;
  let domainCreated: Pick<TrafficEstimate, 'domain_created_at' | 'domain_created_source_url'> = {};
  try {
    domainCreated = await fetchDomainCreated(domain) ?? {};
    if (domainCreated.domain_created_at) attempts.push('RDAP domain registration: ok');
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    attempts.push(`RDAP domain registration: ${message}`);
  }

  const fetchers = [
    ['Similarweb data endpoint', fetchSimilarwebDataApi],
    ['Similarweb page', fetchSimilarwebPage],
    ['SEMrush page', fetchSemrush],
    ['HypeStat page', fetchHypestat],
  ] as const;

  for (const [label, fetcher] of fetchers) {
    try {
      const estimate = await fetcher(domain, capturedAt);
      if (estimate?.visits_last_month || estimate?.monthly_visits.length) {
        attempts.push(`${label}: ok`);
        Object.assign(estimate, domainCreated);
        return { estimate: withoutUndefined(estimate), attempts };
      }
      attempts.push(`${label}: no numeric traffic found`);
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      attempts.push(`${label}: ${message}`);
    }
  }

  return { attempts };
}

async function fetchDomainCreatedForTool(tool: ToolFile): Promise<FetchResult> {
  const existing = tool.data.traffic_estimates;
  const domainInfo = domainFromWebsite(String(tool.data.website ?? ''));
  if (!domainInfo) return { attempts: ['skipped: no public website domain'] };
  const { domain } = domainInfo;
  try {
    const domainCreated = await fetchDomainCreated(domain);
    if (!domainCreated?.domain_created_at || !domainCreated.domain_created_source_url) return { attempts: ['RDAP domain registration: no creation date found'] };
    const merged = mergeDomainCreatedEstimate(existing, {
      domain_created_at: domainCreated.domain_created_at,
      domain_created_source_url: domainCreated.domain_created_source_url,
    });
    return {
      estimate: withoutUndefined(merged),
      attempts: ['RDAP domain registration: ok'],
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    return { attempts: [`RDAP domain registration: ${message}`] };
  }
}

export function mergeDomainCreatedEstimate(
  existing: Partial<TrafficEstimate> | undefined,
  domainCreated: Required<Pick<TrafficEstimate, 'domain_created_at' | 'domain_created_source_url'>>,
  capturedAt = todayIso()
): TrafficEstimate {
  return {
    source: existing?.source ?? 'RDAP domain registration',
    source_url: existing?.source_url ?? domainCreated.domain_created_source_url,
    period_label: existing?.period_label ?? 'Domain registration',
    monthly_visits: existing?.monthly_visits ?? [],
    note: existing?.note ?? 'Domain registration date only; no public traffic estimate captured yet.',
    ...existing,
    captured_at: normalizeDateLike(existing?.captured_at) ?? capturedAt,
    ...domainCreated,
  };
}

export function shouldSaveTrafficEstimate(options: Pick<CliOptions, 'dryRun'>): boolean {
  return !options.dryRun;
}

export function saveTool(tool: ToolFile, estimate: TrafficEstimate): void {
  const data = structuredClone(tool.data);
  data.traffic_estimates = serializeDates(estimate);
  const output = formatDatesForYaml(matter.stringify(tool.content.trim(), data))
  writeFileSync(tool.path, output, 'utf-8');
}

export function formatDatesForYaml(markdown: string): string {
  return markdown
    .replace(/^(\s*)(captured_at|verified_at):\s*'(\d{4}-\d{2}-\d{2})'$/gm, '$1$2: $3')
    .replace(/^(\s*)(captured_at|verified_at):\s*"(\d{4}-\d{2}-\d{2})"$/gm, '$1$2: $3')
    .replace(/^(\s*)(captured_at|verified_at):\s*(\d{4}-\d{2}-\d{2})T00:00:00\.000Z$/gm, '$1$2: $3')
    .replace(/^(\s*)(captured_at|verified_at):\s*!!timestamp\s+(\d{4}-\d{2}-\d{2})T00:00:00\.000Z$/gm, '$1$2: $3');
}

async function main() {
  const options = parseArgs(process.argv.slice(2));
  const tools = readTools(options.slug);
  const capturedAt = todayIso();
  let updated = 0;
  let found = 0;

  console.log(`Fetching public traffic estimates for ${tools.length} tool(s)${options.dryRun ? ' [dry-run]' : ''}...`);
  for (const tool of tools) {
    if (options.missingOnly && tool.data.traffic_estimates) {
      console.log(`- ${tool.slug}: skipped existing traffic_estimates`);
      continue;
    }
    const result = options.domainCreatedOnly
      ? await fetchDomainCreatedForTool(tool)
      : await fetchTrafficEstimate(tool, capturedAt);
    if (result.estimate) {
      found++;
      const visits = result.estimate.visits_last_month?.toLocaleString('en-US') ?? 'monthly series';
      console.log(`✓ ${tool.slug}: ${visits} (${result.estimate.source})`);
      if (shouldSaveTrafficEstimate(options)) {
        saveTool(tool, result.estimate);
        updated++;
      }
    } else {
      console.warn(`! ${tool.slug}: no estimate (${result.attempts.join('; ')})`);
    }
  }

  console.log(`Done. Found ${found}/${tools.length}; updated ${updated} file(s).`);
}

const isCli = process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (isCli) {
  main().catch((error) => {
    console.error(error instanceof Error ? error.message : error);
    process.exit(1);
  });
}
