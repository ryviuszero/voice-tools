#!/usr/bin/env tsx
/**
 * Content authenticity audit for tool pages.
 *
 * This catches mistakes that schema validation cannot catch:
 * - website URLs that do not appear to belong to the tool
 * - YouTube demo videos whose title/channel do not match the tool
 * - open-source GitHub projects with no repo activity in the last six months
 */
import { readdirSync, readFileSync } from 'node:fs';
import { basename, join } from 'node:path';
import matter from 'gray-matter';

const TOOLS_DIR = join(process.cwd(), 'src/content/tools');
const TIMEOUT_MS = 15_000;
const SIX_MONTHS_MS = 183 * 24 * 60 * 60 * 1000;
const CONCURRENCY = 8;
const cutoff = new Date(Date.now() - SIX_MONTHS_MS);

type Tool = {
  slug: string;
  name: string;
  website: string;
  pricingUrl?: string;
  openSource: boolean;
  githubSource?: string;
  video?: { url?: string; title?: string };
};

function normalize(value: string): string {
  return value.toLowerCase().replace(/&/g, ' and ').replace(/[^a-z0-9]+/g, ' ').trim();
}

function compact(value: string): string {
  return normalize(value).replace(/\s+/g, '');
}

function tokensFor(tool: Tool): string[] {
  const host = safeHostname(tool.website).replace(/^www\./, '').split('.')[0] ?? '';
  const raw = [
    tool.slug,
    tool.name,
    host,
    ...tool.slug.split('-'),
    ...tool.name.split(/\s+/),
  ];
  return [...new Set(raw.map(compact).filter((t) => t.length >= 3 && !['ai', 'api', 'tts', 'stt', 'the'].includes(t)))];
}

function safeHostname(url: string): string {
  try {
    return new URL(url).hostname;
  } catch {
    return '';
  }
}

function githubRepoFromUrl(url?: string): string | undefined {
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

function youtubeId(url?: string): string | undefined {
  if (!url) return undefined;
  try {
    const parsed = new URL(url);
    if (parsed.hostname.includes('youtu.be')) return parsed.pathname.split('/').filter(Boolean)[0];
    if (parsed.hostname.includes('youtube.com')) return parsed.searchParams.get('v') ?? undefined;
  } catch {
    return undefined;
  }
}

async function fetchText(url: string): Promise<{ ok: boolean; status?: number; text?: string; error?: string }> {
  try {
    const res = await fetch(url, {
      redirect: 'follow',
      signal: AbortSignal.timeout(TIMEOUT_MS),
      headers: { 'User-Agent': 'VoiceToolsDirectory/1.0 (+https://voice.tools/about)' },
    });
    return { ok: res.ok, status: res.status, text: await res.text() };
  } catch (e) {
    return { ok: false, error: String(e) };
  }
}

async function fetchJson<T>(url: string): Promise<{ ok: boolean; status?: number; data?: T; error?: string }> {
  try {
    const res = await fetch(url, {
      redirect: 'follow',
      signal: AbortSignal.timeout(TIMEOUT_MS),
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'VoiceToolsDirectory/1.0 (+https://voice.tools/about)',
      },
    });
    return { ok: res.ok, status: res.status, data: await res.json() as T };
  } catch (e) {
    return { ok: false, error: String(e) };
  }
}

function loadTools(): Tool[] {
  return readdirSync(TOOLS_DIR)
    .filter((f) => f.endsWith('.md'))
    .map((filename) => {
      const { data } = matter(readFileSync(join(TOOLS_DIR, filename), 'utf-8'));
      return {
        slug: basename(filename, '.md'),
        name: data.name ?? basename(filename, '.md'),
        website: data.website ?? '',
        pricingUrl: data.pricing?.pricing_url,
        openSource: Boolean(data.capabilities?.open_source),
        githubSource: data.github_metrics?.source_url,
        video: data.video,
      };
    });
}

async function auditWebsite(tool: Tool): Promise<string[]> {
  const issues: string[] = [];
  if (!tool.website) return [`${tool.slug}: missing website`];
  const result = await fetchText(tool.website);
  if (!result.ok) return [`${tool.slug}: website fetch failed (${result.status ?? result.error})`];
  const pageText = compact(`${safeHostname(tool.website)} ${result.text?.slice(0, 80_000) ?? ''}`);
  const matched = tokensFor(tool).some((token) => pageText.includes(token));
  if (!matched) {
    issues.push(`${tool.slug}: website content/host does not appear to mention tool name or slug (${tool.website})`);
  }
  return issues;
}

async function auditVideo(tool: Tool): Promise<string[]> {
  const issues: string[] = [];
  if (!tool.video?.url) return [`${tool.slug}: missing demo video`];
  const id = youtubeId(tool.video.url);
  if (!id) return [`${tool.slug}: unsupported YouTube URL (${tool.video.url})`];
  const result = await fetchJson<{ title?: string; author_name?: string }>(
    `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${id}&format=json`
  );
  if (!result.ok || !result.data?.title) {
    return [`${tool.slug}: YouTube oEmbed fetch failed (${result.status ?? result.error})`];
  }
  const haystack = compact(`${result.data.title} ${result.data.author_name ?? ''} ${tool.video.title ?? ''}`);
  const matched = tokensFor(tool).some((token) => haystack.includes(token));
  if (!matched) {
    issues.push(`${tool.slug}: demo video does not match tool (${result.data.title} / ${result.data.author_name ?? 'unknown channel'})`);
  }
  return issues;
}

async function auditOpenSource(tool: Tool): Promise<string[]> {
  if (!tool.openSource) return [];
  const repo = githubRepoFromUrl(tool.website) ?? githubRepoFromUrl(tool.pricingUrl) ?? githubRepoFromUrl(tool.githubSource);
  if (!repo) return [`${tool.slug}: open-source tool has no GitHub repo URL to verify activity`];
  const result = await fetchJson<{ pushed_at?: string; archived?: boolean }>(`https://api.github.com/repos/${repo}`);
  if (!result.ok || !result.data?.pushed_at) {
    return [`${tool.slug}: GitHub repo fetch failed for ${repo} (${result.status ?? result.error})`];
  }
  const pushedAt = new Date(result.data.pushed_at);
  const issues: string[] = [];
  if (result.data.archived) issues.push(`${tool.slug}: GitHub repo ${repo} is archived`);
  if (pushedAt < cutoff) {
    issues.push(`${tool.slug}: GitHub repo ${repo} last pushed ${result.data.pushed_at}, older than six months`);
  }
  return issues;
}

async function main() {
  const tools = loadTools();
  console.log(`Auditing ${tools.length} tool page(s)...\n`);
  const allIssues: string[] = [];

  let index = 0;
  async function worker() {
    for (;;) {
      const tool = tools[index++];
      if (!tool) return;
    const issues = [
      ...(await auditWebsite(tool)),
      ...(await auditVideo(tool)),
      ...(await auditOpenSource(tool)),
    ];
    if (issues.length === 0) {
      console.log(`✅  ${tool.slug}`);
    } else {
      for (const issue of issues) {
        console.error(`❌  ${issue}`);
        allIssues.push(issue);
      }
    }
  }
  }

  await Promise.all(Array.from({ length: CONCURRENCY }, () => worker()));

  console.log('');
  if (allIssues.length > 0) {
    console.error(`❌  Authenticity audit failed: ${allIssues.length} issue(s)`);
    process.exit(1);
  }
  console.log('✅  Authenticity audit passed');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
