# @template/web

React 18 + Vite + TypeScript frontend with Tailwind CSS, Redux Toolkit, React Router v6, and React Query.

## Structure

```
├── src/
│   ├── main.tsx                     # Entry point
│   ├── App.tsx                      # Root theme/layout wrapper
│   ├── tailwind.css                 # Global styles + Tailwind directives
│   ├── i18n.tsx                     # i18next configuration
│   ├── theme.config.tsx             # Default theme constants
│   │
│   ├── components/
│   │   ├── Layouts/
│   │   │   ├── DefaultLayout.tsx    # Main layout (sidebar + header + footer)
│   │   │   ├── BlankLayout.tsx      # Minimal layout (login, 404)
│   │   │   ├── Sidebar.tsx          # Navigation sidebar
│   │   │   ├── Header.tsx           # Top navbar with user dropdown
│   │   │   ├── Footer.tsx           # Footer
│   │   │   └── Setting.tsx          # Theme customizer panel
│   │   ├── form/                    # Form components (Field, Select, Radio, Checkbox)
│   │   ├── modals/
│   │   │   └── Modal.tsx            # Animated modal (framer-motion)
│   │   ├── Icon/                    # ~80+ SVG icon components
│   │   ├── Dropdown.tsx             # Popper-based dropdown
│   │   └── Portals.tsx              # Portal containers
│   │
│   ├── pages/
│   │   ├── Dashboard/
│   │   │   └── Home.tsx             # Dashboard page
│   │   ├── Login/
│   │   │   └── index.tsx            # Login page
│   │   └── Error404.tsx             # 404 page
│   │
│   ├── router/
│   │   ├── index.tsx                # Router creation with layout wrapping
│   │   └── routes.tsx               # Route definitions (lazy-loaded)
│   │
│   ├── services/
│   │   └── api.ts                   # API client (wraps @shared/axios)
│   │
│   ├── store/
│   │   ├── index.tsx                # Redux store (themeConfig slice)
│   │   └── themeConfigSlice.tsx     # Theme/settings state
│   │
│   ├── hooks/
│   │   ├── useSileo.tsx             # Toast notifications
│   │   └── useDebounce.ts           # Debounce utility
│   │
│   └── utils/
│       ├── AuthProvider.tsx         # Auth context (React Context + useReducer)
│       └── AuthChecker.tsx          # Route guard (redirects to /login)
│
├── public/
│   ├── manifest.json                # PWA manifest
│   └── locales/                     # i18n translation files
├── index.html                       # Entry HTML
├── vite.config.ts                   # Vite config (aliases, plugins)
└── tailwind.config.cjs              # Tailwind theme (colors, fonts, plugins)
```

## State management

| Concern | Tool |
|---|---|
| Theme / UI config | Redux Toolkit (`themeConfigSlice`) |
| Authentication | React Context + useReducer (`AuthProvider`) |
| Server data | @tanstack/react-query |
| Toast notifications | Sileo (`useSileo` hook) |

## Routing

Routes are defined in `src/router/routes.tsx` and wrapped with layouts in `src/router/index.tsx`.

| Path | Page | Layout |
|---|---|---|
| `/` | Redirects to `/dashboard` | Default |
| `/login` | Login | Blank |
| `/dashboard` | Dashboard | Default |
| `*` | 404 | Blank |

All pages are lazy-loaded via `React.lazy()`.

## API layer

`src/services/api.ts` wraps `@shared/axios` which provides:

```ts
import { api, get, post, put, patch, del } from '@/services/api';
```

- Base URL from `VITE_API_URL` env var
- 10s timeout
- Auto-attaches JWT Bearer token from localStorage
- Typed response helpers: `ApiResponse<T>`, `ApiError`

## Scripts

| Command | Description |
|---|---|
| `pnpm dev` | Dev server on port 5000 with hot reload |
| `pnpm build` | Production build |
| `pnpm serve` | Preview production build |

## Adding a page

1. Create a page component in `src/pages/<Section>/<Page>.tsx`
2. Add a lazy route in `src/router/routes.tsx`
