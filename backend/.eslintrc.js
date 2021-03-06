module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'airbnb-base',
    'eslint:recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
    '@typescript-eslint',
  ],
  rules: {
    'no-console': 'off',
    'import/prefer-default-export': 'off',
    'import/extensions': 'off',
    'class-methods-use-this': 'off',
    'import/no-unresolved': 'off',
    'object-curly-newline': 'off',
    'no-plusplus': 'off',
    'arrow-body-style': 'off',
  },
};
