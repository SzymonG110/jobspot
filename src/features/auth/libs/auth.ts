import { NodePostgresAdapter } from "@lucia-auth/adapter-postgresql";
import { Lucia } from "lucia";
import { pool } from "#/features/core/lib/pg";

const adapter = new NodePostgresAdapter(pool, {
  session: "UserSession",
  user: "User",
});

export const lucia = new Lucia(adapter, {
  sessionCookie: {
    expires: false,
    attributes: {
      secure: process.env.NODE_ENV === "production",
    },
  },
  getUserAttributes: (attributes) => {
    return {
      id: attributes.id,
      email: attributes.email,
      first_name: attributes.first_name,
      last_name: attributes.last_name,
      created_at: attributes.created_at,
      updated_at: attributes.updated_at,
    };
  },
});
