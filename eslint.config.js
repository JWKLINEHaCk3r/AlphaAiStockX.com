/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    extends: ['next/core-web-vitals'],
    rules: {
      '@next/next/no-css-tags': 'off',
      'react/no-inline-styles': 'off',
      '@typescript-eslint/no-unused-vars': 'warn',
      '@typescript-eslint/no-explicit-any': 'warn',
      'react/no-unescaped-entities': 'off',
      '@next/next/no-html-link-for-pages': 'off',
    },
  },
]
