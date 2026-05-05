import assert from 'node:assert/strict';
import { test } from './test-utils.ts';
import {
  buildReport,
  parseArgs,
} from '../scripts/verify-tools.ts';

const sampleTool = {
  slug: 'sample',
  name: 'Sample',
  website: 'https://example.com',
  path: 'src/content/tools/sample.md',
  logo: '/logos/sample.svg',
};

test('verify-tools parseArgs supports reports removal mode and non-failing CI', () => {
  const options = parseArgs(['--report=reports/link-check.md', '--remove-dead', '--exit-zero']);

  assert.match(options.reportPath ?? '', /reports[\\/]link-check\.md$/);
  assert.equal(options.removeDead, true);
  assert.equal(options.exitZero, true);
});

test('verify-tools report separates removal candidates from blocked and transient links', () => {
  const report = buildReport([
    {
      tool: sampleTool,
      result: { status: 'dead', httpStatus: 404, method: 'GET', note: 'HEAD returned 404; confirmed with GET' },
    },
    {
      tool: { ...sampleTool, slug: 'blocked', website: 'https://blocked.example.com' },
      result: { status: 'blocked', httpStatus: 403, method: 'GET' },
    },
    {
      tool: { ...sampleTool, slug: 'timeout', website: 'https://timeout.example.com' },
      result: { status: 'transient', error: 'fetch failed', method: 'GET' },
    },
  ], ['sample'], '2026-05-05T00:00:00.000Z');

  assert.match(report, /Removal candidates: 1/);
  assert.match(report, /Blocked by provider: 1/);
  assert.match(report, /Transient failures: 1/);
  assert.match(report, /Removed From This Branch/);
  assert.match(report, /sample: https:\/\/example\.com \[404\]/);
});
