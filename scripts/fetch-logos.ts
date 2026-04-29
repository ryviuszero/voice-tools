#!/usr/bin/env tsx
/**
 * Fetches website logos for tools and stores them in public/logos/.
 *
 * Usage:
 *   npm run fetch-logos
 *   npm run fetch-logos -- --slug elevenlabs
 *
 * Existing logos are replaced when a fresh logo can be fetched. If no fresh
 * logo is available, the current logo is kept.
 */
import { existsSync, mkdirSync, readFileSync, readdirSync, statSync, unlinkSync, writeFileSync } from 'node:fs';
import { basename, extname, join } from 'node:path';
import matter from 'gray-matter';

const ROOT = process.cwd();
const TOOLS_DIR = join(ROOT, 'src/content/tools');
const LOGOS_DIR = join(ROOT, 'public/logos');

const USER_AGENT = 'VoiceToolsDirectoryLogoFetcher/0.1 (+https://voice.tools)';
const IMAGE_CONTENT_TYPES: Record<string, string> = {
  'image/svg+xml': 'svg',
  'image/png': 'png',
  'image/webp': 'webp',
  'image/jpeg': 'jpg',
  'image/jpg': 'jpg',
  'image/x-icon': 'ico',
  'image/vnd.microsoft.icon': 'ico',
};

type ToolFile = {
  slug: string;
  path: string;
  raw: string;
  data: Record<string, any>;
  content: string;
};

type LogoCandidate = {
  url: URL;
  score: number;
  source: string;
};

const args = new Set(process.argv.slice(2));
const slugArg = process.argv.find((arg) => arg.startsWith('--slug='))?.slice('--slug='.length);
const slugFlagIndex = process.argv.indexOf('--slug');
const onlySlug = slugArg ?? (slugFlagIndex >= 0 ? process.argv[slugFlagIndex + 1] : undefined);
if (args.has('--force')) {
  console.warn('!  --force is no longer required; existing logos are replaced whenever a fresh logo is found.');
}

const LOGO_EXTS = ['svg', 'png', 'webp', 'jpg', 'ico'] as const;

function decodeHtml(value: string): string {
  return value
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>');
}

function normalizeUrl(value: string, base: URL): URL | null {
  const trimmed = decodeHtml(value.trim());
  if (!trimmed || trimmed.startsWith('data:')) return null;
  try {
    return new URL(trimmed, base);
  } catch {
    return null;
  }
}

function getAttr(tag: string, attr: string): string | null {
  const pattern = new RegExp(`${attr}\\s*=\\s*("([^"]*)"|'([^']*)'|([^\\s>]+))`, 'i');
  const match = tag.match(pattern);
  return match?.[2] ?? match?.[3] ?? match?.[4] ?? null;
}

function candidateScore(url: URL, source: string): number {
  const value = `${source} ${url.pathname}`.toLowerCase();
  let score = 0;
  if (source.includes('og:image') || source.includes('og:logo')) score += 95;
  if (source.includes('twitter:image')) score += 85;
  if (value.includes('apple-touch-icon')) score += 75;
  if (value.includes('mask-icon')) score += 65;
  if (value.includes('icon')) score += 55;
  if (value.includes('logo')) score += 55;
  if (value.endsWith('.svg')) score += 15;
  if (value.endsWith('.png')) score += 10;
  if (value.includes('favicon')) score -= 10;
  if (url.hostname.endsWith('github.githubassets.com')) score -= 70;
  if (url.hostname === 'github.com' && value.includes('apple-touch-icon')) score -= 90;
  if (url.hostname === 'github.com' && value.includes('fluidicon')) score -= 90;
  if (value.includes('octocat')) score -= 80;
  return score;
}

function isGenericGithubLogoUrl(url: URL): boolean {
  const href = url.href.toLowerCase();
  const path = url.pathname.toLowerCase();
  if (url.hostname === 'github.com' && /(apple-touch-icon|favicon|fluidicon|octocat)/.test(path)) return true;
  if (url.hostname.endsWith('github.githubassets.com')) return true;
  if (url.hostname === 'www.google.com' && href.includes('domain=github.com')) return true;
  return href.includes('octocat') || href.includes('github-mark') || href.includes('github-logo');
}

function isGithubRepoUrl(url: URL): boolean {
  return url.hostname === 'github.com' && /^\/[^/]+\/[^/]+/.test(url.pathname);
}

function fallbackCandidates(website: URL): LogoCandidate[] {
  const candidates: LogoCandidate[] = [];
  if (isGithubRepoUrl(website)) {
    return candidates;
  }

  candidates.push(
    { url: new URL('/apple-touch-icon.png', website), source: 'fallback', score: 20 },
    { url: new URL('/favicon.svg', website), source: 'fallback', score: 18 },
    { url: new URL('/favicon.png', website), source: 'fallback', score: 15 },
    { url: new URL('/favicon.ico', website), source: 'fallback', score: 10 },
    {
      url: new URL(`https://www.google.com/s2/favicons?domain=${encodeURIComponent(website.hostname)}&sz=256`),
      source: 'google-s2-favicon',
      score: 25,
    },
  );

  return candidates;
}

function discoverCandidates(html: string, website: URL): LogoCandidate[] {
  const candidates: LogoCandidate[] = [];

  for (const tag of html.matchAll(/<link\b[^>]*>/gi)) {
    const raw = tag[0];
    const rel = getAttr(raw, 'rel')?.toLowerCase() ?? '';
    if (!/(icon|apple-touch-icon|mask-icon)/.test(rel)) continue;
    const href = getAttr(raw, 'href');
    if (!href) continue;
    const url = normalizeUrl(href, website);
    if (url) candidates.push({ url, source: rel, score: candidateScore(url, rel) });
  }

  for (const tag of html.matchAll(/<meta\b[^>]*>/gi)) {
    const raw = tag[0];
    const key = (getAttr(raw, 'property') ?? getAttr(raw, 'name') ?? '').toLowerCase();
    if (!['og:image', 'og:logo', 'twitter:image', 'twitter:image:src'].includes(key)) continue;
    const content = getAttr(raw, 'content');
    if (!content) continue;
    const url = normalizeUrl(content, website);
    if (url) candidates.push({ url, source: key, score: candidateScore(url, key) });
  }

  candidates.push(...fallbackCandidates(website));

  return candidates
    .filter((candidate) => !isGenericGithubLogoUrl(candidate.url))
    .filter((candidate, index, all) => all.findIndex((other) => other.url.href === candidate.url.href) === index)
    .sort((a, b) => b.score - a.score);
}

async function fetchText(url: URL): Promise<string> {
  const res = await fetch(url, { headers: { 'User-Agent': USER_AGENT } });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const contentType = res.headers.get('content-type') ?? '';
  if (contentType && !contentType.toLowerCase().includes('text/html')) {
    throw new Error(`not HTML (${contentType})`);
  }
  return res.text();
}

function extensionFromResponse(url: URL, contentType: string | null): string {
  const normalizedType = contentType?.split(';')[0].trim().toLowerCase() ?? '';
  if (IMAGE_CONTENT_TYPES[normalizedType]) return IMAGE_CONTENT_TYPES[normalizedType];
  const ext = extname(url.pathname).replace('.', '').toLowerCase();
  if (['svg', 'png', 'webp', 'jpg', 'jpeg', 'ico'].includes(ext)) return ext === 'jpeg' ? 'jpg' : ext;
  return 'png';
}

async function downloadCandidate(candidate: LogoCandidate): Promise<{ bytes: Uint8Array; ext: string }> {
  if (isGenericGithubLogoUrl(candidate.url)) {
    throw new Error('generic GitHub logo candidate');
  }

  const res = await fetch(candidate.url, { headers: { 'User-Agent': USER_AGENT } });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);

  if (res.url && isGenericGithubLogoUrl(new URL(res.url))) {
    throw new Error('redirected to generic GitHub logo');
  }

  const contentType = res.headers.get('content-type');
  const type = contentType?.split(';')[0].trim().toLowerCase() ?? '';
  if (type && !IMAGE_CONTENT_TYPES[type] && !type.startsWith('image/')) {
    throw new Error(`not an image (${contentType})`);
  }

  const bytes = new Uint8Array(await res.arrayBuffer());
  if (bytes.length === 0) throw new Error('empty image');
  if (bytes.length > 2_000_000) throw new Error(`image too large (${bytes.length} bytes)`);

  return { bytes, ext: extensionFromResponse(candidate.url, contentType) };
}

function loadTools(): ToolFile[] {
  return readdirSync(TOOLS_DIR)
    .filter((file) => file.endsWith('.md'))
    .map((file) => {
      const filePath = join(TOOLS_DIR, file);
      const raw = readFileSync(filePath, 'utf-8');
      const parsed = matter(raw);
      return {
        slug: basename(file, '.md'),
        path: filePath,
        raw,
        data: parsed.data,
        content: parsed.content,
      };
    })
    .filter((tool) => !onlySlug || tool.slug === onlySlug);
}

function saveTool(tool: ToolFile, logoPath: string): void {
  const next = tool.raw.match(/^---\r?\n/)
    ? tool.raw.replace(/^logo:\s*.*$/m, `logo: ${logoPath}`)
    : matter.stringify(tool.content.trimStart(), { ...tool.data, logo: logoPath }, { lineWidth: 120 } as any);
  writeFileSync(tool.path, next, 'utf-8');
}

function publicLogoToFilePath(publicPath: string): string {
  return join(ROOT, 'public', publicPath.replace(/^\//, ''));
}

function existingLogoPath(slug: string): string | null {
  for (const ext of LOGO_EXTS) {
    const logoPath = join(LOGOS_DIR, `${slug}.${ext}`);
    if (existsSync(logoPath)) return `/logos/${slug}.${ext}`;
  }
  return null;
}

function isWeakGithubFallbackLogo(publicPath: string | null): boolean {
  if (!publicPath) return false;
  const ext = extname(publicPath).toLowerCase();
  if (!['.png', '.jpg', '.ico'].includes(ext)) return false;

  const filePath = publicLogoToFilePath(publicPath);
  if (!existsSync(filePath)) return false;

  try {
    return statSync(filePath).size <= 1000;
  } catch {
    return false;
  }
}

function removeStaleLogoFiles(slug: string, keepExt: string): void {
  for (const ext of LOGO_EXTS) {
    if (ext === keepExt) continue;
    const logoPath = join(LOGOS_DIR, `${slug}.${ext}`);
    if (existsSync(logoPath)) unlinkSync(logoPath);
  }
}

function svgEscape(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function initialsForTool(tool: ToolFile): string {
  const name = String(tool.data.name ?? tool.slug)
    .replace(/[^a-z0-9\s-]/gi, ' ')
    .trim();
  const parts = name.split(/[\s-]+/).filter(Boolean);
  const initials = parts.length >= 2
    ? `${parts[0][0]}${parts[1][0]}`
    : name.slice(0, 2);
  return initials.toUpperCase() || tool.slug.slice(0, 2).toUpperCase();
}

function colorPairForSlug(slug: string): { bg: string; fg: string; accent: string } {
  const palettes = [
    { bg: '#fff7ed', fg: '#17130f', accent: '#fb923c' },
    { bg: '#ecfeff', fg: '#0f172a', accent: '#06b6d4' },
    { bg: '#f0fdf4', fg: '#132015', accent: '#22c55e' },
    { bg: '#eef2ff', fg: '#111827', accent: '#6366f1' },
    { bg: '#fefce8', fg: '#17130f', accent: '#eab308' },
  ];
  const index = [...slug].reduce((sum, char) => sum + char.charCodeAt(0), 0) % palettes.length;
  return palettes[index];
}

function writeFallbackLogo(tool: ToolFile, reason: string): void {
  mkdirSync(LOGOS_DIR, { recursive: true });
  removeStaleLogoFiles(tool.slug, 'svg');

  const colors = colorPairForSlug(tool.slug);
  const initials = svgEscape(initialsForTool(tool));
  const label = svgEscape(String(tool.data.name ?? tool.slug));
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" role="img" aria-label="${label} logo">
  <rect width="128" height="128" rx="28" fill="${colors.bg}"/>
  <circle cx="96" cy="32" r="14" fill="${colors.accent}" opacity="0.85"/>
  <path d="M28 78c12-22 24-32 36-32s24 10 36 32" fill="none" stroke="${colors.accent}" stroke-width="9" stroke-linecap="round"/>
  <text x="64" y="76" fill="${colors.fg}" font-family="Arial, sans-serif" font-size="34" font-weight="800" text-anchor="middle">${initials}</text>
</svg>
`;
  const publicPath = `/logos/${tool.slug}.svg`;
  writeFileSync(join(LOGOS_DIR, `${tool.slug}.svg`), svg, 'utf-8');
  saveTool(tool, publicPath);
  console.warn(`◇  ${tool.slug}: generated fallback logo at ${publicPath} (${reason})`);
}

async function fetchLogoForTool(tool: ToolFile): Promise<void> {
  const websiteValue = String(tool.data.website ?? '');
  if (!websiteValue) throw new Error(`${tool.slug}: missing website`);

  const existing = existingLogoPath(tool.slug);

  const website = new URL(websiteValue);
  let candidates: LogoCandidate[];
  try {
    const html = await fetchText(website);
    candidates = discoverCandidates(html, website);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.warn(`!  ${tool.slug}: homepage metadata unavailable (${message}); trying favicon fallbacks`);
    candidates = fallbackCandidates(website);
  }

  const errors: string[] = [];
  for (const candidate of candidates) {
    try {
      const { bytes, ext } = await downloadCandidate(candidate);
      mkdirSync(LOGOS_DIR, { recursive: true });
      removeStaleLogoFiles(tool.slug, ext);
      const outputPath = join(LOGOS_DIR, `${tool.slug}.${ext}`);
      writeFileSync(outputPath, bytes);
      const publicPath = `/logos/${tool.slug}.${ext}`;
      saveTool(tool, publicPath);
      console.log(`${existing ? '↻' : '✓'}  ${tool.slug}: ${publicPath} (${candidate.source} → ${candidate.url.href})`);
      return;
    } catch (error) {
      errors.push(`${candidate.url.href}: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  if (isGithubRepoUrl(website) && (!existing || isWeakGithubFallbackLogo(existing))) {
    writeFallbackLogo(tool, existing ? 'replaced weak GitHub fallback' : 'GitHub repo has no project logo candidate');
    return;
  }

  if (existing) {
    if (tool.data.logo !== existing) saveTool(tool, existing);
    console.warn(
      `↷  ${tool.slug}: keeping existing logo at ${existing}; no fresh replacement found\n${errors
        .map((error) => `   - ${error}`)
        .join('\n')}`,
    );
    return;
  }

  throw new Error(`${tool.slug}: no usable logo found\n${errors.map((error) => `   - ${error}`).join('\n')}`);
}

async function main() {
  const tools = loadTools();
  if (tools.length === 0) {
    throw new Error(onlySlug ? `No tool found for slug "${onlySlug}"` : 'No tools found');
  }

  let failures = 0;
  for (const tool of tools) {
    try {
      await fetchLogoForTool(tool);
    } catch (error) {
      failures++;
      console.error(`✗  ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  if (failures > 0) process.exit(1);
}

main();
