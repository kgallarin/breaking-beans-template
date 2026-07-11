import { fileURLToPath } from 'node:url';

import tailwindcss from '@tailwindcss/vite';
import { defineNuxtConfig } from 'nuxt/config';

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  css: ['~/assets/styles/app.css', '@fortawesome/fontawesome-svg-core/styles.css'],
  modules: ['@pinia/nuxt'],
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
      include: [
        '@vee-validate/zod',
        '@vue/devtools-core',
        '@vue/devtools-kit',
        '@vueuse/components',
        '@vue/devtools-kit',
        '@pinia/nuxt',
        'clsx',
        'tailwind-merge',
      ],
    },
    server: {
      allowedHosts: ['shopify-breaking-beans.loomberryliving.com'],
    },
  },
  alias: {
    '@': fileURLToPath(new URL('./app', import.meta.url)),
    '@components': fileURLToPath(new URL('./app/components', import.meta.url)),
    '@pages': fileURLToPath(new URL('./app/pages', import.meta.url)),
    '@store': fileURLToPath(new URL('./app/stores', import.meta.url)),
    '@utils': fileURLToPath(new URL('./utils', import.meta.url)),
  },
});
