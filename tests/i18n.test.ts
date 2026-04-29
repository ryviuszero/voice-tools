import assert from 'node:assert/strict';
import { test } from './test-utils.ts';
import {
  alternatePath,
  formatCategory,
  formatPriceValue,
  langFromPath,
  localizedPath,
  localizedToolData,
  localizedWorkflowData,
  renderLocalizedMarkdown,
} from '../src/lib/i18n.ts';

test('language helpers detect and build localized paths', () => {
  assert.equal(langFromPath('/'), 'en');
  assert.equal(langFromPath('/tools/vapi'), 'en');
  assert.equal(langFromPath('/zh'), 'zh');
  assert.equal(langFromPath('/zh/tools/vapi'), 'zh');

  assert.equal(localizedPath('/tools/vapi', 'en'), '/tools/vapi');
  assert.equal(localizedPath('tools/vapi', 'en'), '/tools/vapi');
  assert.equal(localizedPath('/', 'zh'), '/zh');
  assert.equal(localizedPath('/tools/vapi', 'zh'), '/zh/tools/vapi');

  assert.equal(alternatePath('/zh/tools/vapi/', 'en'), '/tools/vapi');
  assert.equal(alternatePath('/tools/vapi/', 'zh'), '/zh/tools/vapi');
});

test('format helpers return localized labels and prices', () => {
  assert.equal(formatCategory('voice_agent_platform', 'en'), 'Voice Agent Platform');
  assert.equal(formatCategory('voice_agent_platform', 'zh'), 'Voice Agent 平台');
  assert.equal(formatCategory('unknown_category', 'en'), 'unknown category');

  assert.equal(formatPriceValue({ model: 'free', starting_paid_usd: 0, has_free_tier: true }, 'en'), 'Free');
  assert.equal(formatPriceValue({ model: 'open_source', starting_paid_usd: 0, has_free_tier: true }, 'zh'), '免费');
  assert.equal(formatPriceValue({ model: 'paid', starting_paid_usd: 12, has_free_tier: false }, 'en'), 'from $12/mo');
  assert.equal(formatPriceValue({ model: 'paid', starting_paid_usd: 12, has_free_tier: false }, 'zh'), '$12/月起');
  assert.equal(formatPriceValue({ model: 'freemium', starting_paid_usd: 0, has_free_tier: true }, 'zh'), '免费增值');
});

test('localized data helpers prefer Chinese overrides and fall back to English', () => {
  const tool = {
    name: 'Example Tool',
    tagline: 'English tagline',
    licensing: { notes: 'English licensing' },
    gotchas: ['English caveat'],
    portability: { notes: 'English portability' },
    i18n: {
      zh: {
        tagline: '中文标语',
        licensing_notes: '中文授权',
        gotchas: ['中文注意事项'],
        portability_notes: '中文迁移说明',
        body: '## 适合谁',
      },
    },
  };

  assert.deepEqual(localizedToolData(tool, 'en'), {
    name: 'Example Tool',
    tagline: 'English tagline',
    licensingNotes: 'English licensing',
    gotchas: ['English caveat'],
    portabilityNotes: 'English portability',
    body: undefined,
  });

  assert.deepEqual(localizedToolData(tool, 'zh'), {
    name: 'Example Tool',
    tagline: '中文标语',
    licensingNotes: '中文授权',
    gotchas: ['中文注意事项'],
    portabilityNotes: '中文迁移说明',
    body: '## 适合谁',
  });

  assert.deepEqual(localizedWorkflowData({
    title: 'Phone Agent',
    description: 'Build a phone agent',
    i18n: { zh: { title: '电话 Agent', description: '构建电话 Agent' } },
  }, 'zh'), {
    title: '电话 Agent',
    description: '构建电话 Agent',
    body: undefined,
  });
});

test('localized markdown renderer supports common blocks and escapes unsafe HTML', () => {
  const html = renderLocalizedMarkdown(`
## 标题

**重点** \`code\` [链接](/tools/vapi)

- 第一项
- <script>alert(1)</script>

1. 第一步
2. 第二步
`);

  assert.match(html, /<h2 id="标题">标题<\/h2>/);
  assert.match(html, /<strong>重点<\/strong>/);
  assert.match(html, /<code>code<\/code>/);
  assert.match(html, /<a href="\/tools\/vapi">链接<\/a>/);
  assert.match(html, /<ul><li>第一项<\/li><li>&lt;script&gt;alert\(1\)&lt;\/script&gt;<\/li><\/ul>/);
  assert.match(html, /<ol><li>第一步<\/li><li>第二步<\/li><\/ol>/);
});

test('localized markdown renderer blocks unsafe link protocols', () => {
  const html = renderLocalizedMarkdown(`
[safe](/tools/vapi)
[external](https://example.com?a=1&b=2)
[unsafe](javascript:alert)
`);

  assert.match(html, /<a href="\/tools\/vapi">safe<\/a>/);
  assert.match(html, /<a href="https:\/\/example\.com\?a=1&amp;b=2">external<\/a>/);
  assert.match(html, /<a href="#">unsafe<\/a>/);
  assert.doesNotMatch(html, /javascript:/);
});
