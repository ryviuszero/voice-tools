import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { GITHUB_BASE_URL } from '../lib/site-config';

export const prerender = true;

export const GET: APIRoute = async () => {
  const tools = await getCollection('tools');
  const sorted = [...tools].sort((a, b) => a.data.name.localeCompare(b.data.name));

  const lines: string[] = [
    '# Voice Tools Directory',
    '# Curated voice AI tools for creators, game developers, and voice AI builders.',
    `# License: CC BY 4.0${GITHUB_BASE_URL ? `  |  Source: ${GITHUB_BASE_URL}` : ''}`,
    '# API: /api/tools.json',
    '',
    '## Tools',
    '',
  ];

  for (const tool of sorted) {
    const { data } = tool;
    const price = data.pricing.model === 'free' || data.pricing.model === 'open_source'
      ? 'free'
      : data.pricing.starting_paid_usd > 0
        ? `from $${data.pricing.starting_paid_usd}/mo`
        : data.pricing.model;

    lines.push(`### ${data.name}`);
    lines.push(`slug: ${tool.slug}`);
    lines.push(`url: ${data.website}`);
    lines.push(`category: ${data.primary_category}`);
    lines.push(`tagline: ${data.tagline}`);
    lines.push(`price: ${price}`);
    lines.push(`capabilities: ${[
      data.capabilities.voice_cloning    && 'voice_cloning',
      data.capabilities.multilingual     && 'multilingual',
      data.capabilities.chinese_support  && 'chinese_support',
      data.capabilities.realtime_capable && 'realtime',
      data.capabilities.open_source      && 'open_source',
    ].filter(Boolean).join(', ') || 'none'}`);
    lines.push(`licensing: commercial=${data.licensing.commercial_use}, youtube=${data.licensing.youtube_monetization}, game=${data.licensing.game_use}, cloning=${data.licensing.voice_cloning_allowed}`);
    lines.push(`verified: ${data.verified_at.toISOString().slice(0, 10)}`);
    lines.push('');
  }

  lines.push('## Categories');
  lines.push('tts, stt, voice_cloning, dubbing, sound_effects, voice_changer, audio_cleanup, voice_agent_platform, realtime_infrastructure, conversation_framework');
  lines.push('');
  lines.push('## User Groups');
  lines.push('creators (YouTubers, podcasters, audiobook authors), game_devs (NPC dialogue, localization), voice_ai_builders (agents, companions, phone bots)');

  return new Response(lines.join('\n'), {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=86400',
    },
  });
};
