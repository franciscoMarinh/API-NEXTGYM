module.exports = {
  env: {
    es6: true,
    node: true
  },
  extends: [
    'standard',
    'prettier/@typescript-eslint',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended'
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly'
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module'
  },
  plugins: [
    '@typescript-eslint',
    'prettier'
  ],
  rules: {
    "@typescript-eslint/explicit-function-return-type": "off",
    '@typescript-eslint/member-delimiter-style': ['error', {
      "multiline": {
        "delimiter": "none",
        "requireLast": false
      },
      "singleline": {
        "delimiter": "comma",
        "requireLast": false
      }
    }]
  },
}
