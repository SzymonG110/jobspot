import { ClientConfig, Pool } from "pg";

export const client_config: ClientConfig = {
  connectionString: process.env.DATABASE_URL,
  ssl: !process.env.DATABASE_URL!.includes("localhost"),
};

export const pool = new Pool(client_config);
