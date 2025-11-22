# SuryADT Task – Backend (Express) + Mobile (React Native/Expo)

This repository contains a simple Express backend and a React Native app (Expo Router) that lists Owners and their Cats. It supports sorting by name or cat count, navigating to an owner detail with cat list, selecting a master owner, and persisting favorites locally. A bonus shake-to-make-master feature is implemented.

## Prerequisites

- Node.js 18+ and npm
- Optional: Redis server (local or remote). Redis is disabled by default and the backend falls back to an in‑memory store.
- Expo CLI for running the mobile app (no global install required; you can use `npx expo`).

---

## Backend (api)

- Location: `api/`
- Stack: Express, optional Redis caching, pagination utilities, simple rate limiting and error handling
- Key endpoints:
  - `GET /api/v1/owners` — paginated owners list with `search` and `sort` (`name` or `cats`)
  - `GET /api/v1/owners/:id` — owner details
  - `GET /api/v1/owners/:id/cats` — cats for the owner
  - Health check: `GET /api/v1/health`

### Run locally

1. Install dependencies
   ```bash
   cd api
   npm install
   ```
2. Start the server
   ```bash
   npm start
   ```
   - On success, you should see: `Server is running on port 3000`
   - Open `http://localhost:3000/api/v1/owners`

### Optional: enable Redis

The backend is robust to missing Redis. If you do run Redis (e.g., on `127.0.0.1:6379`), enable it via environment variables:

- Create `api/.env` with:
  ```env
  REDIS_ENABLED=true
  REDIS_HOST=127.0.0.1
  REDIS_PORT=6379
  REDIS_PASSWORD=
  ```
- Restart: `npm start`

Notes:
- When `REDIS_ENABLED=false` (default), an in‑memory Map is used that mimics a subset of Redis API for development. See `api/src/config/redis.js`.
- Owners are seeded once at server start. See router setup at `api/src/routes/ownerRoutes.js`.

### Project scripts

- `npm start` — run the server
- `npm run dev` — run with nodemon (auto-restart)

---

## Mobile App (mobile)

- Location: `mobile/`
- Stack: Expo Router, TypeScript, Axios, AsyncStorage, Expo Sensors (Accelerometer)
- Key views:
  - Owners list: `mobile/app/owners/index.tsx`
  - Owner detail: `mobile/app/owners/[id].tsx`
  - Layout: `mobile/app/_layout.tsx`

### Configure API base URL

The app points to `http://localhost:3000/api/v1` by default in `mobile/config/api.ts`.
- Android emulator: replace base URL with `http://10.0.2.2:3000/api/v1`.
- iOS simulator: `http://localhost:3000/api/v1` works.
- Physical device: use your machine IP, e.g., `http://192.168.1.10:3000/api/v1`.

### Run locally

1. Install dependencies
   ```bash
   cd mobile
   npm install
   ```
2. Start the app
   ```bash
   npm start
   ```
   - Press `a` for Android, `i` for iOS, or open with the Expo Go app.

### Features mapping

- Sorting by name or number of cats — toggle buttons on the list screen.
- Navigate to owner subview (cat list) — tap an owner row.
- Make master — press the `Make Master` button; the master owner is pinned to top. Press again to unmake.
- Favorites — tap the purple icon; favorites persist using `AsyncStorage`.
- Bonus — shake the phone to make master (uses `expo-sensors`).

### Tests

- Unit tests for logic helpers and basic screen rendering are included.
- Run tests:
  ```bash
  cd mobile
  npm test
  ```

---

## Scaling considerations

- Backend pagination with `page` and `limit` to avoid large payloads.
- Mobile list uses `FlatList` virtualization; prefer server-side search/sort for very large datasets.
- Caching layer (Redis with `setEx`) can be enabled to reduce backend load for frequent reads.

## Error handling

- Standardized error responses and rate limiting are in place on the backend.
- Mobile app surfaces basic API errors in the console.