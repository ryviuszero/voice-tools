import assert from 'node:assert/strict';
import { test } from './test-utils.ts';
import { canonicalRedirectURL } from '../src/lib/canonical-request.ts';

test('canonical request redirect upgrades http to https', () => {
  const redirectURL = canonicalRedirectURL(new Request('http://voice-tools.com/tools/krisp/'));

  assert.equal(redirectURL?.toString(), 'https://voice-tools.com/tools/krisp/');
});

test('canonical request redirect collapses www to apex host', () => {
  const redirectURL = canonicalRedirectURL(new Request('http://www.voice-tools.com/?ref=producthunt'));

  assert.equal(redirectURL?.toString(), 'https://voice-tools.com/?ref=producthunt');
});

test('canonical request redirect collapses https www to apex host', () => {
  const redirectURL = canonicalRedirectURL(new Request('https://www.voice-tools.com/tools/krisp/'));

  assert.equal(redirectURL?.toString(), 'https://voice-tools.com/tools/krisp/');
});

test('canonical request redirect leaves canonical urls alone', () => {
  const redirectURL = canonicalRedirectURL(new Request('https://voice-tools.com/tools/krisp/'));

  assert.equal(redirectURL, undefined);
});

test('canonical request redirect leaves local http urls alone', () => {
  const redirectURL = canonicalRedirectURL(new Request('http://localhost:4321/tools/krisp/'));

  assert.equal(redirectURL, undefined);
});
