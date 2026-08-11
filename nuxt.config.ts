import { fileURLToPath } from 'node:url';

import tailwindcss from '@tailwindcss/vite';
import { defineNuxtConfig } from 'nuxt/config';

// @todo add to constants
const IS_TESTING_CYPRESS = process.env.CYPRESS === 'true';
const TUNNEL_HOST = process.env.TUNNEL_HOST_APP_URL;
const USE_TUNNEL = process.env.USE_TUNNEL === 'true';
export default defineNuxtConfig({
  app: {
    head: {
      htmlAttrs: {
        lang: 'en',
      },
    },
  },
  compatibilityDate: '2025-07-15',
  css: ['~/assets/styles/app.css', '@fortawesome/fontawesome-svg-core/styles.css'],
  modules: ['@pinia/nuxt', '@nuxtjs/html-validator', '@nuxt/hints'],
  runtimeConfig: {
    // customer/auth
    shopifyClientSecret: '',
    shopifyTokenUrl: '',
    shopifyClientId: '',
    shopifyAuthUrl: '',
    shopifyCustomerApiUrl: `https://shopify.com/${process.env.SHOPIFY_SHOP_ID}/account/customer/api/${process.env.SHOPIFY_API_VERSION}/graphql`,

    // storefront
    shopifyStorefrontApiUrl: `${process.env.SHOPIFY_BASE_STORE_URL}/api/${process.env.SHOPIFY_API_VERSION}/graphql.json`,
    shopifyStorefrontToken: '',
    public: {
      appUrl: '',
    },
  },
  devtools: { enabled: !IS_TESTING_CYPRESS },
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
      include: [
        '@fortawesome/fontawesome-svg-core',
        '@fortawesome/free-regular-svg-icons',
        '@fortawesome/free-solid-svg-icons',
        '@fortawesome/vue-fontawesome',
        '@pinia/nuxt',
        '@vee-validate/zod',
        '@vue/devtools-core',
        '@vue/devtools-kit',
        '@vueuse/components',
        '@vueuse/core',
        'clsx',
        'motion-v',
        'reka-ui',
        'tailwind-merge',
      ],
    },
    server: {
      allowedHosts:
        USE_TUNNEL && TUNNEL_HOST ? [TUNNEL_HOST] : ['localhost', '127.0.0.1'],
      hmr:
        USE_TUNNEL && TUNNEL_HOST
          ? { protocol: 'wss', host: TUNNEL_HOST, clientPort: 443 }
          : false,
    },
  },
  alias: {
    '@': fileURLToPath(new URL('./', import.meta.url)),
    '@components': fileURLToPath(new URL('./app/components', import.meta.url)),
    '@pages': fileURLToPath(new URL('./app/pages', import.meta.url)),
    '@store': fileURLToPath(new URL('./app/stores', import.meta.url)),
    '@utils': fileURLToPath(new URL('./utils', import.meta.url)),
  },
});
