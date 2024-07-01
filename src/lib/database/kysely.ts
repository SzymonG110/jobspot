import { Kysely, PostgresDialect } from "kysely";
import { pool } from "#/database/pg";
import { DB } from "#/database/types";

const db = new Kysely<DB>({
  dialect: new PostgresDialect({
    pool,
  }),
});

export { db as kysely };
