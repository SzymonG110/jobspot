import { z } from "zod";
import { lucia } from "#/auth";
import { kysely } from "#/database/kysely";
import { compareSync } from "bcrypt";

export const LoginUserSchema = z.object({
  email: z.string().trim().email(),
  password: z.string().trim().min(8).max(50),
});

export type LoginUser = z.infer<typeof LoginUserSchema>;

export async function POST(req: Request) {
  const body = await req.json();
  const values = LoginUserSchema.safeParse(body);
  if (!values.success)
    return new Response(JSON.stringify(values.error), { status: 400 });

  try {
    const user = await kysely
      .selectFrom("User")
      .where("email", "=", values.data.email)
      .selectAll()
      .executeTakeFirstOrThrow();

    const password_verified = compareSync(body.password, user.password_hash);
    if (!password_verified) throw new Error("Password incorrect");

    const session = await lucia.createSession(user.id, {});
    const session_cookie = lucia.createSessionCookie(session.id);

    return new Response(JSON.stringify(session), {
      status: 200,
      headers: {
        "Set-Cookie": session_cookie.serialize(),
      },
    });
  } catch (e) {
    console.log(e);
    return new Response("Email or password incorrect", {
      status: 400,
    });
  }
}
