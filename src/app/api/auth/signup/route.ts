import { z } from "zod";
import { lucia } from "#/lib/auth";
import { kysely } from "#/lib/database/kysely";
import { hashSync } from "bcrypt";

export const CreateUserSchema = z.object({
  email: z.string().trim().email(),
  password: z.string().trim().min(8).max(50),
  firstName: z.string().trim().min(2).max(50),
  lastName: z.string().trim().min(2).max(50),
});

export type CreateUser = z.infer<typeof CreateUserSchema>;

export async function POST(req: Request) {
  const body = await req.json();
  const values = CreateUserSchema.safeParse(body);
  if (!values.success)
    return new Response(JSON.stringify(values.error), { status: 400 });

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

    return new Response(JSON.stringify(session), {
      status: 200,
      headers: {
        "Set-Cookie": sessionCookie.serialize(),
      },
    });
  } catch (e) {
    return new Response("Email already used", {
      status: 400,
    });
  }
}
