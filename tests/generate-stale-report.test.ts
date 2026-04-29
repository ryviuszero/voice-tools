import assert from 'node:assert/strict';
import { test } from './test-utils.ts';
import {
  buildStaleReport,
  buildToolMaintenanceState,
  parseArgs,
} from '../scripts/generate-stale-report.ts';

test('stale-report parseArgs supports custom report path and threshold', () => {
  const options = parseArgs(['--report=reports/custom.md', '--stale-days', '30']);

  assert.match(options.reportPath, /reports[\\/]custom\.md$/);
  assert.equal(options.staleDays, 30);
});

test('stale-report flags old and incomplete tool metadata', () => {
  const state = buildToolMaintenanceState({
    slug: 'sample',
    now: new Date('2026-04-29T00:00:00.000Z'),
    staleDays: 30,
    data: {
      name: 'Sample',
      website: 'https://example.com',
      verified_at: '2026-01-01',
      primary_category: 'tts',
      capabilities: { open_source: false },
    },
  });

  assert.equal(state.ageDays, 118);
  assert.ok(state.issues.includes('verified_at older than 30 days'));
  assert.ok(state.issues.includes('commercial/hosted tool missing traffic_estimates'));
  assert.ok(state.issues.includes('missing demo video'));
});

test('stale-report summarizes review queue as markdown', () => {
  const report = buildStaleReport([
    buildToolMaintenanceState({
      slug: 'sample',
      now: new Date('2026-04-29T00:00:00.000Z'),
      staleDays: 90,
      data: {
        name: 'Sample',
        website: 'https://example.com',
        verified_at: '2026-01-01',
        primary_category: 'tts',
        capabilities: { open_source: true },
      },
    }),
  ], { staleDays: 90 }, '2026-04-29');

  assert.match(report, /Stale Tools Report/);
  assert.match(report, /Tools needing review: 1/);
  assert.match(report, /open-source tool missing github_metrics/);
  assert.match(report, /\[Sample\]\(..\/src\/content\/tools\/sample\.md\)/);
});
