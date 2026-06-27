import { test, describe, beforeEach } from 'node:test';
import assert from 'node:assert';
import { mockModule } from './test-utils';

const {
   repository: m,
   calls,
   reset,
} = mockModule(__dirname, '../../modules/sample/sample.repository', {
   search: async () => [],
   getById: async () => undefined,
   checkIfExists: async () => undefined,
   insert: async () => ({ insertId: '1' }),
   update: async () => ({ affectedRows: 1 }),
   changeStatus: async () => ({ affectedRows: 1 }),
   remove: async () => undefined,
});

const service: Record<
   string,
   any
> = require('../../modules/sample/sample.service');

describe('sample service', () => {
   beforeEach(reset);

   describe('search', () => {
      test('returns samples', async () => {
         const rows = [{ id: 1, code: 'SMP', area: 'Sample Area' }];
         m._search = async () => rows;
         assert.deepStrictEqual(await service.search({}), rows);
      });
   });

   describe('getById', () => {
      test('returns sample when found', async () => {
         const row = { id: 1, code: 'SMP' };
         m._getById = async () => row;
         assert.deepStrictEqual(await service.getById(1), row);
      });

      test('throws 404 when not found', async () => {
         await assert.rejects(() => service.getById(999), {
            statusCode: 404,
         });
      });
   });

   describe('insert', () => {
      test('inserts when code is unique', async () => {
         await service.insert({ code: 'ABC' });
         assert.strictEqual(calls.insert[0].code, 'ABC');
      });

      test('throws 400 when code exists', async () => {
         m._checkIfExists = async () => ({ id: 1 });
         await assert.rejects(() => service.insert({ code: 'ABC' }), {
            statusCode: 400,
         });
      });
   });

   describe('update', () => {
      test('updates when code unchanged', async () => {
         m._getById = async () => ({ id: 1, code: 'ABC' });
         await service.update({ id: 1, code: 'ABC' });
         assert.strictEqual(calls.checkIfExists.length, 0);
      });

      test('checks duplicate when code changes', async () => {
         m._getById = async () => ({ id: 1, code: 'OLD' });
         await service.update({ id: 1, code: 'NEW' });
         assert.deepStrictEqual(calls.checkIfExists[0], {
            code: 'NEW',
         });
      });

      test('throws 400 on duplicate code', async () => {
         m._getById = async () => ({ id: 1, code: 'OLD' });
         m._checkIfExists = async () => ({ id: 2 });
         await assert.rejects(
            () => service.update({ id: 1, code: 'EXISTING' }),
            { statusCode: 400 },
         );
      });
   });

   describe('changeStatus', () => {
      test('changes status when sample exists', async () => {
         m._getById = async () => ({ id: 1 });
         await service.changeStatus(1, 'disabled');
         assert.deepStrictEqual(calls.changeStatus[0], [
            1,
            'disabled',
         ]);
      });

      test('throws 404 when not found', async () => {
         await assert.rejects(
            () => service.changeStatus(999, 'disabled'),
            { statusCode: 404 },
         );
      });
   });

   describe('remove', () => {
      test('removes sample', async () => {
         await service.remove(1);
         assert.strictEqual(calls.remove[0], 1);
      });
   });
});
