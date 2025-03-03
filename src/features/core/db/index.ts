import { Pool } from 'pg';
import { Kysely, PostgresDialect } from 'kysely';

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL!,
});

const dialect = new PostgresDialect({
  pool: pool,
});

interface Database {}

export const db = new Kysely<Database>({
  dialect,
});
