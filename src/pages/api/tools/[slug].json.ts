import type { APIRoute, GetStaticPaths } from 'astro';
import { getCollection } from 'astro:content';

export const prerender = true;

export const getStaticPaths: GetStaticPaths = async () => {
  const tools = await getCollection('tools');
  return tools.map((t) => ({ params: { slug: t.slug }, props: { tool: t } }));
};

export const GET: APIRoute = async ({ props }) => {
  const { tool } = props;
  const data = {
    slug:             tool.slug,
    name:             tool.data.name,
    tagline:          tool.data.tagline,
    website:          tool.data.website,
    logo:             tool.data.logo,
    primary_category: tool.data.primary_category,
    layers:           tool.data.layers,
    use_cases:        tool.data.use_cases,
    pricing:          tool.data.pricing,
    licensing:        tool.data.licensing,
    capabilities:     tool.data.capabilities,
    alternatives:     tool.data.alternatives,
    verified_at:      tool.data.verified_at.toISOString().slice(0, 10),
    badges:           tool.data.badges,
    gotchas:          tool.data.gotchas,
    language_quality: tool.data.language_quality,
    portability:      tool.data.portability,
    voice_agent_extras: tool.data.voice_agent_extras,
    i18n:             tool.data.i18n,
  };

  return new Response(JSON.stringify(data, null, 2), {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};
