module.exports = {
  env: {
    "node": true
  },
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: [
    '@typescript-eslint'
  ],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  "rules": {
    indent: ["error", 2],
    semi: ["error", "always"],
    "@typescript-eslint/no-unused-vars": "off",
  }
};