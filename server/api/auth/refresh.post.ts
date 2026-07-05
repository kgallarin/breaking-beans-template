import type { H3Event } from 'h3';

export default defineEventHandler(async (event: H3Event) => {
  const config = useRuntimeConfig();

  const refreshToken = getCookie(event, 'shopify_refresh_token');

  if (!refreshToken) {
    throw createError({
      status: 401,
      message: 'Session expired - please login again',
    });
  }

  const tokens = await $fetch<{
    access_token: string;
    refresh_token?: string;
    expires_in: number;
  }>(config.shopifyTokenUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      client_id: config.shopifyClientId,
      client_secret: config.shopifyClientSecret,
      refresh_token: refreshToken,
    }).toString(),
  });

  // set new access_token
  setCookie(event, 'shopify_access_token', tokens.access_token, {
    httpOnly: true,
    sameSite: 'lax',
    path: '/',
    maxAge: 3600, // 1hr @todo: put in const
  });

  if (tokens.refresh_token) {
    setCookie(event, 'shopify_refresh_token', tokens.refresh_token, {
      httpOnly: true,
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 30, // @todo: put in const
    });
  }

  return { success: true };
});
