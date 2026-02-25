import { config as reactConfig } from "./react.js";

/**
 * A custom ESLint configuration for libraries that use React.
 *
 * @type {import("eslint").Linter.Config} */
export const config = [
  {
    ignores: [
      "dist/**",
      "node_modules/**",
      "storybook-static/**",
      "playwright-report/**",
      "__screenshots__/**",
      ".storybook/**",
      "e2e/**",
      "scripts/**",
      "eslint-config/**",
      "**/*.js",
      "**/*.jsx",
      "**/*.cjs",
      "**/*.mjs",
      "*.config.js",
      "*.config.mjs",
    ],
  },
  ...reactConfig,
];
