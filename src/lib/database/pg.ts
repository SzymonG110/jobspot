import { ClientConfig, Pool } from "pg";

export const clientConfig: ClientConfig = {
  connectionString: process.env.DATABASE_URL,
  ssl: !process.env.DATABASE_URL!.includes("localhost"),
};

export const pool = new Pool(clientConfig);
