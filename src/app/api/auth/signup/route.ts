import { z } from "zod";
import { lucia } from "#/auth";
import { kysely } from "#/database/kysely";
import { hashSync } from "bcrypt";

export const CreateUserSchema = z.object({
  email: z.string().trim().email(),
  password: z.string().trim().min(8).max(50),
  first_name: z.string().trim().min(2).max(50),
  last_name: z.string().trim().min(2).max(50),
});

export type CreateUser = z.infer<typeof CreateUserSchema>;

export async function POST(req: Request) {
  const body = await req.json();
  const values = CreateUserSchema.safeParse(body);
  if (!values.success)
    return new Response(JSON.stringify(values.error), { status: 400 });

  const password_hash = hashSync(values.data.password, 10);

  try {
    const user = await kysely
      .insertInto("User")
      .values({
        email: values.data.email,
        first_name: values.data.first_name,
        last_name: values.data.last_name,
        password_hash: password_hash,
      })
      .returning("id")
      .executeTakeFirstOrThrow();

    const session = await lucia.createSession(user.id, {});
    const session_cookie = lucia.createSessionCookie(session.id);

    return new Response(JSON.stringify(session), {
      status: 200,
      headers: {
        "Set-Cookie": session_cookie.serialize(),
      },
    });
  } catch (e) {
    return new Response("Email already used", {
      status: 400,
    });
  }
}
