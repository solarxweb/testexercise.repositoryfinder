import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  // Ignore patterns (e.g., build output)
  { ignores: ['dist', 'node_modules', '*.config.{js,ts}'] },

  // Main configuration for TypeScript and React files
  {
    // Apply this config to TS and TSX files only
    files: ['**/*.{ts,tsx}'],

    // Extend recommended configurations
    extends: [
      js.configs.recommended,           // Base JavaScript rules
      ...tseslint.configs.recommended,  // TypeScript recommended rules
    ],

    // Language options
    languageOptions: {
      ecmaVersion: 2020,                // Support ES2020 features
      sourceType: 'module',             // Enable ES modules
      globals: {
        ...globals.browser,             // Browser globals (e.g., window, document)
      },
      parser: tseslint.parser,          // Use TypeScript-ESLint parser
      parserOptions: {
        project: './tsconfig.json',     // Point to your TypeScript config for type checking
        tsconfigRootDir: import.meta.dirname, // Ensure correct path resolution (Node 20+)
      },
    },

    // Plugins for React
    plugins: {
      'js': js,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },

    // Custom rules
    rules: {
      // Spread recommended React Hooks rules
      ...reactHooks.configs.recommended.rules,

      // React Refresh rule with options
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],

      // Optional: Disable or tweak TypeScript rules if needed
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    },
  }
);