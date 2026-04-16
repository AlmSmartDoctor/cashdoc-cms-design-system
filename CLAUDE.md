# Cashdoc CMS Design System

React component library and design system for the Cashdoc CMS platform. Published as `@cashdoc/cashdoc-cms-design-system`.

## Tech Stack

- **React 18** + **TypeScript 5** (strict mode)
- **TailwindCSS 4** with custom CMS color tokens
- **Vite 5** (build tool, library mode: ES + UMD)
- **Storybook 7** (component development and docs)
- **Radix UI** (accessible primitives)
- **Class Variance Authority** (variant management)
- **Playwright** (E2E testing against Storybook)

## Commands

```bash
# Development
pnpm dev              # Vite dev server (port 5600)
pnpm storybook        # Storybook (port 6006)

# Build & types
pnpm build            # TypeScript + Vite → dist/
pnpm type-check       # tsc --noEmit

# Quality
pnpm lint             # ESLint
pnpm format           # Prettier

# Testing
pnpm test:e2e         # Playwright (requires Storybook running)
pnpm test:e2e:ui      # Playwright UI mode
```

## Project Structure

```
src/
├── components/       # One directory per component (see conventions below)
│   └── index.ts      # Barrel export
├── styles/
│   └── globals.css   # Tailwind + CMS color tokens
├── utils/
│   └── cn.ts         # clsx + tailwind-merge utility
└── index.ts          # Main entry point

e2e/                  # Playwright tests (run against Storybook)
.storybook/           # Storybook config
```

## Component Conventions

Each component lives in its own directory:

```
ComponentName/
├── ComponentName.tsx        # Main component, uses forwardRef
├── ComponentName.stories.tsx
├── variants.ts              # CVA variants
└── index.ts                 # Barrel export
```

- Use `forwardRef` for all components
- Use `class-variance-authority` for variants
- Use `cn()` from `src/utils/cn.ts` for class merging
- JSDoc comments in Korean for component documentation
- Include `@tool snippet` tags in JSDoc for usage examples

## Path Alias

`@/*` resolves to `./src/*` (configured in both `tsconfig.json` and `vite.config.ts`).

## Release Process

Semantic release via GitHub Actions. Version bumps are controlled by commit message suffixes:
- `[major]`, `[minor]`, `[patch]` — force version level
- `chore` or `doc` prefixes — skip release

Manual releases: `pnpm release:patch / release:minor / release:major`

## Requirements

- Node.js ≥ 22.0.0
- pnpm ≥ 10.0.0
