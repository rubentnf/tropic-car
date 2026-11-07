// @ts-check
import { defineConfig, globalIgnores } from 'eslint/config';
import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import astro from 'eslint-plugin-astro';
import prettier from 'eslint-config-prettier';
import globals from 'globals';

export default defineConfig(
  globalIgnores(['dist/', '.astro/', '.wrangler/', 'node_modules/']),

  js.configs.recommended,
  tseslint.configs.recommended,

  // Componentes .astro + reglas de accesibilidad adaptadas a Astro.
  astro.configs['flat/recommended'],
  astro.configs['flat/jsx-a11y-recommended'],

  {
    languageOptions: {
      globals: { ...globals.browser, ...globals.node },
    },
    rules: {
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
      '@typescript-eslint/consistent-type-imports': 'error',
    },
  },

  // Siempre al final: desactiva las reglas de formato que ya cubre Prettier.
  prettier,
);
