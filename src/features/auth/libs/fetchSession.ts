import { cookies } from "next/headers";
import { cache } from "react";
import { lucia } from "#/features/auth/libs/auth";
import { UserSessionData } from "#/features/core/types/global";

async function fetchUserSessionData(
  rawSessionId?: string,
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
        sessionCookie.attributes,
      );
    }

    if (!result.session) {
      const sessionCookie = lucia.createBlankSessionCookie();
      cookies().set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes,
      );
    }
  } catch {}

  if (!result.user || !result.session) {
    return null;
  }

  return result;
}

export const getUserSessionData = cache(fetchUserSessionData);
