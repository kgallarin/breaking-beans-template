import type { H3Event } from 'h3';
import { $fetch } from 'ofetch';

export function createStorefrontFetch(event: H3Event) {
  const config = useRuntimeConfig(event);

  return $fetch.create({
    baseURL: config.shopifyStorefrontApiUrl,
    timeout: 15_000,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      // static public storefront token and NOT Bearer Token
      'X-Shopify-Storefront-Access-Token': config.shopifyStorefrontToken,
    },

    // catch graphql errors
    onResponse({ response }) {
      const errors = response._data.errors;
      if (errors && errors.length > 0) {
        throw createError({
          statusCode: 400,
          statusMessage: errors[0].message || 'Storefront API Error',
          data: errors,
        });
      }
    },
  });
}
