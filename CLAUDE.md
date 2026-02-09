# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev          # Start dev server (exposed on local network)
npm run build        # Type-check with tsc, then bundle with Vite
npm run lint         # ESLint with zero warnings policy
npm test             # Vitest in watch mode
npm test -- --run    # Vitest single run
npm test -- --run src/components/GameCell.test.tsx  # Run a single test file
npm run coverage     # Vitest with V8 coverage
```

**Always run `npm run build`** (not just `tsc -b`) to catch Vite/Rollup bundling issues that TypeScript alone won't find.

## Architecture

React 18 + TypeScript SPA for browsing BoardGameGeek collections. Uses a custom AWS Lambda proxy (`VITE_BGG_PROXY` env var) that converts BGG's XML API to JSON.

### Routing

TanStack Router with **file-based routing** via the `TanStackRouterVite` plugin. Routes live in `src/routes/` and the plugin auto-generates `src/routeTree.gen.ts` (do not edit manually).

- `__root.tsx` — Root layout with QueryClientProvider, cache persistence to localStorage, devtools
- `index.tsx` — Home page showing saved users
- `user.$username.tsx` — Collection page with URL-driven search params (sort, players, playtime)
- `about.tsx` — About page

**Never put test files in `src/routes/`** — the router plugin treats all files there as routes and will break the build.

**Don't import from route files in components** — creates circular dependencies that break code splitting. Shared types/functions go in `shared.types.ts`.

### Data Flow

1. `src/lib/api.ts` — `getUser()` and `getCollection()` fetch from the BGG proxy
2. React Query manages caching (7-day stale/gc time), persisted to localStorage
3. `src/shared.types.ts` — `Game`, `User` types, search param validation (`validateSearch`), sort/filter constants
4. `src/lib/comparators.ts` — sorting functions for each sort order
5. Components filter/sort in memory; `fuse.js` handles fuzzy name search with debounce

### Testing

Vitest with jsdom, globals enabled (no need to import describe/it/expect). MSW intercepts all HTTP requests — `src/mockServer.ts` routes to JSON fixtures in `src/test/`.

- `src/lib/testUtils.tsx` — `renderWithProviders()` (Router + QueryClient) and `renderWithQueryProvider()` (QueryClient only)
- `src/setupTests.tsx` — MSW server lifecycle, `@testing-library/jest-dom` matchers

### Code Style

- Prettier: no semicolons, 100 char width
- ESLint: `@typescript-eslint/recommended-type-checked`, `type` over `interface`
- CSS Modules for component styling
