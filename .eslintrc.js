module.exports = {
  env: {
    browser: true,
    es2022: true,
    'jest/globals': true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:n/recommended',
    'plugin:promise/recommended',
    'plugin:jest/recommended',
    'plugin:jest/style',
    // 'standard',
    'next',
    'next/core-web-vitals',

    // Make sure to put "prettier" last, so it gets the chance to override other configs
    'prettier',
  ],
  rules: {
    'no-console': ['warn', { allow: ['warn', 'error'] }],
    'no-unused-vars': ['warn', { varsIgnorePattern: '^_' }],
    'prefer-const': 'off',

    'n/no-missing-import': 'off',
    'n/no-unsupported-features/es-syntax': 'off',

    'promise/always-return': 'off',
  },
}
