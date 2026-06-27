import { Kysely, sql } from 'kysely';

export async function up(db: Kysely<any>) {
  await db.schema
    .createTable('sample')
    .addColumn('id', 'integer', (c) => c.autoIncrement().primaryKey())
    .addColumn('sample', 'varchar(255)', (c) => c.notNull())
    .execute();
}

export async function down(db: Kysely<any>) {
  await db.schema.dropTable('sample').execute();
}
