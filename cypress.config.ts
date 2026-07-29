import { defineConfig } from 'cypress';
import viteTsConfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    // pointed to tests/e2e folder
    specPattern: 'tests/e2e/e2e/**/*.cy.ts',
    supportFile: 'tests/e2e/support/e2e.ts',
    fixturesFolder: 'tests/e2e/fixtures',
    viewportHeight: 720,
    viewportWidth: 1200,
    video: false,
    retries: {
      runMode: 2,
      openMode: 0,
    },
  },
  component: {
    devServer: {
      framework: 'vue',
      bundler: 'vite',
      viteConfig: {
        plugins: [viteTsConfigPaths()],
      },
    },
  },
});
