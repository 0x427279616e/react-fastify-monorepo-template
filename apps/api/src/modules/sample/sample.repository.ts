import { db } from '../../config/database/db';
import ApiError from '../../apiError';
import { Insertable, Updateable } from 'kysely';
import { SampleTable } from '../../config/database/table.types';

export async function search(searchParams: { id?: number }) {
   let query = db.selectFrom('sample').selectAll();
   return await query.execute();
}

export async function getById(id: number) {
   return await db
      .selectFrom('sample')
      .selectAll()
      .where('id', '=', id)
      .executeTakeFirst();
}

export async function insert(data: Insertable<SampleTable>) {
   return await db
      .insertInto('sample')
      .values(data)
      .executeTakeFirst();
}

export async function update(
   id: number,
   data: Updateable<SampleTable>,
   transaction?: any,
) {
   const conn = transaction ?? db;
   return await conn
      .updateTable('sample')
      .set(data)
      .where('id', '=', id)
      .executeTakeFirst();
}

export async function checkIfExists(
   params: {
      id?: number;
   },
   transaction?: any,
) {
   const conn = transaction ?? db;

   let query = conn.selectFrom('sample').selectAll();

   if (params.id) {
      query = query.where('id', '=', params.id);
   }

   return await query.executeTakeFirst();
}

export async function remove(id: number) {
   await db.deleteFrom('sample').where('id', '=', id).execute();
}
