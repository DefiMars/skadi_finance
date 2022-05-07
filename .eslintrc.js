module.exports = {
  env: {
    node: true,
    jest: true,
    browser: true,
  },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 12,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
  },
  extends: [
  ],
  plugins: ["@typescript-eslint"],
  rules: {
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/ban-ts-comment": "off",
    "@typescript-eslint/ban-ts-ignore": "off",
  },
  ignorePatterns: ["build", "node_modules"],
  globals: {
    React: true,
    JSX: true,
  },
  overrides: [
    {
      files: ["**/*.js", "**/*.jsx"],
      rules: {
        "no-undef": "error",
      },
    },
  ],
};
