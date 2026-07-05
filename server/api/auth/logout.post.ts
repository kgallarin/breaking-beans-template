import type { H3Event } from 'h3';

export default defineEventHandler((event: H3Event) => {
  deleteCookie(event, 'shopify_access_token');
  deleteCookie(event, 'shopify_refresh_token');

  return {
    success: true,
  };
});
