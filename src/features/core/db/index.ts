import { Pool } from 'pg';
import { Kysely, PostgresDialect } from 'kysely';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL!,
});

const dialect = new PostgresDialect({
  pool: pool,
});

interface Database {}

const db = new Kysely<Database>({
  dialect,
});

export { db };
