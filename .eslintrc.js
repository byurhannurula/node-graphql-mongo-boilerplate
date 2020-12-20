module.exports = {
  extends: ['airbnb-base', 'plugin:prettier/recommended'],
  parserOptions: {
    ecmaVersion: 11,
    sourceType: 'module',
  },
  env: {
    es6: true,
    node: true,
    es2020: true,
  },
  globals: {
    __dirname: true,
  },
  rules: {
    // GENERAL
    radix: 0,
    // 'no-undef': 0,
    'new-cap': 0,
    'no-alert': 0,
    'no-console': 0,
    'func-names': 0,
    'no-plusplus': 0,
    'comma-dangle': 0,
    // 'no-unused-vars': 0,
    'no-param-reassign': 0,
    'consistent-return': 0,
    'no-use-before-define': 0,
    'class-methods-use-this': 0,

    // IMPORT
    'import/extensions': 0,
    'import/no-unresolved': 0,
    'import/no-self-import': 0,
    'import/prefer-default-export': 0,
    'import/no-extraneous-dependencies': 0,

    // PRETTIER
    // 'prettier/prettier': [
    //   'error',
    //   {
    //     jsxBracketSameLine: false,
    //     trailingComma: 'all',
    //     singleQuote: true,
    //     printWidth: 80,
    //     semi: true,
    //     tabWidth: 2,
    //     useTabs: false,
    //   },
    // ],
  },
};
