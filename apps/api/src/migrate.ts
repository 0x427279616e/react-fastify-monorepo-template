import 'dotenv/config';
import { promises as fs } from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { Migrator, FileMigrationProvider } from 'kysely/migration';
import { db } from './config/database/db';

async function main() {
  const migrator = new Migrator({
    db,
    provider: new FileMigrationProvider({
      fs,
      path,
      migrationFolder: path.join(__dirname, 'migrations'),
      import: (modulePath) => import(pathToFileURL(modulePath).href),
    }),
  });

  const { error, results } = await migrator.migrateToLatest();

  results?.forEach((r) => {
    if (r.status === 'Success') {
      console.log(`  ✅ ${r.migrationName}`);
    } else if (r.status === 'Error') {
      console.error(`  ❌ ${r.migrationName}`);
    }
  });

  if (error) {
    console.error(error);
    process.exit(1);
  }

  await db.destroy();
}

main();
