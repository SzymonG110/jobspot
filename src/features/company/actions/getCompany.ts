"use server";

import { getUserSessionData } from "#/features/auth/lib/auth";
import { kysely } from "#/features/core/lib/kysely";

export async function getCompany(rawUserId?: string) {
  const session = await getUserSessionData();
  if (!session) {
    return {
      ok: false,
      error: "Unauthorized",
    };
  }

  const userId = rawUserId ?? session.user.id;

  try {
    const companies = await kysely
      .selectFrom("CompanyUser")
      .where("CompanyUser.user_id", "=", userId)
      .innerJoin("Company", "Company.id", "CompanyUser.company_id")
      .select([
        "Company.id",
        "Company.name",
        "Company.logo_buffer",
        "Company.created_at",
      ])
      .execute();

    return {
      ok: true,
      companies,
    };
  } catch {
    return {
      ok: false,
      error: "Error fetching companies",
    };
  }
}
