#!/usr/bin/env tsx
/**
 * Generates update drafts for tool Markdown data.
 *
 * Default mode writes a Markdown review report only:
 *   npm run update-data
 *   npm run update-data -- --slug suno
 *
 * Write mode updates tool Markdown and appends changelog rows:
 *   npm run update-data -- --slug suno --write
 */
import { existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { basename, dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import matter from 'gray-matter';
import Papa from 'papaparse';

const ROOT = process.cwd();
const TOOLS_DIR = join(ROOT, 'src/content/tools');
const CHANGELOG_PATH = join(ROOT, 'data/changelog.csv');
const DEFAULT_REPORT_PATH = join(ROOT, 'reports/data-update-latest.md');
const GUIDELINE_MAX_CHARS = 24_000;
const FETCH_TIMEOUT_MS = 15_000;
const GITHUB_STALE_DAYS = 183;
const GITHUB_STALE_MS = GITHUB_STALE_DAYS * 24 * 60 * 60 * 1000;
const USER_AGENT = 'VoiceToolsDirectoryDataUpdater/0.1 (+https://voice.tools/about)';

type ChangeType = 'pricing_change' | 'feature_added' | 'product_change' | 'model_release' | 'policy_change';

type PricingDraft = {
  model?: 'free' | 'freemium' | 'paid' | 'open_source' | 'enterprise';
  has_free_tier?: boolean;
  starting_paid_usd?: number;
  pricing_url?: string;
  cost_per_1000_chars?: number;
  cost_per_minute?: number;
};

type Draft = {
  tagline?: string;
  pricing?: PricingDraft;
  licensing?: { notes?: string };
  capabilities?: Partial<Record<'voice_cloning' | 'multilingual' | 'chinese_support' | 'realtime_capable' | 'open_source' | 'offline_capable' | 'batch_api', boolean>>;
  gotchas?: string[];
  portability?: { voice_model_export: boolean; notes?: string };
  i18n?: {
    zh?: {
      tagline?: string;
      body?: string;
      licensing_notes?: string;
      gotchas?: string[];
      portability_notes?: string;
    };
  };
  body?: string;
  changelog?: ChangelogRow;
  verified_at?: string;
  confidence: 'high' | 'medium' | 'low';
  needs_manual_review: boolean;
  notes: string[];
  engine: 'rules' | 'openai' | 'openrouter' | 'rules_fallback';
};

type ToolFile = {
  slug: string;
  path: string;
  raw: string;
  data: Record<string, any>;
  content: string;
};

type SourceFetch = {
  url: string;
  kind: 'website' | 'pricing' | 'changelog';
  ok: boolean;
  status?: number;
  title?: string;
  summary?: string;
  text?: string;
  error?: string;
  needs_manual_review: boolean;
};

type AiCallLog = {
  provider?: 'openai' | 'openrouter';
  model?: string;
  endpoint?: string;
  requested: boolean;
  status?: number;
  ok?: boolean;
  response_keys?: string[];
  text_length?: number;
  text_preview?: string;
  json_parse_ok?: boolean;
  guidelines_loaded?: string[];
  error?: string;
  fallback_to_rules: boolean;
};

type GithubMaintenance = {
  repo?: string;
  source_url?: string;
  status: 'ok' | 'stale' | 'archived' | 'missing_repo' | 'fetch_failed';
  pushed_at?: string;
  archived?: boolean;
  age_days?: number;
  stale_days_threshold: number;
  issue?: string;
  error?: string;
};

type ToolResult = {
  tool: ToolFile;
  sources: SourceFetch[];
  draft: Draft;
  changedFields: string[];
  errors: string[];
  ai: AiCallLog;
  githubMaintenance?: GithubMaintenance;
};

export type ChangelogRow = {
  date: string;
  tool_slug: string;
  change_type: ChangeType;
  description: string;
  description_zh: string;
  source_url: string;
};

export type CliOptions = {
  slug?: string;
  write: boolean;
  reportPath: string;
  maxPages: number;
};

type AiProvider =
  | { engine: 'openai'; apiKey: string; model: string }
  | { engine: 'openrouter'; apiKey: string; model: string };

export function resolveAiProvider(env: NodeJS.ProcessEnv = process.env): AiProvider | null {
  if (env.OPENAI_API_KEY && env.OPENAI_MODEL) {
    return { engine: 'openai', apiKey: env.OPENAI_API_KEY, model: env.OPENAI_MODEL };
  }
  if (env.OPENROUTER_API_KEY && env.OPENROUTER_MODEL) {
    return { engine: 'openrouter', apiKey: env.OPENROUTER_API_KEY, model: env.OPENROUTER_MODEL };
  }
  return null;
}

export function loadEnvFiles(root = ROOT, filenames = ['.env', '.env.local']): string[] {
  const loaded: string[] = [];
  for (const filename of filenames) {
    const path = join(root, filename);
    if (!existsSync(path)) continue;
    const values = parseDotenv(readFileSync(path, 'utf-8'));
    for (const [key, value] of Object.entries(values)) {
      process.env[key] ??= value;
    }
    loaded.push(path);
  }
  return loaded;
}

export function parseDotenv(content: string): Record<string, string> {
  const values: Record<string, string> = {};
  for (const rawLine of content.split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line || line.startsWith('#')) continue;

    const normalized = line.startsWith('export ') ? line.slice('export '.length).trimStart() : line;
    const equalsIndex = normalized.indexOf('=');
    if (equalsIndex <= 0) continue;

    const key = normalized.slice(0, equalsIndex).trim();
    if (!/^[A-Za-z_][A-Za-z0-9_]*$/.test(key)) continue;

    const rawValue = normalized.slice(equalsIndex + 1).trim();
    values[key] = parseDotenvValue(rawValue);
  }
  return values;
}

function parseDotenvValue(rawValue: string): string {
  if (!rawValue) return '';
  const quote = rawValue[0];
  if ((quote === '"' || quote === "'") && rawValue.endsWith(quote)) {
    const inner = rawValue.slice(1, -1);
    return quote === '"' ? inner.replace(/\\n/g, '\n').replace(/\\"/g, '"').replace(/\\\\/g, '\\') : inner;
  }
  return rawValue.replace(/\s+#.*$/, '').trim();
}

export function parseArgs(argv: string[]): CliOptions {
  const options: CliOptions = {
    write: false,
    reportPath: DEFAULT_REPORT_PATH,
    maxPages: 3,
  };

  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (arg === '--write') {
      options.write = true;
    } else if (arg === '--slug') {
      options.slug = argv[++i];
    } else if (arg.startsWith('--slug=')) {
      options.slug = arg.slice('--slug='.length);
    } else if (arg === '--report') {
      options.reportPath = resolve(argv[++i]);
    } else if (arg.startsWith('--report=')) {
      options.reportPath = resolve(arg.slice('--report='.length));
    } else if (arg === '--max-pages') {
      options.maxPages = parsePositiveInt(argv[++i], '--max-pages');
    } else if (arg.startsWith('--max-pages=')) {
      options.maxPages = parsePositiveInt(arg.slice('--max-pages='.length), '--max-pages');
    } else {
      throw new Error(`Unknown argument: ${arg}`);
    }
  }

  if (options.slug && !/^[a-z0-9][a-z0-9-]*$/.test(options.slug)) {
    throw new Error(`Invalid --slug value: ${options.slug}`);
  }
  return options;
}

function parsePositiveInt(value: string | undefined, name: string): number {
  const parsed = Number(value);
  if (!Number.isInteger(parsed) || parsed < 1) throw new Error(`${name} must be a positive integer`);
  return parsed;
}

function todayIso(): string {
  return new Date().toISOString().slice(0, 10);
}

function daysBetweenDates(from: Date, to: Date): number {
  return Math.max(0, Math.floor((to.getTime() - from.getTime()) / 86_400_000));
}

export function githubRepoFromUrl(url?: string): string | undefined {
  if (!url) return undefined;
  try {
    const parsed = new URL(url);
    if (parsed.hostname !== 'github.com') return undefined;
    const parts = parsed.pathname.split('/').filter(Boolean);
    if (parts.length < 2) return undefined;
    return `${parts[0]}/${parts[1].replace(/\.git$/, '')}`;
  } catch {
    return undefined;
  }
}

function githubSourceUrls(tool: ToolFile): string[] {
  return [
    tool.data.website,
    tool.data.pricing?.pricing_url,
    tool.data.github_metrics?.source_url,
  ].filter((value): value is string => typeof value === 'string');
}

function githubRepoForTool(tool: ToolFile): string | undefined {
  for (const url of githubSourceUrls(tool)) {
    const repo = githubRepoFromUrl(url);
    if (repo) return repo;
  }
  return undefined;
}

function isOpenSourceTool(tool: ToolFile): boolean {
  return Boolean(tool.data.capabilities?.open_source);
}

export function evaluateGithubMaintenance(input: {
  slug: string;
  repo?: string;
  pushed_at?: string;
  archived?: boolean;
  now?: Date;
}): GithubMaintenance {
  const threshold = GITHUB_STALE_DAYS;
  if (!input.repo) {
    return {
      status: 'missing_repo',
      stale_days_threshold: threshold,
      issue: `${input.slug}: open-source tool has no GitHub repo URL to verify activity`,
    };
  }

  if (!input.pushed_at) {
    return {
      repo: input.repo,
      status: 'fetch_failed',
      stale_days_threshold: threshold,
      issue: `${input.slug}: GitHub repo fetch returned no pushed_at for ${input.repo}`,
    };
  }

  const pushedAt = new Date(input.pushed_at);
  const now = input.now ?? new Date();
  const ageDays = Number.isNaN(pushedAt.getTime()) ? undefined : daysBetweenDates(pushedAt, now);
  const base = {
    repo: input.repo,
    source_url: `https://github.com/${input.repo}`,
    pushed_at: input.pushed_at,
    archived: input.archived,
    age_days: ageDays,
    stale_days_threshold: threshold,
  };

  if (input.archived) {
    return {
      ...base,
      status: 'archived',
      issue: `${input.slug}: GitHub repo ${input.repo} is archived; remove candidate`,
    };
  }

  if (pushedAt < new Date(now.getTime() - GITHUB_STALE_MS)) {
    return {
      ...base,
      status: 'stale',
      issue: `${input.slug}: GitHub repo ${input.repo} last pushed ${input.pushed_at}, older than ${threshold} days; remove candidate`,
    };
  }

  return { ...base, status: 'ok' };
}

async function fetchGithubMaintenance(tool: ToolFile): Promise<GithubMaintenance | undefined> {
  if (!isOpenSourceTool(tool)) return undefined;
  const repo = githubRepoForTool(tool);
  if (!repo) return evaluateGithubMaintenance({ slug: tool.slug });

  try {
    const res = await fetch(`https://api.github.com/repos/${repo}`, {
      redirect: 'follow',
      signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
      headers: {
        'Accept': 'application/json',
        'User-Agent': USER_AGENT,
      },
    });
    if (!res.ok) {
      return {
        repo,
        source_url: `https://github.com/${repo}`,
        status: 'fetch_failed',
        stale_days_threshold: GITHUB_STALE_DAYS,
        error: `HTTP ${res.status}`,
        issue: `${tool.slug}: GitHub repo fetch failed for ${repo} (HTTP ${res.status})`,
      };
    }
    const data = await res.json() as { pushed_at?: string; archived?: boolean };
    return evaluateGithubMaintenance({
      slug: tool.slug,
      repo,
      pushed_at: data.pushed_at,
      archived: data.archived,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    return {
      repo,
      source_url: `https://github.com/${repo}`,
      status: 'fetch_failed',
      stale_days_threshold: GITHUB_STALE_DAYS,
      error: message,
      issue: `${tool.slug}: GitHub repo fetch failed for ${repo} (${message})`,
    };
  }
}

export function canApplyDraft(draft: Draft, sources: SourceFetch[] = []): boolean {
  return ['openai', 'openrouter'].includes(draft.engine)
    && draft.confidence !== 'low'
    && !draft.needs_manual_review
    && sources.length > 0
    && sources.every((source) => source.ok && !source.needs_manual_review);
}

function readTools(onlySlug?: string): ToolFile[] {
  const tools = readdirSync(TOOLS_DIR)
    .filter((file) => file.endsWith('.md'))
    .sort()
    .map((file) => {
      const path = join(TOOLS_DIR, file);
      const raw = readFileSync(path, 'utf-8');
      const parsed = matter(raw);
      return {
        slug: basename(file, '.md'),
        path,
        raw,
        data: parsed.data,
        content: parsed.content.trimStart(),
      };
    })
    .filter((tool) => !onlySlug || tool.slug === onlySlug);

  if (tools.length === 0) {
    throw new Error(onlySlug ? `No tool found for slug "${onlySlug}"` : 'No tool Markdown files found');
  }
  return tools;
}

function loadChangelogRows(): ChangelogRow[] {
  if (!existsSync(CHANGELOG_PATH)) return [];
  const parsed = Papa.parse<Record<string, string>>(readFileSync(CHANGELOG_PATH, 'utf-8'), {
    header: true,
    skipEmptyLines: true,
    dynamicTyping: false,
  });
  if (parsed.errors.length > 0) {
    throw new Error(`Failed to parse changelog.csv: ${parsed.errors.map((e) => e.message).join('; ')}`);
  }
  return parsed.data.map((row) => ({
    date: row.date,
    tool_slug: row.tool_slug,
    change_type: row.change_type as ChangeType,
    description: row.description,
    description_zh: row.description_zh || row.description,
    source_url: row.source_url,
  }));
}

export function uniqueSourceUrls(tool: ToolFile, changelogRows: ChangelogRow[], maxPages: number): Array<{ url: string; kind: SourceFetch['kind'] }> {
  const candidates: Array<{ url: string; kind: SourceFetch['kind'] }> = [];
  if (typeof tool.data.website === 'string') candidates.push({ url: tool.data.website, kind: 'website' });
  if (typeof tool.data.pricing?.pricing_url === 'string') candidates.push({ url: tool.data.pricing.pricing_url, kind: 'pricing' });
  const latestChangelogRows = changelogRows
    .filter((entry) => entry.tool_slug === tool.slug)
    .sort((a, b) => b.date.localeCompare(a.date));
  for (const row of latestChangelogRows) {
    candidates.push({ url: row.source_url, kind: 'changelog' });
  }

  const seen = new Set<string>();
  return candidates
    .filter((candidate) => {
      try {
        const normalized = new URL(candidate.url).href;
        if (seen.has(normalized)) return false;
        seen.add(normalized);
        candidate.url = normalized;
        return true;
      } catch {
        return false;
      }
    })
    .slice(0, maxPages);
}

async function fetchSource(url: string, kind: SourceFetch['kind']): Promise<SourceFetch> {
  try {
    const res = await fetch(url, {
      headers: { 'User-Agent': USER_AGENT },
      redirect: 'follow',
      signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
    });
    const contentType = res.headers.get('content-type') ?? '';
    const needsManual = [403, 429].includes(res.status);
    if (!res.ok) {
      return { url, kind, ok: false, status: res.status, error: `HTTP ${res.status}`, needs_manual_review: needsManual };
    }
    if (!contentType.toLowerCase().includes('text/html') && !contentType.toLowerCase().includes('text/plain')) {
      return {
        url,
        kind,
        ok: true,
        status: res.status,
        summary: `Fetched non-HTML content (${contentType || 'unknown content type'}).`,
        needs_manual_review: false,
      };
    }
    const html = await res.text();
    const text = normalizeWhitespace(stripHtml(html)).slice(0, 12_000);
    return {
      url,
      kind,
      ok: true,
      status: res.status,
      title: extractTitle(html),
      summary: summarizeText(text),
      text,
      needs_manual_review: needsManual,
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    return {
      url,
      kind,
      ok: false,
      error: message,
      needs_manual_review: /timeout|aborted|429|403/i.test(message),
    };
  }
}

function extractTitle(html: string): string | undefined {
  const match = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  return match ? decodeHtml(normalizeWhitespace(match[1])).slice(0, 160) : undefined;
}

function stripHtml(html: string): string {
  return html
    .replace(/<script\b[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style\b[\s\S]*?<\/style>/gi, ' ')
    .replace(/<noscript\b[\s\S]*?<\/noscript>/gi, ' ')
    .replace(/<[^>]+>/g, ' ');
}

function decodeHtml(value: string): string {
  return value
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&apos;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>');
}

function normalizeWhitespace(value: string): string {
  return decodeHtml(value).replace(/\s+/g, ' ').trim();
}

function summarizeText(text: string): string {
  return text.slice(0, 420) + (text.length > 420 ? '...' : '');
}

export function loadContentGuidelines(root = ROOT): Record<string, string> {
  return {
    tool: readGuideline(join(root, 'docs/new-tool.md')),
    workflow: readGuideline(join(root, 'docs/new-workflow.md')),
  };
}

function readGuideline(path: string): string {
  if (!existsSync(path)) return '';
  const content = readFileSync(path, 'utf-8').trim();
  return content.length > GUIDELINE_MAX_CHARS ? `${content.slice(0, GUIDELINE_MAX_CHARS)}\n\n[Guideline truncated for prompt budget]` : content;
}

export function buildAiPrompt(tool: ToolFile, sources: SourceFetch[], runDate: string, guidelines = loadContentGuidelines()): { instructions: string; input: string; loadedGuidelines: string[] } {
  const loadedGuidelines = Object.entries(guidelines)
    .filter(([, content]) => content.trim().length > 0)
    .map(([name]) => name);

  const sourcePack = sources.map((source) => ({
    url: source.url,
    kind: source.kind,
    status: source.status,
    title: source.title,
    summary: source.summary,
    text: source.text?.slice(0, 5_000),
  }));

  const instructions = [
    'You update a static voice AI tools directory.',
    'Return only valid JSON. Do not wrap in Markdown.',
    'Use only the supplied source text and current tool data. If uncertain, omit the field and set needs_manual_review true.',
    'Follow docs/new-tool.md as the primary standard for identity, evidence, pricing, licensing, capabilities, gotchas, Chinese i18n, and editorial quality.',
    'Also follow docs/new-workflow.md for shared evidence discipline: source mapping, conservative claims, factual verification, and production-oriented judgment.',
    'This script updates tool pages only. Do not invent workflow articles or workflow-only fields.',
    'Keep claims conservative, especially pricing, commercial rights, privacy, voice cloning consent, and licensing.',
  ].join(' ');

  const input = JSON.stringify({
    runDate,
    contentGuidelines: {
      toolPage: guidelines.tool,
      workflowSharedQualityRules: guidelines.workflow,
    },
    currentTool: {
      slug: tool.slug,
      data: tool.data,
      body: tool.content.slice(0, 4_000),
    },
    sources: sourcePack,
    requiredShape: {
      tagline: 'optional string max 100 chars',
      pricing: 'optional existing pricing object fields only',
      licensing: { notes: 'optional string' },
      capabilities: 'optional existing capability booleans only',
      gotchas: 'optional array max 4',
      portability: 'optional object with voice_model_export and notes',
      i18n: { zh: 'optional localized fields' },
      body: 'optional replacement English markdown body',
      changelog: 'required changelog row',
      confidence: 'high | medium | low',
      needs_manual_review: 'boolean',
      notes: 'array of short audit notes',
    },
  });

  return { instructions, input, loadedGuidelines };
}

export function generateRuleDraft(tool: ToolFile, sources: SourceFetch[], runDate = todayIso()): Draft {
  const combined = sources.map((source) => source.text ?? source.summary ?? '').join('\n').toLowerCase();
  const pricingText = sources.filter((source) => source.kind === 'pricing').map((source) => source.text ?? '').join('\n');
  const draft: Draft = {
    verified_at: runDate,
    confidence: 'low',
    needs_manual_review: sources.some((source) => source.needs_manual_review || !source.ok),
    notes: [],
    engine: 'rules',
  };

  const price = inferStartingPrice(pricingText || combined);
  const hasFree = /\bfree\b|free plan|free tier/i.test(pricingText || combined);
  const mentionsEnterprise = /\benterprise\b|contact sales/i.test(pricingText || combined);
  const mentionsOpenSource = /open[-\s]?source|github\.com|apache 2|mit license|bsd license/i.test(combined);
  const mentionsCommercial = /commercial use|commercial rights|monetization|monetisation|royalt/i.test(combined);
  const mentionsApi = /\bapi\b|developer|sdk/i.test(combined);

  if (price !== undefined || hasFree || mentionsEnterprise || mentionsOpenSource) {
    draft.pricing = {};
    if (price !== undefined) draft.pricing.starting_paid_usd = price;
    if (hasFree) draft.pricing.has_free_tier = true;
    if (mentionsOpenSource) draft.pricing.model = 'open_source';
    else if (hasFree && price !== undefined) draft.pricing.model = 'freemium';
    else if (mentionsEnterprise && price === undefined) draft.pricing.model = 'enterprise';
    else if (price !== undefined) draft.pricing.model = 'paid';
  }

  if (mentionsCommercial) {
    draft.licensing = {
      notes: trimSentence(
        `${tool.data.name ?? tool.slug} source pages mention commercial use, monetization, or royalty terms. Verify the latest official terms before relying on automated licensing changes.`
      ),
    };
  }

  if (mentionsOpenSource || mentionsApi) {
    draft.capabilities = {};
    if (mentionsOpenSource) draft.capabilities.open_source = true;
    if (mentionsApi) draft.capabilities.batch_api = true;
  }

  draft.gotchas = buildGotchas(combined);
  if (draft.gotchas.length === 0) delete draft.gotchas;

  draft.confidence = price !== undefined || hasFree || mentionsOpenSource ? 'medium' : 'low';
  draft.notes.push('Rule mode updates verified_at and only suggests field changes when official pages expose clear keywords.');
  if (draft.needs_manual_review) draft.notes.push('At least one source failed or was rate-limited; manually review before writing.');
  if (draft.pricing) draft.notes.push('Pricing changes are low/medium confidence and should be reviewed before publishing.');

  draft.changelog = {
    date: runDate,
    tool_slug: tool.slug,
    change_type: draft.pricing ? 'pricing_change' : 'product_change',
    description: `${tool.data.name ?? tool.slug} data reviewed from official source pages`,
    description_zh: `${tool.data.name ?? tool.slug} 数据已根据官方来源页面复核`,
    source_url: sources.find((source) => source.kind === 'pricing')?.url ?? sources[0]?.url ?? String(tool.data.website ?? ''),
  };

  return draft;
}

function inferStartingPrice(text: string): number | undefined {
  const matches = [...text.matchAll(/\$\s?([0-9]+(?:\.[0-9]{1,2})?)/g)]
    .map((match) => Number(match[1]))
    .filter((value) => Number.isFinite(value) && value > 0 && value < 10_000)
    .sort((a, b) => a - b);
  return matches[0];
}

function trimSentence(value: string): string {
  return value.replace(/\s+/g, ' ').trim().slice(0, 500);
}

function buildGotchas(text: string): string[] {
  const gotchas: string[] = [];
  if (/free[^.]{0,80}(not|no|non)[^.]{0,80}commercial|non-commercial/i.test(text)) {
    gotchas.push('Free plan may not include commercial use rights; verify before publishing monetized work.');
  }
  if (/watermark/i.test(text)) {
    gotchas.push('Free or lower-tier exports may include watermarks.');
  }
  if (/contact sales|enterprise/i.test(text)) {
    gotchas.push('Some production features or limits may require enterprise sales contact.');
  }
  if (/rate limit|fair use|credit/i.test(text)) {
    gotchas.push('Usage may be limited by credits, fair-use rules, or rate limits.');
  }
  return gotchas.slice(0, 4);
}

async function generateAiDraft(tool: ToolFile, sources: SourceFetch[], runDate: string): Promise<{ draft: Draft | null; log: AiCallLog }> {
  const provider = resolveAiProvider();
  if (!provider) {
    return { draft: null, log: { requested: false, fallback_to_rules: false } };
  }
  const log: AiCallLog = {
    provider: provider.engine,
    model: provider.model,
    endpoint: provider.engine === 'openai'
      ? 'https://api.openai.com/v1/responses'
      : 'https://openrouter.ai/api/v1/chat/completions',
    requested: true,
    fallback_to_rules: false,
  };
  const { instructions, input, loadedGuidelines } = buildAiPrompt(tool, sources, runDate);
  log.guidelines_loaded = loadedGuidelines;

  try {
    console.log(`  AI provider: ${provider.engine} (${provider.model})`);
    const payload = provider.engine === 'openai'
      ? await callOpenAiResponses(provider, instructions, input, log)
      : await callOpenRouterChat(provider, instructions, input, log);
    log.response_keys = Object.keys(payload).sort();
    const text = extractAiResponseText(payload);
    if (!text) throw new Error(`${provider.engine} response did not include text output`);
    log.text_length = text.length;
    log.text_preview = previewText(text);
    console.log(`  AI response: HTTP ${log.status ?? 'unknown'}, text ${text.length} chars`);
    const parsed = JSON.parse(text) as Partial<Draft>;
    log.json_parse_ok = true;
    console.log('  AI JSON parse: ok');
    return { draft: normalizeDraft(parsed, tool, sources, runDate, provider.engine), log };
  } catch (error) {
    log.json_parse_ok ??= false;
    log.error = error instanceof Error ? error.message : String(error);
    log.fallback_to_rules = true;
    console.warn(`!  ${tool.slug}: AI draft failed; falling back to rules (${log.error})`);
    return { draft: null, log };
  }
}

async function callOpenAiResponses(provider: AiProvider, instructions: string, input: string, log: AiCallLog): Promise<any> {
  const res = await fetch('https://api.openai.com/v1/responses', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${provider.apiKey}`,
    },
    body: JSON.stringify({
      model: provider.model,
      instructions,
      input,
      temperature: 0.2,
    }),
    signal: AbortSignal.timeout(60_000),
  });
  log.status = res.status;
  log.ok = res.ok;
  if (!res.ok) throw new Error(`OpenAI HTTP ${res.status}: ${await res.text()}`);
  return res.json();
}

async function callOpenRouterChat(provider: AiProvider, instructions: string, input: string, log: AiCallLog): Promise<any> {
  const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${provider.apiKey}`,
      'HTTP-Referer': process.env.OPENROUTER_SITE_URL ?? 'https://voice.tools',
      'X-Title': process.env.OPENROUTER_APP_NAME ?? 'Voice Tools Directory',
    },
    body: JSON.stringify({
      model: provider.model,
      messages: [
        { role: 'system', content: instructions },
        { role: 'user', content: input },
      ],
      temperature: 0.2,
      response_format: { type: 'json_object' },
    }),
    signal: AbortSignal.timeout(60_000),
  });
  log.status = res.status;
  log.ok = res.ok;
  if (!res.ok) throw new Error(`OpenRouter HTTP ${res.status}: ${await res.text()}`);
  return res.json();
}

export function previewText(value: string, maxLength = 240): string {
  const normalized = value.replace(/\s+/g, ' ').trim();
  return normalized.length > maxLength ? `${normalized.slice(0, maxLength)}...` : normalized;
}

export function extractAiResponseText(payload: any): string | null {
  if (typeof payload.output_text === 'string') return payload.output_text;
  if (typeof payload.choices?.[0]?.message?.content === 'string') return payload.choices[0].message.content;
  const parts: string[] = [];
  for (const item of payload.output ?? []) {
    for (const content of item.content ?? []) {
      if (content.type === 'output_text' && typeof content.text === 'string') parts.push(content.text);
      if (typeof content.text === 'string') parts.push(content.text);
    }
  }
  return parts.join('').trim() || null;
}

function normalizeDraft(input: Partial<Draft>, tool: ToolFile, sources: SourceFetch[], runDate: string, engine: Draft['engine']): Draft {
  const changelog = input.changelog ?? {
    date: runDate,
    tool_slug: tool.slug,
    change_type: 'product_change' as ChangeType,
    description: `${tool.data.name ?? tool.slug} data reviewed from official source pages`,
    description_zh: `${tool.data.name ?? tool.slug} 数据已根据官方来源页面复核`,
    source_url: sources[0]?.url ?? String(tool.data.website ?? ''),
  };

  return {
    ...input,
    verified_at: input.verified_at ?? runDate,
    changelog: {
      date: changelog.date || runDate,
      tool_slug: tool.slug,
      change_type: changelog.change_type || 'product_change',
      description: String(changelog.description ?? `${tool.data.name ?? tool.slug} data reviewed from official source pages`).slice(0, 220),
      description_zh: String(changelog.description_zh ?? changelog.description ?? `${tool.data.name ?? tool.slug} 数据已根据官方来源页面复核`).slice(0, 220),
      source_url: changelog.source_url || sources[0]?.url || String(tool.data.website ?? ''),
    },
    confidence: input.confidence ?? 'low',
    needs_manual_review: Boolean(input.needs_manual_review || sources.some((source) => source.needs_manual_review || !source.ok)),
    notes: Array.isArray(input.notes) ? input.notes.map(String).slice(0, 8) : [],
    engine,
  };
}

export function computeChangedFields(tool: ToolFile, draft: Draft, sources: SourceFetch[] = []): string[] {
  const next = applyDraftToData(tool.data, draft, sources);
  const fields = ['tagline', 'pricing', 'licensing.notes', 'capabilities', 'gotchas', 'portability', 'i18n.zh', 'verified_at'];
  return fields.filter((field) => JSON.stringify(getPath(tool.data, field)) !== JSON.stringify(getPath(next, field)));
}

function getPath(obj: any, path: string): any {
  return path.split('.').reduce((acc, key) => acc?.[key], obj);
}

export function applyDraftToData(data: Record<string, any>, draft: Draft, sources: SourceFetch[] = []): Record<string, any> {
  const next = structuredClone(data);

  // Rule drafts are intentionally conservative: they may surface useful hints in
  // the report, but only trusted AI drafts should overwrite rich editorial data.
  if (!canApplyDraft(draft, sources)) return next;

  if (draft.verified_at) next.verified_at = new Date(`${draft.verified_at}T00:00:00.000Z`);
  if (draft.tagline) next.tagline = draft.tagline.slice(0, 100);
  if (draft.pricing) next.pricing = { ...next.pricing, ...definedOnly(draft.pricing) };
  if (draft.licensing?.notes) next.licensing = { ...next.licensing, notes: draft.licensing.notes };
  if (draft.capabilities) next.capabilities = { ...next.capabilities, ...definedOnly(draft.capabilities) };
  if (draft.gotchas) next.gotchas = draft.gotchas.slice(0, 4);
  if (draft.portability) next.portability = draft.portability;
  if (draft.i18n?.zh) next.i18n = { ...next.i18n, zh: { ...next.i18n?.zh, ...definedOnly(draft.i18n.zh) } };
  return next;
}

function definedOnly<T extends Record<string, any>>(value: T): Partial<T> {
  return Object.fromEntries(Object.entries(value).filter(([, v]) => v !== undefined && v !== null)) as Partial<T>;
}

export function saveTool(tool: ToolFile, draft: Draft, sources: SourceFetch[]): void {
  const data = applyDraftToData(tool.data, draft, sources);
  const body = canApplyDraft(draft, sources) && draft.body?.trim() ? draft.body.trim() : tool.content.trim();
  const output = formatVerifiedAtForYaml(matter.stringify(body, data, { lineWidth: 120 } as any));
  writeFileSync(tool.path, output, 'utf-8');
}

export function hasSubstantiveFieldChanges(changedFields: string[]): boolean {
  return changedFields.some((field) => field !== 'verified_at');
}

export function changelogRowsToAppend(results: ToolResult[]): ChangelogRow[] {
  return results
    .filter((result) => canApplyDraft(result.draft, result.sources))
    .filter((result) => hasSubstantiveFieldChanges(result.changedFields))
    .flatMap((result) => result.draft.changelog ? [result.draft.changelog] : []);
}

export function formatVerifiedAtForYaml(markdown: string): string {
  return markdown
    .replace(/^verified_at:\s*'(\d{4}-\d{2}-\d{2})'$/m, 'verified_at: $1')
    .replace(/^verified_at:\s*"(\d{4}-\d{2}-\d{2})"$/m, 'verified_at: $1')
    .replace(/^verified_at:\s*(\d{4}-\d{2}-\d{2})T00:00:00\.000Z$/m, 'verified_at: $1')
    .replace(/^verified_at:\s*!!timestamp\s+(\d{4}-\d{2}-\d{2})T00:00:00\.000Z$/m, 'verified_at: $1');
}

export function appendChangelogRows(existing: ChangelogRow[], rows: ChangelogRow[]): { rows: ChangelogRow[]; added: ChangelogRow[] } {
  const seen = new Set(existing.map(changelogKey));
  const added: ChangelogRow[] = [];
  for (const row of rows) {
    const key = changelogKey(row);
    if (seen.has(key)) continue;
    seen.add(key);
    added.push(row);
  }
  return { rows: [...existing, ...added], added };
}

function changelogKey(row: ChangelogRow): string {
  return [row.date, row.tool_slug, row.source_url, row.change_type].join('\0');
}

function writeChangelogRows(rows: ChangelogRow[]): void {
  const csv = Papa.unparse(rows, {
    columns: ['date', 'tool_slug', 'change_type', 'description', 'description_zh', 'source_url'],
    quotes: true,
  });
  writeFileSync(CHANGELOG_PATH, `${csv}\n`, 'utf-8');
}

function appendChangelogRowsToFile(rows: ChangelogRow[]): void {
  if (rows.length === 0) return;
  if (!existsSync(CHANGELOG_PATH)) {
    writeChangelogRows(rows);
    return;
  }

  const csv = Papa.unparse(rows, {
    header: false,
    columns: ['date', 'tool_slug', 'change_type', 'description', 'description_zh', 'source_url'],
    quotes: true,
  });
  const current = readFileSync(CHANGELOG_PATH, 'utf-8');
  const prefix = current.endsWith('\n') ? '' : '\n';
  writeFileSync(CHANGELOG_PATH, `${current}${prefix}${csv}\n`, 'utf-8');
}

export function buildMarkdownReport(results: ToolResult[], options: CliOptions, runDate = todayIso()): string {
  const lines: string[] = [
    '# Tool Data Update Report',
    '',
    `Generated: ${runDate}`,
    `Mode: ${options.write ? 'write' : 'report-only'}`,
    `Tools checked: ${results.length}`,
    '',
    '## Summary',
    '',
  ];

  const reviewCount = results.filter((result) => result.draft.needs_manual_review).length;
  const changedCount = results.filter((result) => result.changedFields.length > 0).length;
  const removeCandidateCount = results.filter((result) => ['archived', 'stale'].includes(result.githubMaintenance?.status ?? '')).length;
  lines.push(`- Tools with suggested field changes: ${changedCount}`);
  lines.push(`- Tools needing manual review: ${reviewCount}`);
  lines.push(`- GitHub remove candidates: ${removeCandidateCount}`);
  lines.push(`- Draft engines: ${summarizeEngines(results)}`);
  lines.push('');

  for (const result of results) {
    lines.push(`## ${result.tool.data.name ?? result.tool.slug} (${result.tool.slug})`);
    lines.push('');
    lines.push(`- Engine: ${result.draft.engine}`);
    lines.push(`- Confidence: ${result.draft.confidence}`);
    lines.push(`- Needs manual review: ${result.draft.needs_manual_review ? 'yes' : 'no'}`);
    lines.push(`- Suggested changes: ${result.changedFields.length ? result.changedFields.join(', ') : 'none'}`);
    if (result.githubMaintenance) {
      const github = result.githubMaintenance;
      lines.push(`- GitHub maintenance: ${github.status}${github.repo ? ` (${github.repo})` : ''}${github.pushed_at ? `, pushed_at ${github.pushed_at}` : ''}`);
      if (github.issue) lines.push(`  ${github.issue}`);
    }
    if (result.errors.length) lines.push(`- Errors: ${result.errors.join('; ')}`);
    lines.push('');
    lines.push('### AI Call');
    lines.push('');
    lines.push('```json');
    lines.push(JSON.stringify(result.ai, null, 2));
    lines.push('```');
    lines.push('');
    lines.push('### Sources');
    for (const source of result.sources) {
      const status = source.status ?? (source.ok ? 'ok' : 'error');
      lines.push(`- ${source.kind}: ${source.url} [${status}]${source.title ? ` — ${source.title}` : ''}`);
      if (source.summary) lines.push(`  ${source.summary}`);
      if (source.error) lines.push(`  Error: ${source.error}`);
    }
    lines.push('');
    lines.push('### Draft');
    lines.push('');
    lines.push('```json');
    lines.push(JSON.stringify({
      suggested_fields: result.changedFields,
      changelog: result.draft.changelog,
      notes: result.draft.notes,
      pricing: result.draft.pricing,
      gotchas: result.draft.gotchas,
    }, null, 2));
    lines.push('```');
    lines.push('');
  }

  return `${lines.join('\n').trimEnd()}\n`;
}

function summarizeEngines(results: ToolResult[]): string {
  const counts = new Map<string, number>();
  for (const result of results) counts.set(result.draft.engine, (counts.get(result.draft.engine) ?? 0) + 1);
  return [...counts.entries()].map(([engine, count]) => `${engine} ${count}`).join(', ') || 'none';
}

async function processTool(tool: ToolFile, changelogRows: ChangelogRow[], options: CliOptions, runDate: string): Promise<ToolResult> {
  const sourceSpecs = uniqueSourceUrls(tool, changelogRows, options.maxPages);
  const [sources, githubMaintenance] = await Promise.all([
    Promise.all(sourceSpecs.map((source) => fetchSource(source.url, source.kind))),
    fetchGithubMaintenance(tool),
  ]);
  const ruleDraft = generateRuleDraft(tool, sources, runDate);
  const { draft: aiDraft, log: aiLog } = await generateAiDraft(tool, sources, runDate);
  const draft = aiDraft ?? (ruleDraft.engine === 'rules' && resolveAiProvider()
    ? { ...ruleDraft, engine: 'rules_fallback' as const, notes: [...ruleDraft.notes, 'AI draft failed; rule draft used.'] }
    : ruleDraft);
  const changedFields = computeChangedFields(tool, draft, sources);
  const errors = sources.filter((source) => !source.ok).map((source) => `${source.url}: ${source.error ?? source.status ?? 'failed'}`);
  if (githubMaintenance?.issue) errors.push(githubMaintenance.issue);
  return { tool, sources, draft, changedFields, errors, ai: aiLog, githubMaintenance };
}

async function main() {
  const loadedEnv = loadEnvFiles();
  const options = parseArgs(process.argv.slice(2));
  const runDate = todayIso();
  const changelogRows = loadChangelogRows();
  const tools = readTools(options.slug);

  if (loadedEnv.length > 0) console.log(`Loaded env file(s): ${loadedEnv.map((path) => basename(path)).join(', ')}`);
  console.log(`Checking ${tools.length} tool(s)${options.write ? ' and writing accepted drafts' : ' in report-only mode'}...`);
  const results: ToolResult[] = [];
  for (const tool of tools) {
    try {
      const result = await processTool(tool, changelogRows, options, runDate);
      results.push(result);
      console.log(`✓  ${tool.slug}: ${result.changedFields.length} suggested change(s), ${result.draft.engine}`);
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      const fallbackDraft: Draft = {
        verified_at: runDate,
        confidence: 'low',
        needs_manual_review: true,
        notes: [`Tool processing failed: ${message}`],
        engine: 'rules',
        changelog: {
          date: runDate,
          tool_slug: tool.slug,
          change_type: 'product_change',
          description: `${tool.data.name ?? tool.slug} data update failed and needs manual review`,
          description_zh: `${tool.data.name ?? tool.slug} 数据自动更新失败，需要人工复核`,
          source_url: String(tool.data.website ?? ''),
        },
      };
      results.push({
        tool,
        sources: [],
        draft: fallbackDraft,
        changedFields: [],
        errors: [message],
        ai: { requested: false, fallback_to_rules: true, error: message },
      });
      console.error(`✗  ${tool.slug}: ${message}`);
    }
  }

  if (options.write) {
    for (const result of results) {
      if (result.changedFields.length > 0) saveTool(result.tool, result.draft, result.sources);
    }
    const rowsToAppend = changelogRowsToAppend(results);
    const { added } = appendChangelogRows(loadChangelogRows(), rowsToAppend);
    appendChangelogRowsToFile(added);
    console.log(`Wrote ${results.filter((result) => result.changedFields.length > 0).length} tool file(s), appended ${added.length} changelog row(s).`);
  }

  const report = buildMarkdownReport(results, options, runDate);
  mkdirSync(dirname(options.reportPath), { recursive: true });
  writeFileSync(options.reportPath, report, 'utf-8');
  console.log(`Report written to ${options.reportPath}`);
}

const isCli = process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (isCli) {
  main().catch((error) => {
    console.error(error instanceof Error ? error.message : error);
    process.exit(1);
  });
}
