import { Kysely, sql } from 'kysely';

export async function up(db: Kysely<any>) {
   await db.schema
      .createTable('personal_info')
      .addColumn('id', 'integer', (c) => c.autoIncrement().primaryKey())
      .addColumn('first_name', 'varchar(255)', (c) => c.notNull())
      .addColumn('last_name', 'varchar(255)', (c) => c.notNull())
      .addColumn('email', 'varchar(255)', (c) => c.notNull())
      .addColumn('phone', 'varchar(255)', (c) => c.notNull())
      .addColumn('address', 'varchar(255)', (c) => c.notNull())
      .addColumn('city', 'varchar(255)', (c) => c.notNull())
      .execute();
}

export async function down(db: Kysely<any>) {
   await db.schema.dropTable('personal_info').execute();
}
