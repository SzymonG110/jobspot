"use server";

import { getUserSessionData } from "#/features/auth/libs/fetchSession";

export async function session() {
  const session = await getUserSessionData();
  return session;
}
