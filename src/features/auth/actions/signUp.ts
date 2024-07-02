"use server";

import { hashSync } from "bcrypt";
import { cookies } from "next/headers";
import { lucia } from "#/features/auth/lib/auth";
import { kysely } from "#/features/core/lib/kysely";
import { CreateUserSchema, CreateUser } from "#/features/auth/schemas/signup";

export async function signUp(data: CreateUser) {
  const values = CreateUserSchema.safeParse(data);
  if (!values.success) return { ok: false, error: values.error };

  const passwordHash = hashSync(values.data.password, 10);

  try {
    const user = await kysely
      .insertInto("User")
      .values({
        email: values.data.email,
        first_name: values.data.firstName,
        last_name: values.data.lastName,
        password_hash: passwordHash,
      })
      .returning("id")
      .executeTakeFirstOrThrow();

    const session = await lucia.createSession(user.id, {});
    const sessionCookie = lucia.createSessionCookie(session.id);

    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes
    );

    return { ok: true };
  } catch {
    return { ok: false, error: "Email already in use" };
  }
}
