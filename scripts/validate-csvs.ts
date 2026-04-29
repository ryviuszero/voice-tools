#!/usr/bin/env tsx
/**
 * Validates data/categories.csv and data/changelog.csv.
 * Run:  npm run validate
 * CI:   .github/workflows/validate-data.yml
 */
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { join, basename } from 'node:path';
import Papa from 'papaparse';
import matter from 'gray-matter';

const ROOT      = process.cwd();
const TOOLS_DIR = join(ROOT, 'src/content/tools');
const WORKFLOWS_DIR = join(ROOT, 'src/content/workflows');
const DATA_DIR  = join(ROOT, 'data');

let errors   = 0;
let warnings = 0;

function fail(msg: string)  { console.error(`❌  ${msg}`); errors++; }
function warn(msg: string)  { console.warn(`⚠️   ${msg}`); warnings++; }
function pass(msg: string)  { console.log(`✅  ${msg}`); }

// ── Helpers ────────────────────────────────────────────────────────────────

function parseCSV(filename: string): Record<string, string>[] {
  const filePath = join(DATA_DIR, filename);
  if (!existsSync(filePath)) {
    fail(`File not found: ${filePath}`);
    return [];
  }
  const result = Papa.parse<Record<string, string>>(readFileSync(filePath, 'utf-8'), {
    header:         true,
    skipEmptyLines: true,
    dynamicTyping:  false,
  });
  result.errors.forEach((e) => fail(`${filename} row ${e.row}: ${e.message}`));
  return result.data;
}

function getToolSlugs(): Set<string> {
  if (!existsSync(TOOLS_DIR)) {
    fail(`Tools directory not found: ${TOOLS_DIR}`);
    return new Set();
  }
  return new Set(
    readdirSync(TOOLS_DIR)
      .filter((f) => f.endsWith('.md'))
      .map((f) => basename(f, '.md'))
  );
}

function compactText(value: unknown): string {
  return String(value ?? '').toLowerCase().replace(/[^a-z0-9]+/g, '');
}

function wordTokens(value: unknown): string[] {
  return String(value ?? '').toLowerCase().match(/[a-z0-9]+/g) ?? [];
}

function videoTitleMentionsTool(data: Record<string, any>): boolean {
  const title = data.video?.title;
  if (!title || !data.name) return true;

  const titleCompact = compactText(title);
  const titleTokenSet = new Set(wordTokens(title));
  const nameCompact = compactText(data.name);
  const slugCompact = compactText(data.slug);

  if (nameCompact && titleCompact.includes(nameCompact)) return true;
  if (slugCompact && titleCompact.includes(slugCompact)) return true;

  const ignored = new Set(['api', 'web', 'ui', 'the', 'and', 'for']);
  const brandTokens = wordTokens(data.name).filter((token) => !ignored.has(token));
  return brandTokens.length > 0 && brandTokens.every((token) => (
    titleTokenSet.has(token) || titleCompact.includes(token)
  ));
}

function validateToolVideo(slug: string, data: Record<string, any>): void {
  if (!data.video) return;
  if (!data.video.title) {
    fail(`${slug}.md: video.title is required when video is present`);
    return;
  }
  if (/workflow reference/i.test(String(data.video.title))) {
    fail(`${slug}.md: video.title "${data.video.title}" is a generic placeholder, not a verified demo title`);
  }
  if (!videoTitleMentionsTool(data)) {
    fail(`${slug}.md: video.title "${data.video.title}" must mention the tool brand "${data.name}"`);
  }
}

function getToolCategories(slugs: Set<string>): Map<string, string> {
  const map = new Map<string, string>();
  for (const slug of slugs) {
    try {
      const { data } = matter(readFileSync(join(TOOLS_DIR, `${slug}.md`), 'utf-8'));
      if (!data.primary_category) {
        fail(`${slug}.md: missing primary_category`);
      } else {
        map.set(slug, data.primary_category as string);
      }
      // Slug in frontmatter must match filename
      if (data.slug && data.slug !== slug) {
        fail(`${slug}.md: frontmatter slug "${data.slug}" doesn't match filename`);
      }
      validateToolVideo(slug, data);
    } catch (e) {
      fail(`Failed to parse ${slug}.md: ${e}`);
    }
  }
  return map;
}

function validateWorkflows(toolSlugs: Set<string>): void {
  if (!existsSync(WORKFLOWS_DIR)) {
    warn(`Workflows directory not found: ${WORKFLOWS_DIR}`);
    return;
  }

  let count = 0;
  for (const filename of readdirSync(WORKFLOWS_DIR).filter((f) => f.endsWith('.md'))) {
    count++;
    try {
      const { data } = matter(readFileSync(join(WORKFLOWS_DIR, filename), 'utf-8'));
      for (const slug of data.tools ?? []) {
        if (!toolSlugs.has(slug)) {
          fail(`${filename}: tools references missing tool "${slug}"`);
        }
      }
      for (const rec of data.tool_recommendations ?? []) {
        if (!rec.tool_slug) {
          fail(`${filename}: tool_recommendations entry for "${rec.tool_name ?? 'unknown'}" is missing tool_slug`);
        } else if (!toolSlugs.has(rec.tool_slug)) {
          fail(`${filename}: tool_recommendations references missing tool "${rec.tool_slug}"`);
        }
      }
    } catch (e) {
      fail(`Failed to parse ${filename}: ${e}`);
    }
  }
  pass(`workflows: ${count} files OK`);
}

// ── categories.csv ─────────────────────────────────────────────────────────

const CATEGORY_REQUIRED = ['slug', 'name_en', 'name_zh', 'icon', 'user_group',
                           'description_en', 'description_zh', 'sort_order', 'featured'] as const;
const VALID_USER_GROUPS = new Set(['creators', 'game_devs', 'voice_ai_builders', 'all']);

function validateCategories(toolCategories: Map<string, string>): Set<string> {
  const rows = parseCSV('categories.csv');
  if (rows.length === 0) return new Set();

  const cols = Object.keys(rows[0]);
  for (const col of CATEGORY_REQUIRED) {
    if (!cols.includes(col)) fail(`categories.csv: missing column "${col}"`);
  }

  const slugs = new Set<string>();
  rows.forEach((row, i) => {
    const r = i + 2;
    for (const col of CATEGORY_REQUIRED) {
      if (!row[col]?.trim()) fail(`categories.csv row ${r}: "${col}" is empty`);
    }
    if (row.user_group && !VALID_USER_GROUPS.has(row.user_group)) {
      fail(`categories.csv row ${r}: invalid user_group "${row.user_group}"`);
    }
    if (row.sort_order && Number.isNaN(Number(row.sort_order))) {
      fail(`categories.csv row ${r}: sort_order is not a number`);
    }
    if (row.featured && !['true', 'false'].includes(row.featured)) {
      fail(`categories.csv row ${r}: featured must be "true" or "false"`);
    }
    if (row.slug) slugs.add(row.slug);
  });

  // Cross-check: every tool's primary_category must exist in categories.csv
  let mismatches = 0;
  for (const [slug, cat] of toolCategories) {
    if (!slugs.has(cat)) {
      fail(`Tool "${slug}": primary_category "${cat}" not found in categories.csv`);
      mismatches++;
    }
  }
  if (mismatches === 0) pass('categories.csv covers all tool primary_categories');
  pass(`categories.csv: ${rows.length} rows OK`);

  return slugs;
}

// ── changelog.csv ──────────────────────────────────────────────────────────

const CHANGELOG_REQUIRED = ['date', 'tool_slug', 'change_type', 'description', 'source_url'] as const;
const VALID_CHANGE_TYPES  = new Set([
  'pricing_change', 'feature_added', 'product_change', 'model_release', 'policy_change',
]);
const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;
const TODAY   = new Date();
TODAY.setHours(23, 59, 59, 999);

function validateChangelog(toolSlugs: Set<string>): void {
  const rows = parseCSV('changelog.csv');
  if (rows.length === 0) {
    warn('changelog.csv has no entries yet');
    return;
  }

  const cols = Object.keys(rows[0]);
  for (const col of CHANGELOG_REQUIRED) {
    if (!cols.includes(col)) fail(`changelog.csv: missing column "${col}"`);
  }

  rows.forEach((row, i) => {
    const r = i + 2;
    for (const col of CHANGELOG_REQUIRED) {
      if (!row[col]?.trim()) fail(`changelog.csv row ${r}: "${col}" is empty`);
    }
    if (row.date) {
      if (!DATE_RE.test(row.date)) {
        fail(`changelog.csv row ${r}: date "${row.date}" must be YYYY-MM-DD`);
      } else {
        const d = new Date(row.date);
        if (Number.isNaN(d.getTime())) {
          fail(`changelog.csv row ${r}: date "${row.date}" is invalid`);
        } else if (d > TODAY) {
          fail(`changelog.csv row ${r}: date "${row.date}" is in the future`);
        }
      }
    }
    if (row.tool_slug && !toolSlugs.has(row.tool_slug)) {
      fail(`changelog.csv row ${r}: tool_slug "${row.tool_slug}" not found in src/content/tools/`);
    }
    if (row.change_type && !VALID_CHANGE_TYPES.has(row.change_type)) {
      fail(`changelog.csv row ${r}: invalid change_type "${row.change_type}"`);
    }
    if (row.description && row.description.length > 120) {
      warn(`changelog.csv row ${r}: description exceeds 120 chars (${row.description.length})`);
    }
  });

  pass(`changelog.csv: ${rows.length} rows OK`);
}

// ── Main ───────────────────────────────────────────────────────────────────

const toolSlugs     = getToolSlugs();
const toolCategories = getToolCategories(toolSlugs);

pass(`Found ${toolSlugs.size} tool(s): ${[...toolSlugs].sort().join(', ')}`);

validateCategories(toolCategories);
validateChangelog(toolSlugs);
validateWorkflows(toolSlugs);

console.log('');
if (errors > 0) {
  console.error(`❌  Validation failed: ${errors} error(s), ${warnings} warning(s)`);
  process.exit(1);
} else {
  console.log(`✅  All validations passed${warnings > 0 ? ` (${warnings} warning(s))` : ''}`);
}
