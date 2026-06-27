# Project Template

Monorepo managed with [pnpm workspaces](https://pnpm.io/workspaces) and orchestrated by [Turborepo](https://turbo.build/repo).

## Quick start

Create a new project from this template:

```bash
npx create-bryan-monorepo-template
```

Or with a project name directly:

```bash
npx create-bryan-monorepo-template my-project
```

## Architecture

```
├── apps/
│   ├── api/                  # Fastify backend (TypeScript)
│   └── web/                  # React + Vite frontend (TypeScript)
├── packages/
│   └── shared/               # Shared types, schemas, and utilities
├── turbo.json                # Turborepo pipeline config
└── pnpm-workspace.yaml       # Workspace definition
```

**`apps/`** — deployable applications. Each is its own package with its own dependencies and build.

**`packages/`** — internal libraries consumed by apps. Not deployed independently, but built first.

## Prerequisites

- **Node.js** >= 18
- **pnpm** >= 9 — install via `npm install -g pnpm`

## Getting started

```bash
# 1. Install dependencies
pnpm install

# 2. Build all packages (shared → api)
pnpm build

# 3. Configure environment
#    Copy apps/api/.env to apps/api/.env.local
#    Fill in your MySQL credentials and other variables
```

## Turborepo pipeline

[`turbo.json`](./turbo.json) defines how tasks flow between packages:

| Task | `dependsOn` | `outputs` | Persistent |
|---|---|---|---|
| `build` | `^build` | `dist/**` | No |
| `dev` | `^build` | — | Yes |
| `start` | `^build` | — | Yes |

- **`^build`** means "wait for all workspace dependency builds to finish first" — shared builds before api.
- `dev` and `start` are **persistent** (they run indefinitely), so caching is disabled for them.
- `build` outputs are cached — Turborepo skips rebuilds when inputs haven't changed.

## Scripts

### Root (run via pnpm or turbo)

| Command | What it does |
|---|---|
| `pnpm dev` | Start everything in dev mode (apps/* only, serialized) |
| `pnpm build` | Build all packages and apps in dependency order |
| `pnpm start` | Start compiled production servers |
| `pnpm test` | Run API tests only (configured in turbo for expansion) |

### Running per-package commands from root

Use `pnpm --filter` to target a specific package, or `turbo --filter` to scope turbo to a subset.

#### `pnpm --filter <name> <script>`

Runs the script defined in that package's `package.json`. No dependency ordering — what you ask for is what runs.

```bash
# Run a single package's script
pnpm --filter api dev
pnpm --filter web build
pnpm --filter shared build

# Run two packages independently
pnpm --filter api dev & pnpm --filter web dev
```

#### `turbo --filter=<name> <task>`

Runs the task within turbo's pipeline, respecting `dependsOn` (e.g. builds shared before api).

```bash
# Build only api (shared builds first due to ^build)
turbo build --filter=@template/api

# Dev only the api package with dependency chain
turbo dev --filter=@template/api

# Run all test scripts across the monorepo
turbo test
```

#### Common examples

| Goal | Command |
|---|---|
| Dev both api and web in parallel | `pnpm dev` |
| Dev only api | `pnpm --filter api dev` |
| Dev only web | `pnpm --filter web dev` |
| Build everything | `pnpm build` |
| Build only web | `turbo build --filter=@template/web` |
| Build only api (shared auto-built first) | `turbo build --filter=@template/api` |
| Run api tests | `pnpm --filter api test` |
| Run api migrations | `pnpm --filter api db:migrate` |

## Cross-package dependencies

Packages reference each other via `workspace:*` protocol in `package.json`:

```json
"@template/shared": "workspace:*"
```

This tells pnpm to resolve it from the monorepo rather than the registry. When you run `pnpm build` or `pnpm dev`, Turborepo ensures `@template/shared` is built before `@template/api` (the `^build` dependency).

## Adding a new app or package

1. Create a directory under `apps/` or `packages/`
2. Add a `package.json` with a `name` scoped to `@template/`
3. Reference other internal packages via `"workspace:*"`
4. (Optional) Add build/dev tasks to `turbo.json`
5. Run `pnpm install` at root to link everything

## Environment variables

Each app manages its own `.env` files:

- **api** — `apps/api/.env` (template) → copy to `apps/api/.env.local`
- **web** — `apps/web/.env` (template) → copy to `apps/web/.env.local`

Both are loaded at dev/start time by dotenv (api) or Vite (web).
