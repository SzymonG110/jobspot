import { Selectable } from "kysely";
import { lucia } from "#/features/auth/lib/auth";
import { User } from "#/features/core/types/database";
import { Session } from "lucia";

declare module "lucia" {
  interface Register {
    Lucia: typeof lucia;
    DatabaseUserAttributes: Selectable<User>;
  }
}

export type UserSessionData = {
  user: Omit<Selectable<User>, "password_hash">;
  session: Session;
} | null;
