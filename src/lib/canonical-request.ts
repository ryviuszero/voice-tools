const CANONICAL_HOST = 'voice-tools.com';
const WWW_HOST = `www.${CANONICAL_HOST}`;

export function canonicalRedirectURL(request: Request): URL | undefined {
  const url = new URL(request.url);
  const hostname = url.hostname.toLowerCase();
  const isCanonicalHost = hostname === CANONICAL_HOST || hostname === WWW_HOST;
  const shouldUseHttps = isCanonicalHost && url.protocol === 'http:';
  const shouldUseApexHost = hostname === WWW_HOST;

  if (!shouldUseHttps && !shouldUseApexHost) return undefined;

  url.protocol = 'https:';
  if (shouldUseApexHost) url.hostname = CANONICAL_HOST;
  return url;
}
