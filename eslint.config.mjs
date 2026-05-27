import antfu from "@antfu/eslint-config";

// @ts-check
import withNuxt from "./.nuxt/eslint.config.mjs";

export default withNuxt(
  // Your custom configs here
  antfu(
    {
      type: "app",
      vue: true,
      typescript: true,
      formatters: true,
      imports: false, // <-- Disable antfu's import plugin to avoid conflict with Nuxt
      stylistic: {
        indent: 2,
        semi: true,
        quotes: "double",
      },
    },
    {
      rules: {
        "ts/no-redeclare": "off",
        "ts/consistent-type-definitions": ["error", "type"],
        "no-console": ["warn"],
        "antfu/no-top-level-await": ["off"],
        "node/prefer-global/process": ["off"],
        "node/no-process-env": ["error"],
        "perfectionist/sort-imports": [
          "error",
          {
            type: "alphabetical",
            order: "asc",
          },
        ],
        "unicorn/filename-case": [
          "error",
          {
            case: "kebabCase",
            ignore: ["README.md"],
          },
        ],
      },
      ignores: ["**/*.md"],
    },
  ),
  {
    files: ["pnpm-workspace.yaml"],
    rules: {
      "pnpm/yaml-enforce-settings": "off",
      "yaml/quotes": "off",
      "yaml/plain-scalar": "off",
    },
  },
  {
    files: ["playwright.config.ts"],
    rules: {
      "node/no-process-env": "off",
    },
  },
  {
    files: ["nuxt.config.ts"],
    rules: {
      "node/no-process-env": "off",
    },
  },
);
