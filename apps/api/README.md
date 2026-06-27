# @template/api

Fastify backend with TypeScript, MySQL (Kysely), JWT auth, and Cloudflare R2 file uploads.

## Structure

```
├── src/
│   ├── index.ts                 # Entry point — registers plugins, routes, starts server
│   ├── apiError.ts              # Custom error class with statusCode
│   ├── config/database/         # Kysely setup + typed table definitions
│   │   ├── db.ts                # MySQL2 connection pool
│   │   ├── types.ts             # Database interface (all tables)
│   │   └── table.types.ts       # Per-table type definitions
│   ├── modules/
│   │   └── sample/              # Example module — copy to create new ones
│   │       ├── sample.routes.ts       # Route definitions
│   │       ├── sample.controller.ts   # Request/response handling
│   │       ├── sample.service.ts      # Business logic
│   │       ├── sample.repository.ts   # Kysely queries
│   │       └── sample.schema.ts       # TypeBox validation schemas
│   ├── migrations/
│   │   └── 20240627_create_sample.ts  # DB migration example
│   ├── services/
│   │   └── upload.service.ts    # R2 file upload orchestration
│   ├── utils/
│   │   ├── r2Client.ts          # Cloudflare R2 S3 client
│   │   ├── upload.ts            # PutObject wrapper
│   │   ├── fileProcessor.ts     # Multipart file parsing + sharp processing
│   │   ├── mailer.ts            # Email placeholder (Brevo/Nodemailer)
│   │   └── sendResult.ts        # BigInt-safe JSON serializer
│   ├── Handler/
│   │   └── authentication.ts    # Role-based auth decorator
│   ├── types/
│   │   ├── fastify.d.ts         # Fastify type augmentation
│   │   └── schema.ts            # RouteSchema interface
│   └── test/
│       ├── test-utils.ts        # Module mocking utility
│       └── sample.test.ts       # Service-layer tests
└── http/
    └── sample.http              # REST Client test requests
```

## Module pattern

Each module uses a 5-layer architecture:

```
routes.ts        → endpoint definitions, auth preHandler
controller.ts    → extracts params, calls service, sends reply
service.ts       → business logic, validation, error handling
repository.ts    → raw Kysely DB queries
schema.ts        → TypeBox validation schemas
```

## Environment variables

Copy `.env` to a local file (`.env` is gitignored). Required vars:

| Variable | Description |
|---|---|
| `MYSQL_HOST` / `USER` / `PASSWORD` / `DATABASE` | MySQL connection |
| `AUTH_JWT_KEY` / `AUTH_JWT_EXPIRATION` | JWT signing |
| `R2_ACCOUNT_ID` / `KEY_ID` / `SECRET_KEY` | Cloudflare R2 |
| `R2_BUCKET_NAME` / `R2_BUCKET_DOMAIN` | R2 bucket config |
| `SERVER_PORT` | API port (default 4000) |

## Scripts

| Command | Description |
|---|---|
| `pnpm start` | Dev server with hot reload (`tsx watch`) |
| `pnpm build` | Compile TypeScript to `dist/` |
| `pnpm server` | Run compiled build |
| `pnpm test` | Run tests (`node --import tsx --test`) |
| `pnpm db:migrate` | Run pending migrations |
| `pnpm db:rollback` | Rollback last migration |
| `pnpm db:gen` | Generate Kysely types from database |

## Adding a new module

1. Copy `modules/sample/` to `modules/<name>/`
2. Rename files to `<name>.routes.ts`, `<name>.controller.ts`, etc.
3. Add `<name>` to the `routes` array in `src/index.ts`
4. Add table types in `config/database/table.types.ts` and `types.ts`

## Testing

Uses Node.js native `node:test` + `node:assert`. Run with `pnpm test`.
