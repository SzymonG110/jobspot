import { cache } from "react";
import { cookies } from "next/headers";
import { Lucia } from "lucia";
import { NodePostgresAdapter } from "@lucia-auth/adapter-postgresql";
import { pool } from "#/database/pg";
import { UserSessionData } from "#/types/global";

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
    };
  },
});

export const userSessionData = cache(
  async (session_id?: string): Promise<UserSessionData> => {
    session_id = session_id ?? cookies().get(lucia.sessionCookieName)?.value;
    if (!session_id) {
      return {
        user: null,
        session: null,
      };
    }

    const result = await lucia.validateSession(session_id);
    try {
      if (result.session && result.session.fresh) {
        const sessionCookie = lucia.createSessionCookie(result.session.id);
        cookies().set(
          sessionCookie.name,
          sessionCookie.value,
          sessionCookie.attributes
        );
      }
      if (!result.session) {
        const sessionCookie = lucia.createBlankSessionCookie();
        cookies().set(
          sessionCookie.name,
          sessionCookie.value,
          sessionCookie.attributes
        );
      }
    } catch {}

    if (!result.user || !result.session) {
      return {
        user: null,
        session: null,
      };
    }

    return {
      user: result.user,
      session: {
        id: result.session.id,
        user_id: result.session.userId,
        expires_at: result.session.expiresAt,
      },
    };
  }
);
