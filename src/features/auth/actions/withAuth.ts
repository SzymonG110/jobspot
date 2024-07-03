"user server";

import { getUserSessionData } from "#/features/auth/lib/auth";
import { UserSessionData } from "#/features/core/types/global";

export async function withAuthorization<T>(
  callback: (session: UserSessionData) => T,
) {
  const session = await getUserSessionData();
  if (!session) {
    return {
      ok: false,
      error: "Unauthorized",
    };
  }

  return callback(session);
}
