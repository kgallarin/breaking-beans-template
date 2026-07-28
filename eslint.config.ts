import eslintConfigPrettier from 'eslint-config-prettier';
import pluginConfigVue from 'eslint-plugin-vue';
import { defineConfig } from 'eslint/config';
import globals from 'globals';
import tsEslint from 'typescript-eslint';
import vueParser from 'vue-eslint-parser';

export default defineConfig([
  {
    ignores: [
      '.nuxt/**',
      '.output/**',
      'dist/**',
      'node_modules/**',
      'public/**',
      'vendor/**',
      'bootstrap/cache/**',
      'storage/**',
      '*.php',
      '*.json',
    ],
  },
  ...tsEslint.configs.recommended,
  ...pluginConfigVue.configs['flat/recommended'],
  {
    files: ['**/*.{js,mjs,cjs,ts,mts,cts,vue}'],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
      parser: vueParser,
      parserOptions: {
        parser: tsEslint.parser,
        extraFileExtensions: ['.vue'],
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
    rules: {
      'no-console': 'error',
      'no-undef': 'off',
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': 'error',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/no-floating-promises': 'off',
      '@typescript-eslint/no-empty-object-type': 'off',
      '@typescript-eslint/no-namespace': 'off',

      'vue/multi-word-component-names': 'off',
      'vue/attribute-hyphenation': 'warn',
      'vue/component-definition-name-casing': 'warn',
      'vue/html-self-closing': 'off',

      '@typescript-eslint/naming-convention': [
        'warn',
        {
          selector: 'objectLiteralProperty',
          format: ['camelCase', 'UPPER_CASE', 'snake_case', 'PascalCase'],
          filter: {
            regex: '^(vue/|@|.*-.*|[0-9].*)',
            match: false,
          },
        },
      ],
    },
  },
  eslintConfigPrettier,
]);
