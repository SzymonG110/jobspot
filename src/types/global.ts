import { Selectable } from "kysely";
import { lucia } from "#/auth";
import { User } from "#/database/types";
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
