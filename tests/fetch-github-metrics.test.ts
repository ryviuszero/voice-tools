import assert from 'node:assert/strict';
import { test } from './test-utils.ts';
import {
  formatDatesForYaml,
  githubRepoFromUrl,
  parseArgs,
} from '../scripts/fetch-github-metrics.ts';

test('github metrics parseArgs supports slug, dry-run, and missing-only', () => {
  const options = parseArgs(['--slug', 'silero-vad', '--dry-run', '--missing-only']);

  assert.equal(options.slug, 'silero-vad');
  assert.equal(options.dryRun, true);
  assert.equal(options.missingOnly, true);
});

test('github metrics extracts owner and repo from GitHub URLs', () => {
  assert.equal(githubRepoFromUrl('https://github.com/snakers4/silero-vad'), 'snakers4/silero-vad');
  assert.equal(githubRepoFromUrl('https://github.com/snakers4/silero-vad.git'), 'snakers4/silero-vad');
  assert.equal(githubRepoFromUrl('https://example.com/snakers4/silero-vad'), undefined);
});

test('github metrics yaml formatter preserves date-only fields', () => {
  const markdown = [
    'captured_at: "2026-05-05"',
    'last_commit_at: 2026-04-01T00:00:00.000Z',
    'latest_release_at: !!timestamp 2026-03-01T00:00:00.000Z',
  ].join('\n');

  assert.equal(formatDatesForYaml(markdown), [
    'captured_at: 2026-05-05',
    'last_commit_at: 2026-04-01',
    'latest_release_at: 2026-03-01',
  ].join('\n'));
});
