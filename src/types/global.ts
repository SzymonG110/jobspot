import { Selectable } from "kysely";
import { lucia } from "#/auth";
import { User, UserSession } from "#/database/types";

declare module "lucia" {
  interface Register {
    Lucia: typeof lucia;
    DatabaseUserAttributes: Selectable<User>;
  }
}

export type UserSessionData = {
  user: Omit<Selectable<User>, "password_hash"> | null;
  session: Selectable<UserSession> | null;
};
