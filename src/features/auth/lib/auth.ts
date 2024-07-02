import { cache } from "react";
import { cookies } from "next/headers";
import { Lucia } from "lucia";
import { NodePostgresAdapter } from "@lucia-auth/adapter-postgresql";
import { pool } from "#/features/core/lib/pg";
import { UserSessionData } from "#/features/core/types/global";

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

async function fetchUserSessionData(
  rawSessionId?: string
): Promise<UserSessionData | null> {
  const session_id =
    rawSessionId ?? cookies().get(lucia.sessionCookieName)?.value;
  if (!session_id) {
    return null;
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
    return null;
  }

  return result;
}

export const getUserSessionData = cache(fetchUserSessionData);
