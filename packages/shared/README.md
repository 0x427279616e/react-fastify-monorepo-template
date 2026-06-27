# @template/shared

Shared code (types, schemas, utilities, HTTP client) used by both `apps/web` and `apps/api`.

## Structure

```
packages/shared/
├── index.ts          # Re-exports everything from model/ and axios/
├── model/            # TypeBox validation schemas + derived TS types
│   ├── index.ts
│   ├── sample.model.ts
│   └── strict-object.ts
├── axios/            # Axios HTTP client factory with JWT interceptor
│   ├── index.ts
│   └── axios.ts
├── dist/             # Compiled JS output (for api)
└── package.json
```

## How it's consumed

| App | Import style | Resolution |
|---|---|---|
| **apps/api** | `import { X } from '@template/shared/model'` | npm workspace symlink → `dist/` (needs build) |
| **apps/web** | `import { X } from '@shared/axios'` | Vite path alias → raw `.ts` source directly |

- **apps/api** consumes the compiled `dist/` output. Run `pnpm build` (in shared) or `pnpm --filter @template/shared build` from root after changes.
- **apps/web** reads source files directly via Vite aliases — no build step needed for web to pick up changes.

## How to add a shared file

### Add a reusable type or schema

1. Create a new file (or add to an existing one) inside `model/`:

```ts
// packages/shared/model/widget.model.ts
import { Type, Static } from '@sinclair/typebox';
import { StrictObject } from './strict-object';

export const WidgetSchema = StrictObject({
  id: Type.Optional(Type.Number()),
  name: Type.String(),
  color: Type.String(),
});

export type Widget = Static<typeof WidgetSchema>;
```

2. Export it from `model/index.ts`:

```ts
export * from './widget.model';
```

3. Import it anywhere:

```ts
// In api:
import { WidgetSchema } from '@template/shared/model';

// In web:
import type { Widget } from '@shared/model';
```

### Add a new category (e.g. `utils/`)

1. Create the folder and files:

```
packages/shared/utils/
├── index.ts
└── format.ts
```

2. Add a subpath export to `package.json`:

```json
"exports": {
  ".": "./dist/index.js",
  "./model": "./dist/model/index.js",
  "./axios": "./dist/axios/index.js",
  "./utils": "./dist/utils/index.js"
}
```

3. For **apps/web** to use it, add a Vite alias in `apps/web/vite.config.ts` and a path entry in `apps/web/tsconfig.json`:

```ts
// vite.config.ts
'@shared/utils': path.resolve(__dirname, '../../packages/shared/utils/index.ts'),
```

```json
// tsconfig.json
"@shared/utils": ["../../packages/shared/utils/index.ts"]
```

4. Import it:

```ts
// In api:
import { formatDate } from '@template/shared/utils';

// In web:
import { formatDate } from '@shared/utils';
```
