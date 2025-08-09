/** @type {import('eslint').Linter.Config[]} */
const config = [
  {
    ignores: [
      '.next/**',
      'out/**', 
      'node_modules/**',
      '.git/**'
    ],
  },
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    rules: {
      // Basic rules to catch common issues
      'no-unused-vars': 'warn',
      'no-console': 'warn',
      'prefer-const': 'warn',
    },
  },
];

module.exports = config;
