import stylistic from '@stylistic/eslint-plugin'
import parserTs from '@typescript-eslint/parser'

export default [
  stylistic.configs.customize({
    indent: 2,
    quotes: 'single',
    semi: false,
  }),
  {
    languageOptions: { parser: parserTs },
  },
  {
    files: ['src/**/*.ts', 'test/**/*.test.ts'],
  },
]
