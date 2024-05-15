module.exports = {
  root: true,
  extends: [
    '@react-native',
    'airbnb',
    'airbnb/hooks',
    'prettier',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
    'plugin:@typescript-eslint/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  globals: {
    beforeAll: true,
    beforeEach: true,
    afterAll: true,
    afterEach: true,
    describe: true,
    expect: true,
    it: true,
    jest: true,
    localStorage: true,
    React: 'writable',
  },
  env: {
    jest: true,
    browser: true,
    es6: true,
  },
  rules: {
    'arrow-parens': ['error', 'always'],
    'no-use-before-define': 0,
    'import/prefer-default-export': 0,
    'global-require': 0,
    'react-hooks/rules-of-hooks': 'error', // Checks rules of Hooks
    'react-hooks/exhaustive-deps': 1, // Checks effect dependencies
    'react/no-unstable-nested-components': 0,
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
    'no-unused-vars': 0,
    'no-underscore-dangle': 0,
    camelcase: 'error',
    'jsx-quotes': ['error', 'prefer-single'],
    'no-console': 'error',
    'consistent-return': 0,
    quotes: [2, 'single', { avoidEscape: true }],
    'comma-dangle': ['error', 'only-multiline'],
    'react/jsx-filename-extension': [
      1,
      { extensions: ['.js', '.jsx', '.ts', '.tsx'] },
    ],
    'react/jsx-props-no-spreading': [0],
    'react/jsx-sort-props': 1,
    'react/prop-types': 0,
    'import/order': [
      'error',
      {
        groups: ['builtin', 'external', 'internal', 'parent', 'sibling'],
        pathGroups: [
          {
            pattern: 'react',
            group: 'external',
            position: 'before',
          },
        ],
        pathGroupsExcludedImportTypes: ['react'],
        'newlines-between': 'always',
        alphabetize: {
          order: 'asc',
          caseInsensitive: false,
        },
      },
    ],
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
    '@typescript-eslint/no-explicit-any': 0,
    '@typescript-eslint/explicit-function-return-type': 0,
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    'import/prefer-default-export ': 0,
    'react/require-default-props': 0,
    'react/no-unused-prop-types': 0,
    'react-native/no-inline-styles': 0,
    '@typescript-eslint/no-empty-function': 0,
    'react/function-component-definition': 0,
    '@typescript-eslint/ban-ts-comment': 0,
    // Note: you must disable the base rule as it can report incorrect errors
    'no-shadow': 'off',
    '@typescript-eslint/no-shadow': 'warn',
  },
  settings: {
    'import/resolver': {
      alias: {
        map: [
          ['@', './src'],
          ['@test', './test'],
        ],
        extensions: ['.ts', '.js', '.tsx', '.json', '.d.ts'],
      },
    },
  },
};
