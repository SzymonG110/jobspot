import type { ColumnType } from "kysely";
export type Generated<T> =
  T extends ColumnType<infer S, infer I, infer U>
    ? ColumnType<S, I | undefined, U>
    : ColumnType<T, T | undefined, T>;
export type Timestamp = ColumnType<Date, Date | string, Date | string>;

export type Company = {
  id: Generated<string>;
  name: string;
  logo_buffer: string;
  created_at: Generated<Timestamp>;
  updated_at: Generated<Timestamp>;
};
export type CompanyUser = {
  company_id: string;
  user_id: string;
};
export type User = {
  id: Generated<string>;
  email: string;
  password_hash: string;
  first_name: string;
  last_name: string;
  created_at: Generated<Timestamp>;
  updated_at: Generated<Timestamp>;
};
export type UserSession = {
  id: string;
  expires_at: Timestamp;
  user_id: string;
};
export type DB = {
  Company: Company;
  CompanyUser: CompanyUser;
  User: User;
  UserSession: UserSession;
};
