// @ts-nocheck

import { globalIgnores } from "eslint/config";
import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import reactPlugin from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import jsxA11y from "eslint-plugin-jsx-a11y";
import tailwind from "eslint-plugin-tailwindcss";
import importPlugin from "eslint-plugin-import";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import { flatConfig } from "@next/eslint-plugin-next";
import eslintConfigPrettier from "eslint-config-prettier/flat";

export default tseslint.config(
  // Ignores
  globalIgnores([
    ".next/**/*",
    "**/components/ui/",
    "**/node_modules/",
    ".git/",
    "prisma/seed.ts",
    "prisma/migrations/**/*",
    "prisma/schema.prisma",
    "./tailwind.config.ts",
  ]),
  // Next
  flatConfig.coreWebVitals,

  // JS
  eslint.configs.recommended,

  // TS
  tseslint.configs.stylisticTypeChecked,
  tseslint.configs.recommendedTypeChecked,

  // React
  reactPlugin.configs.flat.recommended,
  reactPlugin.configs.flat["jsx-runtime"],

  // React Hooks
  reactHooks.configs["recommended-latest"],

  // JSX A11y
  jsxA11y.flatConfigs.recommended,

  // Imports
  importPlugin.flatConfigs.recommended,
  importPlugin.flatConfigs.typescript,

  // Tailwind
  ...tailwind.configs["flat/recommended"],

  //... other configs

  // Prettier
  eslintConfigPrettier,
  {
    files: ["**/*.{ts,tsx}"],

    // TypeScript ESLint parser for TS files
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },

    // Imports resolver
    settings: {
      "import/resolver": {
        typescript: true,
        node: true,
      },
      react: {
        version: "detect",
      },
    },

    plugins: {
      // Imports sort
      "simple-import-sort": simpleImportSort,
    },

    // Custom rule to overwrite/modify or to disable if necessary
    rules: {
      "simple-import-sort/imports": "error",
      "simple-import-sort/exports": "error",
    },
  },
);
