import js from "@eslint/js";
import eslintConfigPrettier from "eslint-config-prettier";
import onlyWarn from "eslint-plugin-only-warn";
import turboPlugin from "eslint-plugin-turbo";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import tseslint from "typescript-eslint";

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");

/**
 * A shared ESLint configuration for the repository.
 *
 * @type {import("eslint").Linter.Config}
 * */
export const config = [
  {
    ignores: [
      "dist/**",
      ".next/**",
      "node_modules/**",
      "storybook-static/**",
      "playwright-report/**",
      "__screenshots__/**",
      "pnpm-lock.yaml",
    ],
  },
  js.configs.recommended,
  eslintConfigPrettier,
  ...tseslint.configs.strictTypeChecked,
  ...tseslint.configs.stylistic,
  ...tseslint.config({
    rules: {
      "@typescript-eslint/restrict-template-expressions": [
        "warn",
        { allowNumber: true },
      ],
      "@typescript-eslint/consistent-type-definitions": ["warn", "type"],
      "@typescript-eslint/no-confusing-void-expression": [
        "warn",
        { ignoreArrowShorthand: true },
      ],
      "@typescript-eslint/no-base-to-string": [
        "warn",
        {
          ignoredTypeNames: [
            "Error",
            "RegExp",
            "URL",
            "URLSearchParams",
            "UrlObject",
          ],
        },
      ],
      "@typescript-eslint/consistent-type-imports": [
        "error",
        { prefer: "type-imports", fixStyle: "separate-type-imports" },
      ],
      "@typescript-eslint/no-misused-promises": [
        "warn",
        { checksVoidReturn: { attributes: false } },
      ],
      "max-len": [
        "warn",
        {
          code: 80,
          tabWidth: 2,
          ignoreUrls: true,
          ignoreComments: true,
          ignoreStrings: false,
          ignoreTemplateLiterals: false,
          ignoreRegExpLiterals: true,
          ignorePattern: [
            "^\\s*import\\s.+",
            "^\\s*(?:\"[^\"]*\"|'[^']*'|`[^`]*`)\\s*,?\\s*$",
            "^\\s*(?:const|let|var)\\s+[A-Za-z_$][\\w$]*\\s*(?::\\s*[^=]+)?=\\s*(?:\"[^\"]*\"|'[^']*'|`[^`]*`|true|false|null|undefined|[-+]?\\d+(?:\\.\\d+)?)\\s*[;,]?\\s*$",
            "^\\s*[A-Za-z_$][\\w$]*\\s*:\\s*(?:\"[^\"]*\"|'[^']*'|`[^`]*`|true|false|null|undefined|[-+]?\\d+(?:\\.\\d+)?)\\s*,?\\s*$",
            "^\\s*(?!className=)[A-Za-z_$][\\w$-]*\\s*=\\s*(?:\"[^\"]*\"|'[^']*'|\\{(?:true|false|null|undefined|[-+]?\\d+(?:\\.\\d+)?)\\})\\s*$",
          ].join("|"),
        },
      ],
    },
  }),
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: projectRoot,
      },
    },
  },
  {
    plugins: {
      turbo: turboPlugin,
    },
    rules: {
      "turbo/no-undeclared-env-vars": "warn",
    },
  },
  {
    plugins: {
      onlyWarn,
    },
  },
];
