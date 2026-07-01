import { fileURLToPath } from 'node:url';

import tailwindcss from '@tailwindcss/vite';
import { defineNuxtConfig } from 'nuxt/config';

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  css: ['~/assets/styles/app.css'],
  runtimeConfig: {
    shopifyClientSecret: process.env.SHOPIFY_CLIENT_SECRET,
    shopifyTokenUrl: process.env.SHOPIFY_TOKEN_URL,
    shopifyCustomerApiUrl: `https://shopify.com/${process.env.SHOPIFY_SHOP_ID}/account/customer/api/${process.env.SHOPIFY_API_VERSION}/graphql`,
    // storefront
    public: {
      storeFrontToken: process.env.SHOPIFY_STOREFRONT_TOKEN,
      storefrontApiUrl: `${process.env.SHOPIFY_BASE_STORE_URL}/api/${process.env.SHOPIFY_API_VERSION}/graphql`,

      appUrl: 'http://localhost:3000',
    },
  },
  devtools: { enabled: true },
  components: [
    {
      path: '~/components',
      pathPrefix: false,
    },
  ],
  imports: {
    dirs: ['composables/**'],
  },
  vite: {
    plugins: [tailwindcss()],
    optimizeDeps: {
      include: ['@vue/devtools-core', '@vue/devtools-kit'],
    },
  },
  alias: {
    '@': fileURLToPath(new URL('./app', import.meta.url)),
    '@components': fileURLToPath(new URL('./app/components', import.meta.url)),
    '@pages': fileURLToPath(new URL('./app/pages', import.meta.url)),
    '@utils': fileURLToPath(new URL('./utils', import.meta.url)),
  },
});
