import type { ColumnType } from "kysely";
export type Generated<T> = T extends ColumnType<infer S, infer I, infer U>
  ? ColumnType<S, I | undefined, U>
  : ColumnType<T, T | undefined, T>;
export type Timestamp = ColumnType<Date, Date | string, Date | string>;

export type User = {
    id: Generated<string>;
    email: string;
    password_hash: string;
    first_name: string;
    last_name: string;
};
export type UserSession = {
    id: string;
    expires_at: Timestamp;
    user_id: string;
};
export type DB = {
    User: User;
    UserSession: UserSession;
};
