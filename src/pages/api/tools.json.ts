import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

export const prerender = true;

export const GET: APIRoute = async () => {
  const tools = await getCollection('tools');
  const data  = tools.map((t) => ({
    slug:             t.slug,
    name:             t.data.name,
    tagline:          t.data.tagline,
    website:          t.data.website,
    logo:             t.data.logo,
    primary_category: t.data.primary_category,
    layers:           t.data.layers,
    use_cases:        t.data.use_cases,
    pricing:          t.data.pricing,
    licensing:        t.data.licensing,
    capabilities:     t.data.capabilities,
    alternatives:     t.data.alternatives,
    verified_at:      t.data.verified_at.toISOString().slice(0, 10),
    badges:           t.data.badges,
    gotchas:          t.data.gotchas,
    language_quality: t.data.language_quality,
    portability:      t.data.portability,
    voice_agent_extras: t.data.voice_agent_extras,
    i18n:             t.data.i18n,
  }));

  return new Response(JSON.stringify(data, null, 2), {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};
