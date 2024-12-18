import globals from "globals";
import pluginJs from "@eslint/js";
import eslintConfigPrettier from "eslint-config-prettier";
import eslintPluginPrettier from "eslint-plugin-prettier/recommended";
import react from "eslint-plugin-react";

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    languageOptions: {
      globals: { ...globals.browser, ...globals.node },
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      react,
    },
  },
  {
    files: ["**/*.jsx", "**/*.js"],
    rules: {
      "react/jsx-uses-vars": "error",
    },
  },

  pluginJs.configs.recommended,
  eslintPluginPrettier,
  eslintConfigPrettier,
];
