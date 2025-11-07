# Deploying todo-list-app to Render

This document explains how to deploy the monorepo `todo-list-app` to Render. The repo layout:

- `server/` — Node + TypeScript + Express API (Postgres). Entry: `src/index.ts`.
- `client/` — Vite + React frontend (TypeScript). Built output: `dist`.
- `shared/` — Local package used by both `server` and `client` via a file: dependency (e.g. `"@todo-app/shared": "file:../shared"`).

Key points: Render runs services per-root-directory. For this monorepo you'll create:

1. A Managed Postgres database on Render.
2. A Web Service for the `server`.
3. A Static Site (recommended) or Web Service for the `client`.

---

## 1) Create a Postgres database on Render

- In Render dashboard: New → Postgres.
- Choose plan/region and create the DB.
- Copy connection details and set the following environment variables in the `server` Web Service (exact names used by `server/src/db.ts`):
  - DB_HOST
  - DB_USER
  - DB_PASSWORD
  - DB_NAME
  - DB_PORT

Example (replace with Render values):
- DB_HOST: db-xxxxx.render.com
- DB_USER: todo_user
- DB_PASSWORD: <your-db-password>
- DB_NAME: todoapp
- DB_PORT: 5432

> Alternatively you can use `DATABASE_URL` (full connection string) but `server/src/db.ts` reads the individual `DB_*` vars, so supply them for clarity.

---

## 2) Deploy the backend (`server`) as a Web Service

Render service settings:
- Type: Web Service
- Environment: Node
- Branch: main (or your deployment branch)
- Root Directory: `server`
- Build Command: `npm install && npm run build`
- Start Command: `npm run start` (or `npm run start:prod` — both run `node dist/index.js` in this repo)
- Set environment-specific config and secrets (4. Environment variables)
- Health Check Path: `/health`
- Auto deploy: enabled (optional)

Notes about the `server` code:
- The server runs `initDatabase()` at startup which will attempt to create the `todos` table if missing. Ensure DB env vars are set before the service starts.
- The server listens on `process.env.PORT || 3000`. Render sets `$PORT` automatically.
- The root path `/` now redirects to `/health` to avoid returning 404 on the root.
- There's an `/info` route that returns a brief JSON description and a greeting from `@todo-app/shared`.

If your build fails because `@todo-app/shared` is a local file package, Render needs that folder available during `npm install` in the `server` root. The monorepo layout in this repo (`server`, `client`, `shared`) is compatible with Render as long as the `shared/` directory is committed and reachable via the relative path in `package.json` (`file:../shared`).

---

## 3) Deploy the frontend (`client`)

Recommended: use Render's Static Site for the frontend.

Settings:
- Type: Static Site
- Branch: main (or your branch)
- Root Directory: `client`
- Build Command: `npm install && npm run build`
- Publish Directory: `dist`

Environment variables for the client build (Vite):
- VITE_API_BASE: `https://<your-backend-service>.onrender.com/api`

Use `import.meta.env.VITE_API_BASE` in the client to point requests to the backend in production.

Alternative: If you prefer serving the client from the server, build the client in CI and copy `client/dist` to `server/public` and serve from Express. That requires small server changes and a single Web Service instead of two services.

---

## 4) Environment variables (summary)

Server (required):
- DB_HOST
- DB_USER
- DB_PASSWORD
- DB_NAME
- DB_PORT
- NODE_ENV=production (optional)

Client (optional):
- VITE_API_BASE=https://<your-backend>.onrender.com/api

---

## 5) Health checks & readiness

- Backend health check path: `/health` — returns `{ status: 'ok', message: 'Todo API is running' }`.
- Configure Render to use `/health` so it can detect when the service is healthy.
- Because the server runs `initDatabase()` at startup, the process will fail to start if DB credentials are wrong or DB is unreachable. Check logs in Render for DB connection errors.

---

## 6) Common issues & troubleshooting

- Cannot GET /: The server now redirects `/` → `/health`. If you still see `Cannot GET /`, ensure you deployed the `server` Web Service (not just the frontend) and are hitting the correct URL/port.

- Local file package `@todo-app/shared` not found: Ensure the `shared/` directory is committed to the repository (it must appear at the path `../shared` relative to `server` during `npm install`). If you want to publish `@todo-app/shared` as an npm package, update `server/package.json` and `client/package.json` accordingly.

- DB connection refused: verify the DB credentials and that the DB allows connections from the Render instance (if you created DB elsewhere, configure network/allowlist or use Render-managed DB).

- Vite build errors: Ensure Node version on Render matches the project's expectations. You can set a Node version in Render's service settings (or add an `.nvmrc` / `engines` in `package.json`). If TypeScript build fails, check `tsconfig.json` or the `client` build script.

---

## 7) Quick local commands (Windows PowerShell)

Server (dev):
```powershell
cd server
npm install
npm run dev
```

Server (build & start):
```powershell
cd server
npm install
npm run build
npm run start
```

Client (dev):
```powershell
cd client
npm install
npm run dev
```

Client (build):
```powershell
cd client
npm install
npm run build
npm run preview
```


