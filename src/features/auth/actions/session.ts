"use server";

import { cookies } from "next/headers";
import { lucia, getUserSessionData } from "#/features/auth/lib/auth";

export async function session() {
  const session = await getUserSessionData(
    cookies().get(lucia.sessionCookieName)?.value
  );
  return session;
}
