import { type Config } from 'prettier';

const config: Config = {
  endOfLine: 'lf',
  printWidth: 85,
  singleQuote: true,
  vueIndentScriptAndStyle: true,
  importOrderParserPlugins: ['typescript', 'jsx', 'decorators-legacy'],
  plugins: ['@trivago/prettier-plugin-sort-imports', 'prettier-plugin-tailwindcss'],
  importOrder: [
    '<BUILTIN_MODULES>',
    '^vue$',
    '<THIRD_PARTY_MODULES>',
    '^@/Router',
    '^@/Store',
    '^config',
    '^@/Types',
    '^@/Composables',
    '^@/Components',
    '^@/Pages/(.*)$',
    '^\\.\\./(.*)$',
    '^[./]',
    '^@/images',
    '^.+\\.svg$',
    '^.+\\.scss$',
  ],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
  tailwindFunctions: ['tw', 'twMerge'],
};

export default config;
