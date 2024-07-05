import { Selectable } from "kysely";
import { Session } from "lucia";
import { lucia } from "#/features/auth/libs/auth";
import { User } from "#/features/core/types/database";

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
