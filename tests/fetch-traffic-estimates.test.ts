import assert from 'node:assert/strict';
import { mkdtempSync, readFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { test } from './test-utils.ts';
import {
  mergeDomainCreatedEstimate,
  parseArgs,
  saveTool,
  shouldSaveTrafficEstimate,
  type TrafficEstimate,
  type ToolFile,
} from '../scripts/fetch-traffic-estimates.ts';

const sampleTool: ToolFile = {
  slug: 'sample',
  path: 'sample.md',
  content: 'Sample body',
  data: {
    name: 'Sample',
    website: 'https://example.com',
    verified_at: new Date('2026-01-01T00:00:00.000Z'),
  },
};

test('traffic parseArgs keeps dry-run as a no-write mode', () => {
  const options = parseArgs(['--slug=sample', '--dry-run']);

  assert.equal(options.slug, 'sample');
  assert.equal(options.dryRun, true);
  assert.equal(shouldSaveTrafficEstimate(options), false);
});

test('traffic saveTool preserves verified_at date formatting and markdown body', () => {
  const dir = mkdtempSync(join(tmpdir(), 'voice-tools-traffic-'));
  const path = join(dir, 'sample.md');
  try {
    const estimate: TrafficEstimate = {
      source: 'Similarweb public data endpoint',
      source_url: 'https://data.similarweb.com/api/v1/data?domain=example.com',
      captured_at: '2026-04-27',
      period_label: '2026-03',
      visits_last_month: 1200,
      monthly_visits: [],
    };

    saveTool({ ...sampleTool, path }, estimate);
    const output = readFileSync(path, 'utf-8');

    assert.match(output, /^verified_at: 2026-01-01$/m);
    assert.match(output, /^\s+captured_at: 2026-04-27$/m);
    assert.match(output, /Sample body/);
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test('traffic domain-created merge preserves existing estimate fields', () => {
  const merged = mergeDomainCreatedEstimate({
    source: 'Similarweb public data endpoint',
    source_url: 'https://data.similarweb.com/api/v1/data?domain=example.com',
    captured_at: new Date('2026-04-01T00:00:00.000Z') as unknown as string,
    period_label: '2026-03',
    visits_last_month: 1200,
    monthly_visits: [{ month: '2026-03', visits: 1200, is_partial: false }],
  }, {
    domain_created_at: '1995-08-14',
    domain_created_source_url: 'https://rdap.org/domain/example.com',
  }, '2026-04-27');

  assert.equal(merged.source, 'Similarweb public data endpoint');
  assert.equal(merged.visits_last_month, 1200);
  assert.equal(merged.captured_at, '2026-04-01');
  assert.equal(merged.domain_created_at, '1995-08-14');
  assert.equal(merged.domain_created_source_url, 'https://rdap.org/domain/example.com');
});
