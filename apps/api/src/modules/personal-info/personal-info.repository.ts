import { db } from '../../config/database/db';
import { Insertable, Updateable } from 'kysely';
import { PersonalInfoTable } from '../../config/database/table.types';

export async function search(searchParams: { id?: number }) {
   let query = db.selectFrom('personal_info').selectAll();
   return await query.execute();
}

export async function getById(id: number) {
   return await db
      .selectFrom('personal_info')
      .selectAll()
      .where('id', '=', id)
      .executeTakeFirst();
}

export async function insert(data: Insertable<PersonalInfoTable>) {
   return await db
      .insertInto('personal_info')
      .values(data)
      .executeTakeFirst();
}

export async function update(
   id: number,
   data: Updateable<PersonalInfoTable>,
   transaction?: any,
) {
   const conn = transaction ?? db;
   return await conn
      .updateTable('personal_info')
      .set(data)
      .where('id', '=', id)
      .executeTakeFirst();
}

export async function remove(id: number) {
   await db.deleteFrom('personal_info').where('id', '=', id).execute();
}
