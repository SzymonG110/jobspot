"use server";

import { compareSync } from "bcrypt";
import { cookies } from "next/headers";
import { lucia } from "#/features/auth/lib/auth";
import { kysely } from "#/features/core/lib/kysely";
import { SignInUserSchema, SignInUser } from "#/features/auth/schemas/login";

export async function signIn(data: SignInUser) {
  const values = SignInUserSchema.safeParse(data);
  if (!values.success) return { ok: false, error: values.error };

  try {
    const user = await kysely
      .selectFrom("User")
      .where("email", "=", values.data.email)
      .selectAll()
      .executeTakeFirstOrThrow();

    const isPasswordVerified = compareSync(data.password, user.password_hash);
    if (!isPasswordVerified) throw new Error("Password incorrect");

    const session = await lucia.createSession(user.id, {});
    const sessionCookie = lucia.createSessionCookie(session.id);

    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes
    );

    return { ok: false, session };
  } catch {
    return { ok: false, error: "Email or password incorrect" };
  }
}