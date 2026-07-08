import { createHash, randomBytes } from 'node:crypto';

import type { H3Event } from 'h3';

export default defineEventHandler(async (event: H3Event): Promise<void> => {
  const config = useRuntimeConfig(event);

  const codeVerifier = randomBytes(32).toString('base64url');

  const codeChallenge = createHash('sha256')
    .update(codeVerifier)
    .digest('base64url');

  const state = randomBytes(16).toString('hex');
  const redirectUri = `${config.public.appUrl}/api/auth/callback`;

  // fails on tunneling
  const cookieSetupOptions = {
    httpOnly: true,
    secure: true,
    sameSite: 'lax' as const, // for literal typing
    path: '/',
    maxAge: 600, // s = 10mins
  };

  setCookie(event, 'shopify_oauth_state', state, cookieSetupOptions);
  setCookie(event, 'shopify_code_verifier', codeVerifier, cookieSetupOptions);

  const params = new URLSearchParams({
    client_id: config.shopifyClientId,
    redirect_uri: redirectUri,
    response_type: 'code',
    scope: 'openid email customer-account-api:full',
    code_challenge: codeChallenge,
    code_challenge_method: 'S256',
    state, // csrf protection token — also serves as the storage key
  });

  return sendRedirect(event, `${config.shopifyAuthUrl}?${params.toString()}`);
});
