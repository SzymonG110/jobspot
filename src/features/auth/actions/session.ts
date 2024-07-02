"use server";

import { getUserSessionData } from "#/features/auth/lib/auth";

export async function session() {
  const session = await getUserSessionData();
  return session;
}
