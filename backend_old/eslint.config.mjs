import { defineConfig } from "eslint/config";
import eslintPluginPrettier from "eslint-plugin-prettier";
import js from "@eslint/js";
import globals from "globals";

export default defineConfig([
  {
    plugins: {
      prettier: eslintPluginPrettier,
      js
    },
    extends: ["js/recommended"],

    languageOptions: {
      globals: {
        ...globals.node,
        describe: "readonly",
        before: "readonly",
        after: "readonly",
        beforeEach: "readonly",
        afterEach: "readonly",
        it: "readonly",
        assert: "readonly",
        beforeAll: "readonly",
        afterAll: "readonly",
        jest: "readonly",
        expect: "readonly",
        test: "readonly"
      }
    },
    rules: {
      camelcase: ["warn", { properties: "never", ignoreDestructuring: true }],
      "no-useless-catch": "off",
      "linebreak-style": ["error", "unix"],
      "object-shorthand": "off",
      "padding-line-between-statements": [
        "error",
        { blankLine: "always", prev: "const", next: "block-like" },
        { blankLine: "always", prev: "let", next: "block-like" },
        { blankLine: "always", prev: ["const", "let", "var"], next: "*" },
        { blankLine: "any", prev: ["const", "let", "var"], next: ["const", "let", "var"] }
      ]
    }
  }
]);
