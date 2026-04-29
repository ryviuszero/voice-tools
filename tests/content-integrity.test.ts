import assert from 'node:assert/strict';
import { test } from './test-utils.ts';
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { basename, join } from 'node:path';
import matter from 'gray-matter';

const root = process.cwd();
const toolsDir = join(root, 'src/content/tools');
const workflowsDir = join(root, 'src/content/workflows');
const publicDir = join(root, 'public');

function readMarkdownFrontmatter(dir: string) {
  return readdirSync(dir)
    .filter((filename) => filename.endsWith('.md'))
    .map((filename) => {
      const slug = basename(filename, '.md');
      const filePath = join(dir, filename);
      const parsed = matter(readFileSync(filePath, 'utf-8'));
      return { slug, filename, filePath, data: parsed.data, content: parsed.content };
    });
}

test('tool content has matching slugs, local logos, and Chinese metadata', () => {
  const tools = readMarkdownFrontmatter(toolsDir);

  assert.ok(tools.length >= 1);
  for (const tool of tools) {
    assert.equal(tool.data.slug, tool.slug, `${tool.filename} frontmatter slug should match filename`);
    assert.equal(typeof tool.data.name, 'string', `${tool.filename} needs a name`);
    assert.equal(typeof tool.data.tagline, 'string', `${tool.filename} needs a tagline`);

    assert.match(tool.data.logo, /^\/logos\/.+/, `${tool.filename} should use a local logo path`);
    assert.ok(existsSync(join(publicDir, tool.data.logo)), `${tool.filename} logo file should exist`);

    assert.ok(tool.data.i18n?.zh?.tagline, `${tool.filename} should include a Chinese tagline`);
    assert.ok(tool.data.i18n?.zh?.body, `${tool.filename} should include a Chinese body`);
    assert.doesNotMatch(tool.data.i18n.zh.body, /Who It Is For|Who this is for/, `${tool.filename} zh body should not leak English headings`);
  }
});

test('workflow tool references and recommendation targets point to existing tools', () => {
  const toolSlugs = new Set(readMarkdownFrontmatter(toolsDir).map((tool) => tool.slug));
  const workflows = readMarkdownFrontmatter(workflowsDir);
  const currentRecommendationTiers = ['production_default', 'fast_rising', 'open_or_self_hosted'];

  assert.ok(workflows.length >= 1);
  for (const workflow of workflows) {
    for (const slug of workflow.data.tools ?? []) {
      assert.ok(toolSlugs.has(slug), `${workflow.filename} tools references missing tool "${slug}"`);
    }

    for (const rec of workflow.data.tool_recommendations ?? []) {
      assert.ok(toolSlugs.has(rec.tool_slug), `${workflow.filename} recommends missing tool "${rec.tool_slug}"`);
      assert.match(rec.url, /^https?:\/\//, `${workflow.filename} recommendation URL should be absolute`);
      assert.ok(rec.i18n?.zh?.summary, `${workflow.filename} recommendation "${rec.tool_slug}" should include zh summary`);
    }

    const tierCounts = new Map<string, number>();
    for (const rec of workflow.data.tool_recommendations ?? []) {
      tierCounts.set(rec.tier, (tierCounts.get(rec.tier) ?? 0) + 1);
    }

    assert.deepEqual(
      [...tierCounts.keys()].sort(),
      [...currentRecommendationTiers].sort(),
      `${workflow.filename} should only use the three current recommendation tiers`
    );
    for (const tier of currentRecommendationTiers) {
      const count = tierCounts.get(tier) ?? 0;
      assert.ok(count >= 2, `${workflow.filename} should include at least two ${tier} recommendations`);
      assert.ok(count <= 3, `${workflow.filename} should include no more than three ${tier} recommendations`);
    }

    assert.equal(workflow.data.video?.provider, 'youtube', `${workflow.filename} should include an embedded YouTube video`);
    assert.match(
      workflow.data.video?.url ?? '',
      /^https?:\/\/(www\.)?(youtube\.com|youtu\.be)\//,
      `${workflow.filename} video URL should be a YouTube URL`
    );
    assert.ok(workflow.data.video?.i18n?.zh?.title, `${workflow.filename} video should include a Chinese title`);
  }
});

test('Voice AI workflows include source information and Chinese localized copy', () => {
  const workflows = readMarkdownFrontmatter(workflowsDir)
    .filter((workflow) => workflow.data.user_group === 'voice_ai_builders');

  assert.ok(workflows.length >= 1);
  for (const workflow of workflows) {
    assert.ok((workflow.data.sources ?? []).length >= 1, `${workflow.filename} should include sources`);
    assert.ok(workflow.data.i18n?.zh?.title, `${workflow.filename} should include zh title`);
    assert.ok(workflow.data.i18n?.zh?.description, `${workflow.filename} should include zh description`);
    assert.ok(workflow.data.i18n?.zh?.body, `${workflow.filename} should include zh body`);

    for (const source of workflow.data.sources) {
      assert.match(source.url, /^https?:\/\//, `${workflow.filename} source URL should be absolute`);
      assert.ok(source.i18n?.zh?.title, `${workflow.filename} source should include zh title`);
    }
  }
});
