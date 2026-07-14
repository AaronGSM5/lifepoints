import { FlatCompat } from "@eslint/eslintrc";
import js from "@eslint/js";
import importPlugin from "eslint-plugin-import";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import globals from "globals";

const compat = new FlatCompat({
  baseDirectory: import.meta.dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all
});

export default [
  {
    ignores: ["node_modules/", "dist/", "build/", "*.config.js", ".dockerignore"]
  },
  ...compat.extends("prettier"),
  {
    plugins: {
      import: importPlugin,
      "simple-import-sort": simpleImportSort
    },
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node
      }
    },
    settings: {
      "import/resolver": {
        node: {
          extensions: [".js", ".jsx", ".ts", ".tsx", ".json"]
        },
        typescript: {
          project: "./jsconfig.json"
        }
      }
    },

    rules: {
      "linebreak-style": ["error", "unix"],
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              group: ["./ui/*", "../components/ui/*", "../../components/ui/*"],
              message: "Use '@/components/ui/...' instead of relative import."
            }
          ]
        }
      ],
      "no-unused-vars": [
        "warn",
        {
          vars: "all",
          args: "after-used",
          ignoreRestSiblings: true
        }
      ],
      // "simple-import-sort/imports": [
      //   "error",
      //   {
      //     groups: [
      //       ["^react", "^react-native"],
      //       ["^@?\\w"],
      //       ["^@/"],
      //       ["^\\./", "^\\.\\./"],
      //       ["^.+\\.s?css$", "^.+\\.(png|jpg|jpeg|gif|svg)$"]
      //     ]
      //   }
      // ],
      // "simple-import-sort/exports": "error"
    }
  }
];
