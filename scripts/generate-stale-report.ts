#!/usr/bin/env tsx
/**
 * Generates a maintenance report for data that needs human review.
 *
 * This script is intentionally read-only for source data. It writes a Markdown
 * report under reports/ so scheduled workflows can upload it as an artifact.
 */
import { existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { basename, dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import matter from 'gray-matter';

const ROOT = process.cwd();
const TOOLS_DIR = join(ROOT, 'src/content/tools');
const DEFAULT_REPORT_PATH = join(ROOT, 'reports/stale-tools.md');
const DEFAULT_STALE_DAYS = 90;

type CliOptions = {
  reportPath: string;
  staleDays: number;
};

type ToolMaintenanceState = {
  slug: string;
  name: string;
  website: string;
  verifiedAt?: string;
  ageDays?: number;
  primaryCategory?: string;
  isOpenSource: boolean;
  hasTrafficEstimate: boolean;
  hasGithubMetrics: boolean;
  hasDemoVideo: boolean;
  issues: string[];
};

export function parseArgs(argv: string[]): CliOptions {
  const options: CliOptions = {
    reportPath: DEFAULT_REPORT_PATH,
    staleDays: DEFAULT_STALE_DAYS,
  };

  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (arg === '--report') {
      options.reportPath = resolve(argv[++i]);
    } else if (arg.startsWith('--report=')) {
      options.reportPath = resolve(arg.slice('--report='.length));
    } else if (arg === '--stale-days') {
      options.staleDays = parsePositiveInt(argv[++i], '--stale-days');
    } else if (arg.startsWith('--stale-days=')) {
      options.staleDays = parsePositiveInt(arg.slice('--stale-days='.length), '--stale-days');
    } else {
      throw new Error(`Unknown argument: ${arg}`);
    }
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

function readTools(): ToolMaintenanceState[] {
  if (!existsSync(TOOLS_DIR)) throw new Error(`Tools directory not found: ${TOOLS_DIR}`);
  return readdirSync(TOOLS_DIR)
    .filter((file) => file.endsWith('.md'))
    .sort()
    .map((file) => {
      const { data } = matter(readFileSync(join(TOOLS_DIR, file), 'utf-8'));
      return buildToolMaintenanceState({
        slug: basename(file, '.md'),
        data,
      });
    });
}

export function buildToolMaintenanceState(input: {
  slug: string;
  data: Record<string, any>;
  now?: Date;
  staleDays?: number;
}): ToolMaintenanceState {
  const now = input.now ?? new Date();
  const staleDays = input.staleDays ?? DEFAULT_STALE_DAYS;
  const verifiedAt = normalizeDate(input.data.verified_at);
  const ageDays = verifiedAt ? daysBetween(verifiedAt, now) : undefined;
  const isOpenSource = Boolean(input.data.capabilities?.open_source);
  const hasTrafficEstimate = Boolean(input.data.traffic_estimates);
  const hasGithubMetrics = Boolean(input.data.github_metrics);
  const hasDemoVideo = Boolean(input.data.video?.url);
  const website = String(input.data.website ?? '');
  const issues: string[] = [];

  if (!verifiedAt) issues.push('missing verified_at');
  else if (ageDays !== undefined && ageDays > staleDays) issues.push(`verified_at older than ${staleDays} days`);
  if (!website) issues.push('missing website');
  if (isOpenSource && !hasGithubMetrics) issues.push('open-source tool missing github_metrics');
  if (!isOpenSource && !hasTrafficEstimate) issues.push('commercial/hosted tool missing traffic_estimates');
  if (!hasDemoVideo) issues.push('missing demo video');

  return {
    slug: input.slug,
    name: String(input.data.name ?? input.slug),
    website,
    verifiedAt,
    ageDays,
    primaryCategory: input.data.primary_category,
    isOpenSource,
    hasTrafficEstimate,
    hasGithubMetrics,
    hasDemoVideo,
    issues,
  };
}

function normalizeDate(value: unknown): string | undefined {
  if (value instanceof Date) return value.toISOString().slice(0, 10);
  if (typeof value === 'string' && /^\d{4}-\d{2}-\d{2}/.test(value)) return value.slice(0, 10);
  return undefined;
}

function daysBetween(dateIso: string, now: Date): number {
  const then = new Date(`${dateIso}T00:00:00.000Z`);
  const today = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));
  return Math.max(0, Math.floor((today.getTime() - then.getTime()) / 86_400_000));
}

export function buildStaleReport(tools: ToolMaintenanceState[], options: Pick<CliOptions, 'staleDays'>, runDate = todayIso()): string {
  const stale = tools.filter((tool) => tool.issues.length > 0)
    .sort((a, b) => (b.ageDays ?? 9999) - (a.ageDays ?? 9999) || a.slug.localeCompare(b.slug));
  const byIssue = summarizeIssues(stale);

  const lines = [
    '# Stale Tools Report',
    '',
    `Generated: ${runDate}`,
    `Stale threshold: ${options.staleDays} days`,
    `Tools checked: ${tools.length}`,
    `Tools needing review: ${stale.length}`,
    '',
    '## Summary',
    '',
  ];

  if (byIssue.length === 0) {
    lines.push('- No maintenance issues found.');
  } else {
    for (const [issue, count] of byIssue) lines.push(`- ${issue}: ${count}`);
  }

  lines.push('', '## Review Queue', '');
  if (stale.length === 0) {
    lines.push('No tools currently need maintenance review.');
  } else {
    lines.push('| Tool | Category | Verified | Age | Issues |');
    lines.push('| --- | --- | --- | ---: | --- |');
    for (const tool of stale) {
      lines.push([
        `[${escapeTable(tool.name)}](../src/content/tools/${tool.slug}.md)`,
        escapeTable(tool.primaryCategory ?? ''),
        tool.verifiedAt ?? '',
        tool.ageDays === undefined ? '' : String(tool.ageDays),
        escapeTable(tool.issues.join('; ')),
      ].join(' | ').replace(/^/, '| ').replace(/$/, ' |'));
    }
  }

  return `${lines.join('\n').trimEnd()}\n`;
}

function summarizeIssues(tools: ToolMaintenanceState[]): Array<[string, number]> {
  const counts = new Map<string, number>();
  for (const tool of tools) {
    for (const issue of tool.issues) counts.set(issue, (counts.get(issue) ?? 0) + 1);
  }
  return [...counts.entries()].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));
}

function escapeTable(value: string): string {
  return value.replace(/\|/g, '\\|').replace(/\n/g, ' ');
}

async function main() {
  const options = parseArgs(process.argv.slice(2));
  const tools = readTools().map((tool) => buildToolMaintenanceState({
    slug: tool.slug,
    data: {
      name: tool.name,
      website: tool.website,
      verified_at: tool.verifiedAt,
      primary_category: tool.primaryCategory,
      capabilities: { open_source: tool.isOpenSource },
      traffic_estimates: tool.hasTrafficEstimate ? {} : undefined,
      github_metrics: tool.hasGithubMetrics ? {} : undefined,
      video: tool.hasDemoVideo ? { url: 'present' } : undefined,
    },
    staleDays: options.staleDays,
  }));
  const report = buildStaleReport(tools, options);
  mkdirSync(dirname(options.reportPath), { recursive: true });
  writeFileSync(options.reportPath, report, 'utf-8');
  console.log(`Stale tools report written to ${options.reportPath}`);
}

const isCli = process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (isCli) {
  main().catch((error) => {
    console.error(error instanceof Error ? error.message : error);
    process.exit(1);
  });
}
