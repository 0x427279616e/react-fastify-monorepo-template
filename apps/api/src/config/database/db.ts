import { Kysely, MysqlDialect } from 'kysely';
import { createPool } from 'mysql2';
import type { Pool } from 'mysql2';
import { Database } from './types';

export const pool: Pool = createPool({
  host: process.env.MYSQL_HOST as string,
  user: process.env.MYSQL_USER as string,
  password: process.env.MYSQL_PASSWORD as string,
  database: process.env.MYSQL_DATABASE as string,

  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

type DbLogger = {
  info: (obj: unknown, msg?: string) => void;
  error: (obj: unknown, msg?: string) => void;
};

let logger: DbLogger = {
  info: () => {},
  error: () => {},
};

export function setDbLogger(l: DbLogger) {
  logger = l;
}

export const db = new Kysely<Database>({
  dialect: new MysqlDialect({
    pool,
  }),
  log(event) {
    if (event.level === 'query') {
      logger.info(
        {
          query: event.query.sql,
          params: event.query.parameters,
          durationMs: event.queryDurationMillis,
        },
        'db query',
      );
    }
    if (event.level === 'error') {
      logger.error(
        {
          error: event.error,
          query: event.query.sql,
          params: event.query.parameters,
        },
        'db error',
      );
    }
  },
});
