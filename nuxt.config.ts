import { fileURLToPath } from 'node:url';

import tailwindcss from '@tailwindcss/vite';
import { defineNuxtConfig } from 'nuxt/config';

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  css: ['~/assets/styles/app.css'],
  runtimeConfig: {
    shopifyClientSecret: '',
    shopifyTokenUrl: '',
    shopifyCustomerApiUrl: `https://shopify.com/${process.env.SHOPIFY_SHOP_ID}/account/customer/api/${process.env.SHOPIFY_API_VERSION}/graphql`,
    // storefront
    shopifyStorefrontApiUrl: `${process.env.SHOPIFY_BASE_STORE_URL}/api/${process.env.SHOPIFY_API_VERSION}/graphql.json`,
    shopifyStorefrontToken: '',
    public: {
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
    dirs: ['composables/**', 'server/**'],
  },
  vite: {
    plugins: [tailwindcss()],
    optimizeDeps: {
      include: [
        '@vee-validate/zod',
        '@vue/devtools-core',
        '@vue/devtools-kit',
        '@vueuse/components',
        '@vue/devtools-kit',
        'clsx',
        'tailwind-merge',
      ],
    },
  },
  alias: {
    '@': fileURLToPath(new URL('./app', import.meta.url)),
    '@components': fileURLToPath(new URL('./app/components', import.meta.url)),
    '@pages': fileURLToPath(new URL('./app/pages', import.meta.url)),
    '@utils': fileURLToPath(new URL('./utils', import.meta.url)),
  },
});
