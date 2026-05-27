import { defineMiddleware } from 'astro:middleware';
import { canonicalRedirectURL } from './lib/canonical-request';

export const onRequest = defineMiddleware((context, next) => {
  const redirectURL = canonicalRedirectURL(context.request);
  if (redirectURL) return Response.redirect(redirectURL, 308);

  return next();
});
