import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import Papa from 'papaparse';

// ── Types ──────────────────────────────────────────────────────────────────

export interface Category {
  slug:           string;
  name_en:        string;
  name_zh:        string;
  icon:           string;
  user_group:     'creators' | 'game_devs' | 'voice_ai_builders' | 'all';
  description_en: string;
  description_zh: string;
  sort_order:     number;
  featured:       boolean;
}

export type ChangeType =
  | 'pricing_change'
  | 'feature_added'
  | 'product_change'
  | 'model_release'
  | 'policy_change';

export interface ChangelogEntry {
  date:           string;
  tool_slug:      string;
  change_type:    ChangeType;
  description:    string;
  description_zh: string;
  source_url:     string;
}

// ── Internal ───────────────────────────────────────────────────────────────

function loadCSV<T extends Record<string, string>>(filename: string): T[] {
  const filePath = join(process.cwd(), 'data', filename);
  const content = readFileSync(filePath, 'utf-8').replace(/\r\n?/g, '\n');

  const result = Papa.parse<T>(content, {
    header: true,
    skipEmptyLines: true,
    // Keep everything as strings; callers coerce types explicitly
    dynamicTyping: false,
  });

  if (result.errors.length > 0) {
    const msgs = result.errors.map((e) => `row ${e.row}: ${e.message}`).join('; ');
    throw new Error(`CSV parse errors in ${filename}: ${msgs}`);
  }

  return result.data;
}

// ── Public API ─────────────────────────────────────────────────────────────

let _categories: Category[] | null = null;
let _changelog: ChangelogEntry[] | null = null;

export function loadCategories(): Category[] {
  if (_categories) return _categories;
  const rows = loadCSV<Record<string, string>>('categories.csv');
  _categories = rows
    .map((r) => ({
      slug:           r.slug,
      name_en:        r.name_en,
      name_zh:        r.name_zh,
      icon:           r.icon,
      user_group:     r.user_group as Category['user_group'],
      description_en: r.description_en,
      description_zh: r.description_zh,
      sort_order:     parseInt(r.sort_order, 10),
      featured:       r.featured?.toLowerCase() === 'true',
    }))
    .sort((a, b) => a.sort_order - b.sort_order);
  return _categories;
}

export function loadChangelog(): ChangelogEntry[] {
  if (_changelog) return _changelog;
  const rows = loadCSV<Record<string, string>>('changelog.csv');
  _changelog = rows
    .map((r) => ({
      date:           r.date,
      tool_slug:      r.tool_slug,
      change_type:    r.change_type as ChangeType,
      description:    r.description,
      description_zh: r.description_zh || r.description,
      source_url:     r.source_url,
    }))
    .sort((a, b) => b.date.localeCompare(a.date)); // newest first
  return _changelog;
}

export function changelogForTool(slug: string): ChangelogEntry[] {
  return loadChangelog().filter((e) => e.tool_slug === slug);
}

export function recentChangelog(n = 5): ChangelogEntry[] {
  return loadChangelog().slice(0, n);
}

export function changelogDescription(entry: ChangelogEntry, lang: 'en' | 'zh' = 'en'): string {
  return lang === 'zh' ? entry.description_zh || entry.description : entry.description;
}
