# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

LifePoints: a gamified social app rewarding real-world good deeds (tasks → LP points, levels, quests, trophies, communities, shop). Two independent npm projects, no root package.json — run commands inside `backend/` or `frontend/`. Code comments and some log messages are in German; the UI supports `de` and `en`.

## Commands

### Backend (`backend/`): Express 5 + Mongoose + TypeScript, run via tsx
- `docker compose up`: backend on :6767 plus MongoDB. Required, because `src/app.ts` hardcodes `mongodb://mongo:27017/lifepoints` (the docker hostname; `MONGO_URI` is set but not read). Needs `backend/.env` with `APPWRITE_ENDPOINT` and `APPWRITE_PROJECT_ID`.
- `npm run dev`: nodemon + tsx on `src/app.ts` (only works where host `mongo` resolves)
- `npx eslint src`: lint. No backend tests exist yet.

### Frontend (`frontend/`): Expo 54 / React Native 0.81 / expo-router, JavaScript
- `npm start` (or `npm run web|android|ios`)
- `npm test`: Jest (`jest-expo` preset); `npm run test:coverage`
- Single test: `npx jest src/store/slices/createQuestSlice.test.js` or `npx jest -t "test name"`
- `npx eslint .`: lint
- Env: copy `.env.example` → `.env` (`EXPO_PUBLIC_APPWRITE_*`). The backend URL comes from `API_URL` and falls back to `http://localhost:6767/api/v1`.

## Architecture

### Auth flow
Appwrite handles authentication. The frontend (`src/api/client/appwrite.js`) creates a session, and every backend call mints a fresh Appwrite JWT and sends it as a Bearer token. `backend/src/middleware/auth.middleware.ts` verifies it against Appwrite, looks up the Mongo `User` by `external_id = appwriteUser.$id`, and sets `req.user = { mongoId, ...appwriteUser }`. `POST /user/sync` creates or updates the Mongo user after login.

### Backend layering
`routers/v1.router.ts` (all routes, mounted at `/api/v1`) → `controllers/*.controller.ts` (parse the request, call the service, shape the response) → `services/*.services.ts` (Mongoose queries) → `models/*.model.ts`. Many routes are still stubs that return `"must be implemented"`. Paginated lists use ObjectId cursor pagination: fetch `limit + 1` and return `{ data, pagination: { nextCursor, hasNextPage } }` (see `task.services.ts`). Seed and static data live in `src/lib/data/` and `src/config/`. The path alias `@/*` points to `src/*`, and imports use `.js` extensions (nodenext).

### Frontend data layers
- **Server state**: TanStack Query, under `src/api/<domain>/`. Each domain has a `*Options.js` with query keys and `queryOptions` factories, plus `use*.js` hooks for queries and mutations that invalidate keys on success. All HTTP goes through `apiRequest(endpoint, options)` in `src/api/client/api.js`.
- **Client state**: a single Zustand store, `src/store/useStore.js`, composed from slices in `src/store/slices/` (UI, Data, Profile, Quest, Feed) and persisted to AsyncStorage. Only the keys listed in `partialize` are persisted, so add new keys there if they must survive restarts. Slices call each other through `get()` (for example, quest progress calls `addLp`).
- MVP scope (see `MVP-SCOPE.md`): features outside the MVP are hidden, not deleted, via `src/constants/FeatureFlags.js` (`FEATURES`, `ROUTE_FEATURES`). The root `_layout.jsx` redirects disabled routes to `/home`. Gate new UI behind a flag instead of removing code. Screen tests for hidden features mock the flags to all-`true`, and `__tests__/screens/mvp-scope.test.jsx` covers the real MVP flags.
- Much of the UI still runs on mock and static data from `src/mocks/` and `src/constants/` (catalogs for tasks, quests, trophies, ranks, rewards). Game logic (XP, ranks, loot, tasks) is in `src/utils/*Helpers.js`.
- Routing: expo-router file-based routes in `src/app/`, with the groups `(tabs)` (home, tasks, social, shop, profile), `(onboarding)`, `auth/`, `setting/`. The root `_layout.jsx` sets up the QueryClient, fonts, the theme, and auth/onboarding redirects.
- i18n: `src/utils/i18n.js` statically imports the namespaces from `public/locales/{de,en}/*.json`. A new namespace must be added for both languages and registered there.
- Theming: `useAppTheme()` plus `src/constants/Colors.js`, `Spacing.js`, `Typography.js`. Reusable primitives (`AppText`, `AppButton`, `BaseCard`, and others) are in `src/components/ui/`.

### Testing
Tests live next to their source (`*.test.js[x]`) or in `__tests__/`. `jest.setup.js` sets the Appwrite env vars and auto-mocks AsyncStorage, safe-area-context, react-i18next and expo-router (manual mocks are in `__mocks__/`). Slice tests build an isolated store with `createStore` from `zustand/vanilla` and spread the slice into it, stubbing cross-slice functions such as `addLp` with `jest.fn()`.

## Code rules
- ES modules only (`import` / `export` / `export default`).
- **Backend controllers and services**: no named imports from other modules. Import the whole default export (`import TaskServices from "../services/task.services.js"`) and export a default object (`export default { getTasks }`). Named imports are allowed everywhere else.
- **Frontend**: all backend calls go through `apiRequest`.
- ESLint enforces `simple-import-sort` with groups react/react-native → packages → `@/` → relative → assets. Import UI components via `@/components/ui/...`, never through relative paths. Use Unix line endings.

## Design (see `frontend/DESIGN.md` for the full tokens)
Dark "glassmorphic" theme: deep navy surfaces, mint-green primary (#55e0ac) for CTAs and success, neon pink secondary for badges and alerts, gold tertiary for premium. Use Inter only, an 8px spacing grid, and rounded shapes. Product constraints: the app must never look like a survey or market-research app, and monetization or ads must never be aggressive, flashing or intrusive.
