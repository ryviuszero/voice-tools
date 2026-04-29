#!/usr/bin/env tsx
/**
 * Dead-link checker for tool websites.
 * Run:  npm run verify-tools
 * CI:   .github/workflows/verify-links.yml  (weekly)
 */
import { readdirSync, readFileSync } from 'node:fs';
import { join, basename } from 'node:path';
import matter from 'gray-matter';

const TOOLS_DIR = join(process.cwd(), 'src/content/tools');
const TIMEOUT_MS = 12_000;

interface ToolLink {
  slug:    string;
  name:    string;
  website: string;
}

async function checkUrl(url: string): Promise<{ ok: boolean; status?: number; error?: string }> {
  try {
    const res = await fetch(url, {
      method: 'HEAD',
      redirect: 'follow',
      signal: AbortSignal.timeout(TIMEOUT_MS),
      headers: { 'User-Agent': 'VoiceToolsDirectory/1.0 (+https://voice.tools/about)' },
    });
    // Some servers block HEAD; treat 405 as likely-alive
    return { ok: res.ok || res.status === 405, status: res.status };
  } catch (e) {
    return { ok: false, error: String(e) };
  }
}

async function main() {
  const files = readdirSync(TOOLS_DIR).filter((f) => f.endsWith('.md'));

  const tools: ToolLink[] = files.map((f) => {
    const { data } = matter(readFileSync(join(TOOLS_DIR, f), 'utf-8'));
    return {
      slug:    basename(f, '.md'),
      name:    (data.name as string) || basename(f, '.md'),
      website: (data.website as string) || '',
    };
  });

  console.log(`Checking ${tools.length} tool website(s) in parallel…\n`);

  const settled = await Promise.allSettled(
    tools.map(async (tool) => {
      if (!tool.website) {
        console.warn(`⚠️   ${tool.slug}: no website field`);
        return { ok: true };
      }
      const result = await checkUrl(tool.website);
      if (result.ok) {
        console.log(`✅  ${tool.slug}: ${tool.website} [${result.status ?? 'ok'}]`);
      } else {
        console.error(`❌  ${tool.slug}: ${tool.website} [${result.status ?? result.error}]`);
      }
      return result;
    })
  );

  const failures = settled.filter(
    (s) => s.status === 'fulfilled' && !s.value.ok
  ).length;

  console.log(`\n${failures === 0 ? '✅  All links alive' : `❌  ${failures} dead link(s)`}`);
  if (failures > 0) process.exit(1);
}

main().catch((e) => { console.error(e); process.exit(1); });
