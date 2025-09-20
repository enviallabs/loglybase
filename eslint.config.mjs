// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'
import typescriptParser from '@typescript-eslint/parser'
import typescriptPlugin from '@typescript-eslint/eslint-plugin'
import prettierPlugin from 'eslint-plugin-prettier'

export default withNuxt([
  {
    files: ['**/*.ts'],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
    plugins: {
      '@typescript-eslint': /** @type {any} */ (typescriptPlugin),
      'prettier': prettierPlugin,
    },
    rules: {
      '@typescript-eslint/interface-name-prefix': 'off',
      '@typescript-eslint/explicit-function-return-type': 'warn',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      'semi': 'off',
      'prettier/prettier': ['error', { 
        semi: false, 
        endOfLine: 'auto',
        tabWidth: 2,
        singleQuote: true,
        trailingComma: 'all'
      }],
      'newline-before-return': 'error',
      'padding-line-between-statements': [
        'error',
        { blankLine: 'always', prev: ['const', 'let', 'var', 'if'], next: '*' },
        {
          blankLine: 'any',
          prev: ['const', 'let', 'var'],
          next: ['const', 'let', 'var'],
        },
      ],
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_.*',
          varsIgnorePattern: '^_.*',
          caughtErrorsIgnorePattern: '^_',
        },
      ],
    }
  }
]).override('nuxt/typescript/rules', {
  rules: {
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-unused-vars': [
      'warn',
      {
        argsIgnorePattern: '^_.*',
        varsIgnorePattern: '^_.*',
        caughtErrorsIgnorePattern: '^_',
      },
    ],
  }
})
