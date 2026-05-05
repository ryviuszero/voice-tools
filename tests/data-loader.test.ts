import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from './test-utils.ts';
import {
  changelogDescription,
  changelogForTool,
  loadCategories,
  loadChangelog,
  recentChangelog,
} from '../src/lib/data-loader.ts';

test('loadCategories parses typed category rows sorted by sort_order', () => {
  const categories = loadCategories();

  assert.ok(categories.length >= 11);
  assert.deepEqual(
    categories.map((category) => category.sort_order),
    [...categories].map((category) => category.sort_order).sort((a, b) => a - b),
  );

  const voiceAgent = categories.find((category) => category.slug === 'voice_agent_platform');
  assert.ok(voiceAgent);
  assert.equal(voiceAgent.name_en, 'Voice Agent Platform');
  assert.equal(voiceAgent.name_zh, 'Voice Agent 平台');
  assert.equal(voiceAgent.user_group, 'voice_ai_builders');
  assert.equal(typeof voiceAgent.featured, 'boolean');
});

test('loadChangelog parses localized descriptions and newest entries first', () => {
  const raw = readFileSync('data/changelog.csv', 'utf-8');
  assert.doesNotMatch(raw, /\r/);

  const changelog = loadChangelog();

  assert.ok(changelog.length >= 1);
  assert.deepEqual(
    changelog.map((entry) => entry.date),
    [...changelog].map((entry) => entry.date).sort((a, b) => b.localeCompare(a)),
  );

  const vapiEntries = changelogForTool('vapi');
  assert.ok(vapiEntries.length >= 1);
  assert.ok(vapiEntries.every((entry) => entry.tool_slug === 'vapi'));

  const entry = {
    date: '2026-04-26',
    tool_slug: 'example',
    change_type: 'feature_added' as const,
    description: 'English text',
    description_zh: '',
    source_url: 'https://example.com',
  };
  assert.equal(changelogDescription(entry, 'en'), 'English text');
  assert.equal(changelogDescription(entry, 'zh'), 'English text');
});

test('recentChangelog returns the requested number of newest entries', () => {
  const entries = recentChangelog(3);

  assert.equal(entries.length, 3);
  assert.deepEqual(entries, loadChangelog().slice(0, 3));
});
