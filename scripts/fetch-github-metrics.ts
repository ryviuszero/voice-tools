#!/usr/bin/env tsx
/**
 * Best-effort GitHub metrics fetcher for open-source tool pages.
 *
 * Usage:
 *   npm run fetch-github-metrics
 *   npm run fetch-github-metrics -- --missing-only
 *   npm run fetch-github-metrics -- --slug silero-vad
 *   npm run fetch-github-metrics -- --dry-run
 */
import { readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { basename, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import matter from 'gray-matter';

const ROOT = process.cwd();
const TOOLS_DIR = join(ROOT, 'src/content/tools');
const FETCH_TIMEOUT_MS = 15_000;
const STALE_DAYS = 183;

type CliOptions = {
  slug?: string;
  dryRun: boolean;
  missingOnly: boolean;
};

type ToolFile = {
  slug: string;
  path: string;
  data: Record<string, any>;
  content: string;
};

type GithubMetrics = {
  repo: string;
  source_url: string;
  captured_at: string;
  stars: number;
  forks: number;
  watchers?: number;
  open_issues?: number;
  last_commit_at?: string;
  latest_release_at?: string;
  has_releases?: boolean;
  license?: string;
  primary_language?: string;
  archived: boolean;
  signals: Array<'popular' | 'trending' | 'maintained' | 'dormant' | 'archived' | 'no_releases'>;
  note?: string;
};

type RepoResponse = {
  full_name: string;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  subscribers_count?: number;
  watchers_count?: number;
  open_issues_count?: number;
  pushed_at?: string;
  archived?: boolean;
  license?: { spdx_id?: string | null; name?: string | null } | null;
  language?: string | null;
};

type ReleaseResponse = {
  published_at?: string;
};

export function parseArgs(argv: string[]): CliOptions {
  const options: CliOptions = { dryRun: false, missingOnly: false };
  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (arg === '--dry-run') {
      options.dryRun = true;
    } else if (arg === '--missing-only') {
      options.missingOnly = true;
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

function repoForTool(tool: ToolFile): string | undefined {
  return [
    tool.data.github_metrics?.source_url,
    tool.data.website,
    tool.data.pricing?.pricing_url,
  ].map((value) => githubRepoFromUrl(typeof value === 'string' ? value : undefined)).find(Boolean);
}

function todayIso(): string {
  return new Date().toISOString().slice(0, 10);
}

function dateIso(value?: string): string | undefined {
  if (!value) return undefined;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? undefined : date.toISOString().slice(0, 10);
}

function daysSince(value?: string): number | undefined {
  const iso = dateIso(value);
  if (!iso) return undefined;
  const then = new Date(`${iso}T00:00:00.000Z`);
  const now = new Date();
  return Math.max(0, Math.floor((now.getTime() - then.getTime()) / 86_400_000));
}

function githubHeaders(): Record<string, string> {
  const headers: Record<string, string> = {
    Accept: 'application/vnd.github+json',
    'User-Agent': 'VoiceToolsDirectoryGitHubMetrics/0.1 (+https://voice.tools/about)',
    'X-GitHub-Api-Version': '2022-11-28',
  };
  if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  return headers;
}

async function fetchGithubJson<T>(url: string): Promise<{ ok: boolean; status?: number; data?: T; error?: string }> {
  try {
    const res = await fetch(url, {
      headers: githubHeaders(),
      signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
    });
    if (!res.ok) return { ok: false, status: res.status, error: `HTTP ${res.status}` };
    return { ok: true, status: res.status, data: await res.json() as T };
  } catch (error) {
    return { ok: false, error: error instanceof Error ? error.message : String(error) };
  }
}

function signalsFor(repo: RepoResponse, latestReleaseAt?: string): GithubMetrics['signals'] {
  const signals: GithubMetrics['signals'] = [];
  if (repo.stargazers_count >= 5000) signals.push('popular');
  if (repo.archived) signals.push('archived');
  const ageDays = daysSince(repo.pushed_at);
  if (ageDays !== undefined && ageDays <= STALE_DAYS && !repo.archived) signals.push('maintained');
  if (ageDays !== undefined && ageDays > STALE_DAYS) signals.push('dormant');
  if (!latestReleaseAt) signals.push('no_releases');
  return signals;
}

export async function fetchGithubMetrics(repoName: string, capturedAt = todayIso()): Promise<GithubMetrics> {
  const repoResult = await fetchGithubJson<RepoResponse>(`https://api.github.com/repos/${repoName}`);
  if (!repoResult.ok || !repoResult.data) {
    throw new Error(`GitHub repo fetch failed for ${repoName} (${repoResult.status ?? repoResult.error})`);
  }
  const releaseResult = await fetchGithubJson<ReleaseResponse>(`https://api.github.com/repos/${repoName}/releases/latest`);
  const latestReleaseAt = releaseResult.ok ? dateIso(releaseResult.data?.published_at) : undefined;
  const repo = repoResult.data;

  return {
    repo: repo.full_name,
    source_url: repo.html_url,
    captured_at: capturedAt,
    stars: repo.stargazers_count,
    forks: repo.forks_count,
    watchers: repo.subscribers_count ?? repo.watchers_count,
    open_issues: repo.open_issues_count,
    last_commit_at: dateIso(repo.pushed_at),
    latest_release_at: latestReleaseAt,
    has_releases: Boolean(latestReleaseAt),
    license: repo.license?.spdx_id && repo.license.spdx_id !== 'NOASSERTION'
      ? repo.license.spdx_id
      : repo.license?.name ?? undefined,
    primary_language: repo.language ?? undefined,
    archived: Boolean(repo.archived),
    signals: signalsFor(repo, latestReleaseAt),
    note: 'GitHub public repository metrics captured for maintenance screening; verify repository activity before relying on it for production choices.',
  };
}

function serializeDates<T>(value: T): T {
  if (value instanceof Date) return value.toISOString().slice(0, 10) as T;
  if (Array.isArray(value)) return value.map(serializeDates) as T;
  if (!value || typeof value !== 'object') return value;
  return Object.fromEntries(
    Object.entries(value as Record<string, unknown>).map(([key, entry]) => [key, serializeDates(entry)])
  ) as T;
}

export function formatDatesForYaml(markdown: string): string {
  return markdown
    .replace(/^(\s*)(captured_at|verified_at|last_commit_at|latest_release_at):\s*'(\d{4}-\d{2}-\d{2})'$/gm, '$1$2: $3')
    .replace(/^(\s*)(captured_at|verified_at|last_commit_at|latest_release_at):\s*"(\d{4}-\d{2}-\d{2})"$/gm, '$1$2: $3')
    .replace(/^(\s*)(captured_at|verified_at|last_commit_at|latest_release_at):\s*(\d{4}-\d{2}-\d{2})T00:00:00\.000Z$/gm, '$1$2: $3')
    .replace(/^(\s*)(captured_at|verified_at|last_commit_at|latest_release_at):\s*!!timestamp\s+(\d{4}-\d{2}-\d{2})T00:00:00\.000Z$/gm, '$1$2: $3');
}

export function saveTool(tool: ToolFile, metrics: GithubMetrics): void {
  const data = structuredClone(tool.data);
  data.github_metrics = serializeDates(metrics);
  const output = formatDatesForYaml(matter.stringify(tool.content.trim(), data));
  writeFileSync(tool.path, output, 'utf-8');
}

async function main() {
  const options = parseArgs(process.argv.slice(2));
  const tools = readTools(options.slug);
  const capturedAt = todayIso();
  let updated = 0;
  let found = 0;

  console.log(`Fetching GitHub metrics for ${tools.length} tool(s)${options.dryRun ? ' [dry-run]' : ''}...`);
  for (const tool of tools) {
    if (!tool.data.capabilities?.open_source) {
      console.log(`- ${tool.slug}: skipped non-open-source tool`);
      continue;
    }
    if (options.missingOnly && tool.data.github_metrics) {
      console.log(`- ${tool.slug}: skipped existing github_metrics`);
      continue;
    }

    const repo = repoForTool(tool);
    if (!repo) {
      console.warn(`! ${tool.slug}: no GitHub repo URL found`);
      continue;
    }

    try {
      const metrics = await fetchGithubMetrics(repo, capturedAt);
      found++;
      console.log(`✓ ${tool.slug}: ${metrics.repo} (${metrics.stars.toLocaleString('en-US')} stars)`);
      if (!options.dryRun) {
        saveTool(tool, metrics);
        updated++;
      }
    } catch (error) {
      console.warn(`! ${tool.slug}: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  console.log(`Done. Found ${found}; updated ${updated} file(s).`);
}

const isCli = process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (isCli) {
  main().catch((error) => {
    console.error(error instanceof Error ? error.message : error);
    process.exit(1);
  });
}
