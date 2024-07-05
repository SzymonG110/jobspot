"use server";

import { cookies } from "next/headers";
import { lucia } from "#/features/auth/libs/auth";

export async function logout() {
  try {
    await lucia.invalidateSession(
      cookies().get(lucia.sessionCookieName)!.value,
    );
    return { ok: true };
  } catch {
    return { ok: false };
  }
}
