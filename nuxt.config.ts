import { fileURLToPath } from 'node:url';
import { defineNuxtConfig } from 'nuxt/config';

export default defineNuxtConfig({
    compatibilityDate: '2025-07-15',
    devtools: { enabled: true },
    components: [
        {
            path: '~/components',
            pathPrefix: false,
        }
    ],
    imports: {
      dirs: ['composables/**']
    },
    vite: {
        optimizeDeps: {
            include: [
                '@vue/devtools-core',
                '@vue/devtools-kit',
            ]
        }
    },
    alias: {
        '@': fileURLToPath(new URL('./app', import.meta.url)),
        '@components': fileURLToPath(new URL('./app/components', import.meta.url)),
        '@pages': fileURLToPath(new URL('./app/pages', import.meta.url)),
        '@utils': fileURLToPath(new URL('./utils', import.meta.url))
    }
});
