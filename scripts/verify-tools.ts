#!/usr/bin/env tsx
/**
 * Website checker for tool pages.
 * Run:  npm run verify-tools
 * CI:   .github/workflows/verify-links.yml  (weekly)
 */
import { existsSync, mkdirSync, readFileSync, readdirSync, unlinkSync, writeFileSync } from 'node:fs';
import { basename, dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import matter from 'gray-matter';
import Papa from 'papaparse';

const ROOT = process.cwd();
const TOOLS_DIR = join(ROOT, 'src/content/tools');
const PUBLIC_DIR = join(ROOT, 'public');
const CHANGELOG_PATH = join(ROOT, 'data/changelog.csv');
const TIMEOUT_MS = 12_000;

type LinkStatus = 'ok' | 'dead' | 'blocked' | 'transient' | 'missing';

type CliOptions = {
  exitZero: boolean;
  removeDead: boolean;
  reportPath?: string;
};

type ToolLink = {
  slug: string;
  name: string;
  website: string;
  path: string;
  logo?: string;
};

type ProbeResult = {
  status: LinkStatus;
  httpStatus?: number;
  error?: string;
  method?: 'HEAD' | 'GET';
  note?: string;
};

type ToolResult = {
  tool: ToolLink;
  result: ProbeResult;
};

export function parseArgs(argv: string[]): CliOptions {
  const options: CliOptions = {
    exitZero: false,
    removeDead: false,
  };

  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (arg === '--exit-zero') {
      options.exitZero = true;
    } else if (arg === '--remove-dead') {
      options.removeDead = true;
    } else if (arg === '--report') {
      options.reportPath = resolve(argv[++i]);
    } else if (arg.startsWith('--report=')) {
      options.reportPath = resolve(arg.slice('--report='.length));
    } else {
      throw new Error(`Unknown argument: ${arg}`);
    }
  }

  return options;
}

function isDeadStatus(status: number): boolean {
  return status === 404 || status === 410;
}

function isBlockedStatus(status: number): boolean {
  return status === 401 || status === 403 || status === 429;
}

function classifyHttpStatus(status: number): LinkStatus {
  if ((status >= 200 && status < 400) || status === 405) return 'ok';
  if (isDeadStatus(status)) return 'dead';
  if (isBlockedStatus(status)) return 'blocked';
  return 'transient';
}

async function fetchUrl(url: string, method: 'HEAD' | 'GET'): Promise<{ status?: number; error?: string }> {
  try {
    const res = await fetch(url, {
      method,
      redirect: 'follow',
      signal: AbortSignal.timeout(TIMEOUT_MS),
      headers: {
        'Accept': method === 'GET' ? 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8' : '*/*',
        'User-Agent': 'VoiceToolsDirectory/1.0 (+https://voice-tools.com/about)',
      },
    });
    if (method === 'GET') await res.body?.cancel();
    return { status: res.status };
  } catch (error) {
    return { error: error instanceof Error ? error.message : String(error) };
  }
}

export async function checkUrl(url: string): Promise<ProbeResult> {
  const head = await fetchUrl(url, 'HEAD');
  if (head.status !== undefined) {
    const status = classifyHttpStatus(head.status);
    if (status === 'ok') return { status, httpStatus: head.status, method: 'HEAD' };
  }

  const get = await fetchUrl(url, 'GET');
  if (get.status !== undefined) {
    const status = classifyHttpStatus(get.status);
    return {
      status,
      httpStatus: get.status,
      method: 'GET',
      note: head.status !== undefined
        ? `HEAD returned ${head.status}; confirmed with GET`
        : `HEAD failed (${head.error ?? 'unknown error'}); confirmed with GET`,
    };
  }

  return {
    status: 'transient',
    error: get.error ?? head.error ?? 'fetch failed',
    method: 'GET',
    note: head.status !== undefined ? `HEAD returned ${head.status}; GET failed` : undefined,
  };
}

function loadTools(): ToolLink[] {
  return readdirSync(TOOLS_DIR)
    .filter((file) => file.endsWith('.md'))
    .sort()
    .map((file) => {
      const path = join(TOOLS_DIR, file);
      const { data } = matter(readFileSync(path, 'utf-8'));
      return {
        slug: basename(file, '.md'),
        name: (data.name as string) || basename(file, '.md'),
        website: (data.website as string) || '',
        path,
        logo: typeof data.logo === 'string' ? data.logo : undefined,
      };
    });
}

function logoPathFor(tool: ToolLink): string | undefined {
  if (!tool.logo?.startsWith('/logos/')) return undefined;
  const path = resolve(PUBLIC_DIR, tool.logo.replace(/^\/+/, ''));
  const logosDir = resolve(PUBLIC_DIR, 'logos');
  return path.startsWith(`${logosDir}\\`) || path.startsWith(`${logosDir}/`) ? path : undefined;
}

function removeChangelogRows(slugs: Set<string>): number {
  if (!existsSync(CHANGELOG_PATH) || slugs.size === 0) return 0;
  const parsed = Papa.parse<Record<string, string>>(readFileSync(CHANGELOG_PATH, 'utf-8'), {
    header: true,
    skipEmptyLines: true,
    dynamicTyping: false,
  });
  if (parsed.errors.length > 0) throw new Error(`Failed to parse changelog.csv: ${parsed.errors.map((e) => e.message).join('; ')}`);

  const rows = parsed.data.filter((row) => !slugs.has(row.tool_slug));
  const removed = parsed.data.length - rows.length;
  if (removed === 0) return 0;

  const csv = Papa.unparse(rows, {
    columns: ['date', 'tool_slug', 'change_type', 'description', 'description_zh', 'source_url'],
    quotes: true,
  });
  writeFileSync(CHANGELOG_PATH, `${csv}\n`, 'utf-8');
  return removed;
}

export function removeDeadTools(results: ToolResult[]): string[] {
  const removed: string[] = [];
  const dead = results.filter((item) => item.result.status === 'dead');
  const slugs = new Set(dead.map((item) => item.tool.slug));

  for (const { tool } of dead) {
    if (existsSync(tool.path)) unlinkSync(tool.path);
    const logoPath = logoPathFor(tool);
    if (logoPath && existsSync(logoPath)) unlinkSync(logoPath);
    removed.push(tool.slug);
  }

  removeChangelogRows(slugs);
  return removed;
}

export function buildReport(results: ToolResult[], removed: string[] = [], runDate = new Date().toISOString()): string {
  const counts = new Map<LinkStatus, number>();
  for (const { result } of results) counts.set(result.status, (counts.get(result.status) ?? 0) + 1);
  const lines = [
    '# Tool Link Verification Report',
    '',
    `Generated: ${runDate}`,
    `Tools checked: ${results.length}`,
    `OK: ${counts.get('ok') ?? 0}`,
    `Removal candidates: ${counts.get('dead') ?? 0}`,
    `Blocked by provider: ${counts.get('blocked') ?? 0}`,
    `Transient failures: ${counts.get('transient') ?? 0}`,
    '',
  ];

  if (removed.length > 0) {
    lines.push('## Removed From This Branch', '');
    for (const slug of removed) lines.push(`- ${slug}`);
    lines.push('');
  }

  for (const status of ['dead', 'blocked', 'transient', 'missing', 'ok'] as const) {
    const rows = results.filter((item) => item.result.status === status);
    if (rows.length === 0) continue;
    const heading = status === 'dead'
      ? 'Removal Candidates'
      : status === 'blocked'
        ? 'Blocked Or Rate Limited'
        : status === 'transient'
          ? 'Transient Failures'
          : status === 'missing'
            ? 'Missing Websites'
            : 'Alive Links';
    lines.push(`## ${heading}`, '');
    for (const { tool, result } of rows) {
      const detail = result.httpStatus ?? result.error ?? 'unknown';
      lines.push(`- ${tool.slug}: ${tool.website || '(missing)'} [${detail}]`);
      if (result.note) lines.push(`  - ${result.note}`);
    }
    lines.push('');
  }

  return `${lines.join('\n').trimEnd()}\n`;
}

async function main() {
  const options = parseArgs(process.argv.slice(2));
  const tools = loadTools();
  console.log(`Checking ${tools.length} tool website(s) in parallel...\n`);

  const results = await Promise.all(tools.map(async (tool): Promise<ToolResult> => {
    if (!tool.website) {
      const result: ProbeResult = { status: 'missing', note: 'No website field' };
      console.warn(`⚠️   ${tool.slug}: no website field`);
      return { tool, result };
    }

    const result = await checkUrl(tool.website);
    const detail = result.httpStatus ?? result.error ?? 'unknown';
    if (result.status === 'ok') console.log(`✅  ${tool.slug}: ${tool.website} [${detail}]`);
    else if (result.status === 'dead') console.error(`❌  ${tool.slug}: ${tool.website} [${detail}]`);
    else console.warn(`⚠️   ${tool.slug}: ${tool.website} [${result.status}: ${detail}]`);
    return { tool, result };
  }));

  const dead = results.filter((item) => item.result.status === 'dead');
  const removed = options.removeDead ? removeDeadTools(results) : [];

  if (options.reportPath) {
    mkdirSync(dirname(options.reportPath), { recursive: true });
    writeFileSync(options.reportPath, buildReport(results, removed), 'utf-8');
    console.log(`\nReport written to ${options.reportPath}`);
  }

  const blocked = results.filter((item) => item.result.status === 'blocked').length;
  const transient = results.filter((item) => item.result.status === 'transient').length;
  console.log(`\n${dead.length === 0 ? '✅' : '❌'}  ${dead.length} removal candidate(s), ${blocked} blocked, ${transient} transient`);

  if (dead.length > 0 && !options.exitZero) process.exit(1);
}

const isCli = process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (isCli) {
  main().catch((error) => {
    console.error(error instanceof Error ? error.message : error);
    process.exit(1);
  });
}
