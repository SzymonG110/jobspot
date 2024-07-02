import { Kysely, PostgresDialect } from "kysely";
import { pool } from "#/features/core/lib/pg";
import { DB } from "#/features/core/types/database";

const db = new Kysely<DB>({
  dialect: new PostgresDialect({
    pool,
  }),
});

export { db as kysely };
