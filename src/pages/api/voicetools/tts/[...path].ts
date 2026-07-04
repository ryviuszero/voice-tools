export const prerender = false;

const HOP_BY_HOP_HEADERS = new Set([
  'connection',
  'content-length',
  'host',
  'keep-alive',
  'proxy-authenticate',
  'proxy-authorization',
  'te',
  'trailer',
  'transfer-encoding',
  'upgrade',
]);

const BLOCKED_RESPONSE_HEADERS = new Set([
  'set-cookie',
  'set-cookie2',
]);

const FORWARDED_REQUEST_HEADERS = [
  'accept',
  'content-type',
  'range',
  'x-voicetools-client-id',
  'x-voicetools-fingerprint-id',
];

function runtimeEnv(locals?: unknown) {
  return (locals as { runtime?: { env?: Record<string, string | undefined> } } | undefined)?.runtime?.env;
}

function configuredBackendOrigin(locals?: unknown) {
  const env = runtimeEnv(locals);
  return env?.VOICETOOLS_API_ORIGIN?.trim() || '';
}

function configuredProxyToken(locals?: unknown) {
  const env = runtimeEnv(locals);
  return env?.VOICETOOLS_PROXY_TOKEN?.trim() || '';
}

function normalizedTtsPath(path = '') {
  const cleanPath = path.replace(/^\/+|\/+$/g, '');
  if (!cleanPath) return null;

  const parts = cleanPath.split('/');
  const [resource, audioId, ...extra] = parts;
  if (extra.length > 0) return null;
  if (parts.some((part) => !part || part === '.' || part === '..')) return null;

  if (resource === 'providers' || resource === 'voices' || resource === 'synthesize') {
    return parts.length === 1 ? resource : null;
  }

  if (resource === 'audio' && audioId && /^[A-Za-z0-9_-]+$/.test(audioId)) {
    return `audio/${audioId}`;
  }

  return null;
}

function isAllowedMethod(path: string, method: string) {
  if (path === 'synthesize') return method === 'POST';
  return method === 'GET';
}

function backendUrl(request: Request, normalizedPath: string, locals?: unknown) {
  const backendOrigin = configuredBackendOrigin(locals);
  if (!backendOrigin) return null;
  const requestUrl = new URL(request.url);
  const normalizedOrigin = backendOrigin.replace(/\/$/, '');
  return `${normalizedOrigin}/api/voicetools/tts/${normalizedPath}${requestUrl.search}`;
}

function forwardedHeaders(request: Request, locals?: unknown) {
  const headers = new Headers();
  for (const header of FORWARDED_REQUEST_HEADERS) {
    const value = request.headers.get(header);
    if (value) headers.set(header, value);
  }

  const proxyToken = configuredProxyToken(locals);
  if (proxyToken) headers.set('X-VoiceTools-Proxy-Token', proxyToken);

  return headers;
}

function responseHeaders(response: Response) {
  const headers = new Headers(response.headers);
  for (const header of HOP_BY_HOP_HEADERS) headers.delete(header);
  for (const header of BLOCKED_RESPONSE_HEADERS) headers.delete(header);
  return headers;
}

async function proxy(request: Request, path?: string, locals?: unknown) {
  const method = request.method.toUpperCase();
  const normalizedPath = normalizedTtsPath(path);
  if (!normalizedPath) {
    return Response.json(
      {
        status: 'error',
        message: 'VoiceTools TTS route is not supported.',
        request_id: '',
        error: { code: 'frontend_proxy_route_not_supported', detail: { reason: 'route_not_supported' } },
      },
      { status: 404 }
    );
  }

  if (!isAllowedMethod(normalizedPath, method)) {
    return Response.json(
      {
        status: 'error',
        message: 'VoiceTools TTS method is not allowed.',
        request_id: '',
        error: { code: 'frontend_proxy_method_not_allowed', detail: { reason: 'method_not_allowed' } },
      },
      { status: 405, headers: { Allow: normalizedPath === 'synthesize' ? 'POST' : 'GET' } }
    );
  }

  const url = backendUrl(request, normalizedPath, locals);
  if (!url) {
    return Response.json(
      {
        status: 'error',
        message: 'VoiceTools backend origin is not configured.',
        request_id: '',
        error: { code: 'frontend_proxy_not_configured', detail: { reason: 'provider_not_configured' } },
      },
      { status: 502 }
    );
  }

  const backendResponse = await fetch(url, {
    method,
    headers: forwardedHeaders(request, locals),
    body: method === 'GET' || method === 'HEAD' ? undefined : await request.arrayBuffer(),
  });

  return new Response(backendResponse.body, {
    status: backendResponse.status,
    statusText: backendResponse.statusText,
    headers: responseHeaders(backendResponse),
  });
}

export const GET = ({ request, params, locals }: { request: Request; params: { path?: string }; locals?: unknown }) =>
  proxy(request, params.path, locals);

export const POST = ({ request, params, locals }: { request: Request; params: { path?: string }; locals?: unknown }) =>
  proxy(request, params.path, locals);
