import pluginBetterTailwindcss from "eslint-plugin-better-tailwindcss";
import pluginReact from "eslint-plugin-react";
import pluginReactHooks from "eslint-plugin-react-hooks";
import globals from "globals";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { config as baseConfig } from "./base.js";
import pluginPreferTemplate from "./plugins/prefer-template/index.mjs";
import pluginTailwindUseNamedColor from "./plugins/tailwind-use-named-color/index.mjs";

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");

/**
 * A custom ESLint configuration for libraries that use React.
 *
 * @type {import("eslint").Linter.Config[]}
 * */
export const config = [
  ...baseConfig,
  {
    ...pluginReact.configs.flat.recommended,
    ...pluginReact.configs.flat["jsx-runtime"],
    languageOptions: {
      ...pluginReact.configs.flat.recommended.languageOptions,
      globals: {
        ...globals.serviceworker,
      },
      parserOptions: {
        ...pluginReact.configs.flat.recommended.languageOptions.parserOptions,
        projectService: true,
        tsconfigRootDir: projectRoot,
      },
    },
  },
  pluginReactHooks.configs.flat["recommended-latest"],
  {
    rules: {
      "react/react-in-jsx-scope": "off",
      "react-hooks/refs": "off",
      "react-hooks/error-boundaries": "off",
      "react/jsx-curly-brace-presence": ["warn", "never"],
    },
  },
  {
    files: ["**/*.stories.tsx"],
    rules: {
      "react-hooks/rules-of-hooks": "off",
    },
  },
  {
    settings: {
      "better-tailwindcss": {
        entryPoint: resolve(projectRoot, "src/styles/globals.css"),
        detectComponentClasses: true,
      },
    },
    plugins: {
      "better-tailwindcss": pluginBetterTailwindcss,
    },
    rules: {
      ...pluginBetterTailwindcss.configs["stylistic-warn"].rules,
      ...pluginBetterTailwindcss.configs["correctness-error"].rules,
      "better-tailwindcss/enforce-canonical-classes": "error",
      "better-tailwindcss/no-unknown-classes": [
        "warn",
        {
          ignore: [
            "toaster",
            "^(?:.*:)?toast$",
            "group",
            "^(?:.*:)?cms-",
            "^(?:.*:)?[a-z-]+-cms-[\\w-]+(?:\\/\\d+)?$",
            "^(?:.*:)?scrollbar-thin$",
            "^(?:.*:)?scrollbar-(?:thumb|track)-[\\w-]+$",
            "^(?:.*:)?scrollbar-(?:thumb|track)-\\[[^\\]]+\\]$",
            "date-range-picker-calendar",
            "date-picker-calendar",
          ],
        },
      ],
      "better-tailwindcss/enforce-consistent-line-wrapping": [
        "warn",
        {
          strictness: "loose",
          attributes: [],
          callees: ["cn"],
        },
      ],
    },
  },
  {
    plugins: {
      "tailwind-use-named-color": pluginTailwindUseNamedColor,
    },
    rules: {
      "tailwind-use-named-color/use-named-color": "error",
    },
  },
  {
    plugins: {
      "prefer-template": pluginPreferTemplate,
    },
    rules: {
      "prefer-template/multiline-classname": "error",
    },
  },
];
