import type { H3Event } from 'h3';

export default defineEventHandler(async (event: H3Event) => {
  const config = useRuntimeConfig(event);

  const { code, state, error: oauthError } = getQuery(event);

  if (oauthError) {
    throw createError({
      status: 400,
      message: `OAuth error: ${oauthError}`,
    });
  }

  // state from Shopify's query can be string | string[] — normalise it
  const stateStr = Array.isArray(state) ? state[0] : String(state ?? '');
  const codeVerifier = stateStr
    ? await useStorage().getItem<string>(`oauth:${stateStr}`)
    : null;

  if (!codeVerifier) {
    throw createError({
      status: 400,
      message: 'Invalid or expired OAuth state — please try logging in again',
    });
  }

  // Remove for security
  await useStorage().removeItem(`oauth:${stateStr}`);

  if (!code) {
    throw createError({
      status: 400,
      message: 'Missing authorization code',
    });
  }

  // for prod and no tunneling
  // const storedState = getCookie(event, 'shopify_oauth_state');
  // const codeVerifier = getCookie(event, 'shopify_code_verifier');
  //
  // if (!storedState || state !== storedState) {
  //   throw createError({
  //     status: 400,
  //     message:
  //       'Invalid state params - possible malicious CSRF attack or expired session',
  //   });
  // }
  //
  // if (!codeVerifier || !code) {
  //   throw createError({
  //     status: 400,
  //     message: 'Missing required params',
  //   });
  // }
  //
  // deleteCookie(event, 'shopify_oauth_state');
  // deleteCookie(event, 'shopify_code_verifier');

  // Exchange the authorization code for tokens (server-to-server)
  const redirectUri = `${config.public.appUrl}/api/auth/callback`;

  const tokens = await $fetch<{
    access_token: string;
    refresh_token: string;
    expires_in: number;
  }>(config.shopifyTokenUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'authorization_code',
      client_id: config.shopifyClientId,
      client_secret: config.shopifyClientSecret,
      redirect_uri: redirectUri,
      code: String(code),
      code_verifier: codeVerifier,
    }).toString(),
  });

  setCookie(event, 'shopify_access_token', tokens.access_token, {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    path: '/',
    maxAge: tokens.expires_in ?? 3600,
  });

  setCookie(event, 'shopify_refresh_token', tokens.refresh_token, {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 30, // 30d
  });

  return sendRedirect(event, '/account');
});
