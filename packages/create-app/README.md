# `create-bryan-monorepo-template`

Scaffold a new project from the [react-fastify-monorepo-template](https://github.com/bryansurio14/react-fastify-monorepo-template).

## Usage

```bash
pnpm create bryan-monorepo-template
```

Or without installing:

```bash
npx create-bryan-monorepo-template
```

The CLI will prompt for a project name and destination directory, then clone the template, strip the scaffolding CLI itself, rename all `@template` and `project-template` references to your project name, and initialize a fresh git repository.

### Arguments

| Arg | Description |
|---|---|
| `[project-name]` | Name of the project (lowercase, hyphens only) |
| `[destination]` | Output directory (defaults to `./<project-name>`) |

### Options

| Flag | Description |
|---|---|
| `-f, --force` | Overwrite the destination if it already exists |
| `--help` | Show help |
| `--version` | Show version |

## License

ISC
