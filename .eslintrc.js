module.exports = {
  parser: "@typescript-eslint/parser",
  extends: [
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
    "prettier",
    "plugin:storybook/recommended",
  ],
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: "module",
  },
  env: {
    es6: true,
    es2021: true,
    node: true,
  },
  rules: {
    "no-var": "error",
    semi: "error",
    //indent: ["error", 2, { SwitchCase: 1 }],
    "no-multi-spaces": "error",
    "space-in-parens": "error",
    "no-multiple-empty-lines": "error",
    "prefer-const": "error",
    "@typescript-eslint/no-unused-vars": [
      "error",
      {
        ignoreRestSiblings: true,
        argsIgnorePattern: "^_",
        varsIgnorePattern: "^_",
        caughtErrorsIgnorePattern: "^_",
      },
    ],
    "@typescript-eslint/no-empty-function": "off",
    "@typescript-eslint/no-empty-interface": "off",
    "unused-imports/no-unused-imports": "error",
    "unused-imports/no-unused-vars": [
      "warn",
      {
        vars: "all",
        varsIgnorePattern: "^_",
        args: "after-used",
        argsIgnorePattern: "^_",
      },
    ],
    "@typescript-eslint/ban-ts-comment": "off",
    "@typescript-eslint/no-explicit-any": "off",
  },
  plugins: ["unused-imports"],
};
