import assert from 'node:assert/strict';
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { test } from './test-utils.ts';
import {
  appendChangelogRows,
  applyDraftToData,
  buildAiPrompt,
  buildMarkdownReport,
  canApplyDraft,
  changelogRowsToAppend,
  computeChangedFields,
  extractAiResponseText,
  formatVerifiedAtForYaml,
  generateRuleDraft,
  loadContentGuidelines,
  parseDotenv,
  parseArgs,
  previewText,
  resolveAiProvider,
  saveTool,
  uniqueSourceUrls,
  type ChangelogRow,
} from '../scripts/update-tool-data.ts';

const sampleTool = {
  slug: 'sample',
  path: 'sample.md',
  raw: '',
  content: 'Sample body',
  data: {
    name: 'Sample',
    slug: 'sample',
    tagline: 'Old tagline',
    website: 'https://example.com',
    pricing: {
      model: 'paid',
      has_free_tier: false,
      starting_paid_usd: 20,
      pricing_url: 'https://example.com/pricing',
    },
    licensing: { notes: 'Old notes' },
    capabilities: { open_source: false },
    verified_at: new Date('2026-01-01'),
  },
};

test('update-data parseArgs supports report-only defaults and slug filtering', () => {
  const options = parseArgs(['--slug', 'suno', '--max-pages=2', '--report', 'reports/custom.md']);

  assert.equal(options.slug, 'suno');
  assert.equal(options.maxPages, 2);
  assert.equal(options.write, false);
  assert.match(options.reportPath, /reports[\\/]custom\.md$/);
});

test('update-data rule draft runs without OpenAI environment variables', () => {
  const draft = generateRuleDraft(sampleTool, [
    {
      url: 'https://example.com/pricing',
      kind: 'pricing',
      ok: true,
      status: 200,
      text: 'Free plan available. Pro starts at $8 per month. Commercial use is included on paid plans. API access available.',
      needs_manual_review: false,
    },
  ], '2026-04-27');

  assert.equal(draft.engine, 'rules');
  assert.equal(draft.verified_at, '2026-04-27');
  assert.equal(draft.pricing?.has_free_tier, true);
  assert.equal(draft.pricing?.starting_paid_usd, 8);
  assert.equal(draft.pricing?.model, 'freemium');
  assert.equal(draft.capabilities?.batch_api, true);
  assert.equal(draft.changelog?.tool_slug, 'sample');
});

test('update-data changelog append de-duplicates by date tool source and type', () => {
  const existing: ChangelogRow[] = [{
    date: '2026-04-27',
    tool_slug: 'sample',
    change_type: 'pricing_change',
    description: 'Existing',
    description_zh: '已有',
    source_url: 'https://example.com/pricing',
  }];
  const incoming: ChangelogRow[] = [
    { ...existing[0], description: 'Duplicate with different text' },
    {
      date: '2026-04-27',
      tool_slug: 'sample',
      change_type: 'product_change',
      description: 'New',
      description_zh: '新增',
      source_url: 'https://example.com/pricing',
    },
  ];

  const result = appendChangelogRows(existing, incoming);

  assert.equal(result.added.length, 1);
  assert.equal(result.rows.length, 2);
  assert.equal(result.added[0].change_type, 'product_change');
});

test('update-data report includes tool source and manual-review state', () => {
  const report = buildMarkdownReport([
    {
      tool: sampleTool,
      sources: [{
        url: 'https://example.com/pricing',
        kind: 'pricing',
        ok: false,
        status: 429,
        error: 'HTTP 429',
        needs_manual_review: true,
      }],
      draft: {
        verified_at: '2026-04-27',
        confidence: 'low',
        needs_manual_review: true,
        notes: ['Rate limited'],
        engine: 'rules',
        changelog: {
          date: '2026-04-27',
          tool_slug: 'sample',
          change_type: 'product_change',
          description: 'Sample reviewed',
          description_zh: 'Sample 已复核',
          source_url: 'https://example.com/pricing',
        },
      },
      changedFields: ['verified_at'],
      errors: ['HTTP 429'],
      ai: {
        requested: true,
        provider: 'openrouter',
        model: 'anthropic/claude-sonnet-4.5',
        endpoint: 'https://openrouter.ai/api/v1/chat/completions',
        status: 429,
        ok: false,
        error: 'rate limited',
        fallback_to_rules: true,
      },
    },
  ], {
    write: false,
    reportPath: 'reports/data-update-latest.md',
    maxPages: 3,
  }, '2026-04-27');

  assert.match(report, /Tool Data Update Report/);
  assert.match(report, /Sample \(sample\)/);
  assert.match(report, /Needs manual review: yes/);
  assert.match(report, /"provider": "openrouter"/);
  assert.match(report, /"status": 429/);
  assert.match(report, /https:\/\/example\.com\/pricing/);
});

test('update-data formats verified_at as an unquoted YAML date', () => {
  assert.match(formatVerifiedAtForYaml("verified_at: '2026-04-27'\n"), /^verified_at: 2026-04-27$/m);
  assert.match(formatVerifiedAtForYaml('verified_at: 2026-04-27T00:00:00.000Z\n'), /^verified_at: 2026-04-27$/m);
});

test('update-data rule drafts do not write verified_at or editorial fields', () => {
  const next = applyDraftToData(sampleTool.data, {
    verified_at: '2026-04-27',
    confidence: 'medium',
    needs_manual_review: false,
    notes: [],
    engine: 'rules',
    licensing: { notes: 'Generic rule-generated notes' },
    gotchas: ['Generic gotcha'],
  });

  assert.equal(next.licensing.notes, 'Old notes');
  assert.deepEqual(next.gotchas, undefined);
  assert.equal(next.verified_at.toISOString().slice(0, 10), '2026-01-01');
});

test('update-data refuses writes when sources failed or need review', () => {
  const draft = {
    verified_at: '2026-04-27',
    confidence: 'high' as const,
    needs_manual_review: false,
    notes: [],
    engine: 'openai' as const,
    tagline: 'New tagline',
  };
  const sources = [{
    url: 'https://example.com/pricing',
    kind: 'pricing' as const,
    ok: false,
    status: 429,
    error: 'HTTP 429',
    needs_manual_review: true,
  }];

  assert.equal(canApplyDraft(draft, sources), false);
  assert.deepEqual(computeChangedFields(sampleTool, draft, sources), []);
});

test('update-data high-confidence AI drafts can update fields and verified_at', () => {
  const draft = {
    verified_at: '2026-04-27',
    confidence: 'high' as const,
    needs_manual_review: false,
    notes: [],
    engine: 'openai' as const,
    tagline: 'Fresh tagline',
    pricing: { starting_paid_usd: 8 },
  };
  const sources = [{
    url: 'https://example.com/pricing',
    kind: 'pricing' as const,
    ok: true,
    status: 200,
    text: 'Pricing starts at $8.',
    needs_manual_review: false,
  }];

  const next = applyDraftToData(sampleTool.data, draft, sources);

  assert.equal(next.tagline, 'Fresh tagline');
  assert.equal(next.pricing.starting_paid_usd, 8);
  assert.equal(next.verified_at.toISOString().slice(0, 10), '2026-04-27');
});

test('update-data low-confidence AI body drafts do not replace markdown body', () => {
  const dir = mkdtempSync(join(tmpdir(), 'voice-tools-update-'));
  const path = join(dir, 'sample.md');
  try {
    writeFileSync(path, sampleTool.raw, 'utf-8');
    saveTool({ ...sampleTool, path }, {
      verified_at: '2026-04-27',
      confidence: 'low',
      needs_manual_review: false,
      notes: [],
      engine: 'openai',
      body: 'Unsafe replacement body',
    }, []);

    assert.match(readFileSync(path, 'utf-8'), /Sample body/);
    assert.doesNotMatch(readFileSync(path, 'utf-8'), /Unsafe replacement body/);
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test('update-data appends changelog only for safe substantive changes', () => {
  const safeDraft = {
    verified_at: '2026-04-27',
    confidence: 'high' as const,
    needs_manual_review: false,
    notes: [],
    engine: 'openai' as const,
    tagline: 'Fresh tagline',
    changelog: {
      date: '2026-04-27',
      tool_slug: 'sample',
      change_type: 'product_change' as const,
      description: 'Sample changed',
      description_zh: 'Sample 已变化',
      source_url: 'https://example.com/changelog',
    },
  };
  const safeSources = [{
    url: 'https://example.com/changelog',
    kind: 'changelog' as const,
    ok: true,
    status: 200,
    text: 'New feature.',
    needs_manual_review: false,
  }];
  const rows = changelogRowsToAppend([
    {
      tool: sampleTool,
      sources: safeSources,
      draft: safeDraft,
      changedFields: ['verified_at'],
      errors: [],
      ai: { requested: true, fallback_to_rules: false },
    },
    {
      tool: sampleTool,
      sources: safeSources,
      draft: safeDraft,
      changedFields: ['verified_at', 'tagline'],
      errors: [],
      ai: { requested: true, fallback_to_rules: false },
    },
    {
      tool: sampleTool,
      sources: safeSources,
      draft: { ...safeDraft, engine: 'rules' },
      changedFields: ['tagline'],
      errors: [],
      ai: { requested: false, fallback_to_rules: false },
    },
  ]);

  assert.equal(rows.length, 1);
  assert.equal(rows[0].description, 'Sample changed');
});

test('update-data uses latest changelog sources before older history', () => {
  const sources = uniqueSourceUrls(sampleTool, [
    {
      date: '2026-01-01',
      tool_slug: 'sample',
      change_type: 'product_change',
      description: 'Old',
      description_zh: '旧',
      source_url: 'https://example.com/old',
    },
    {
      date: '2026-04-01',
      tool_slug: 'sample',
      change_type: 'feature_added',
      description: 'New',
      description_zh: '新',
      source_url: 'https://example.com/new',
    },
  ], 3);

  assert.deepEqual(sources.map((source) => source.url), [
    'https://example.com/',
    'https://example.com/pricing',
    'https://example.com/new',
  ]);
});

test('update-data parses .env style OpenAI settings', () => {
  const values = parseDotenv(`
    # comment
    OPENAI_API_KEY="sk-test"
    export OPENAI_MODEL=gpt-4.1-mini # inline comment
    EMPTY=
  `);

  assert.equal(values.OPENAI_API_KEY, 'sk-test');
  assert.equal(values.OPENAI_MODEL, 'gpt-4.1-mini');
  assert.equal(values.EMPTY, '');
});

test('update-data resolves OpenRouter provider from environment', () => {
  assert.deepEqual(resolveAiProvider({
    OPENROUTER_API_KEY: 'or-key',
    OPENROUTER_MODEL: 'anthropic/claude-sonnet-4.5',
  }), {
    engine: 'openrouter',
    apiKey: 'or-key',
    model: 'anthropic/claude-sonnet-4.5',
  });

  assert.equal(resolveAiProvider({ OPENROUTER_API_KEY: 'or-key' }), null);
});

test('update-data extracts text from OpenRouter chat completion responses', () => {
  const text = extractAiResponseText({
    choices: [{ message: { content: '{"confidence":"high"}' } }],
  });

  assert.equal(text, '{"confidence":"high"}');
});

test('update-data AI prompt includes tool and workflow generation guidelines', () => {
  const guidelines = loadContentGuidelines();
  const prompt = buildAiPrompt(sampleTool, [{
    url: 'https://example.com/pricing',
    kind: 'pricing',
    ok: true,
    status: 200,
    title: 'Pricing',
    text: 'Pro starts at $8 per month. Commercial use is allowed on paid plans.',
    needs_manual_review: false,
  }], '2026-04-27', guidelines);

  assert.deepEqual(prompt.loadedGuidelines.sort(), ['tool', 'workflow']);
  assert.match(prompt.instructions, /Follow docs\/new-tool\.md/);
  assert.match(prompt.instructions, /docs\/new-workflow\.md/);
  assert.match(prompt.input, /Quality Model/);
  assert.match(prompt.input, /Sample body/);
});

test('update-data previews AI response text without dumping full output', () => {
  const preview = previewText('hello\n'.repeat(100), 20);

  assert.ok(preview.length < 30);
  assert.ok(preview.endsWith('...'));
  assert.doesNotMatch(preview, /\n/);
});
