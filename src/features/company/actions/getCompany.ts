"use server";

import { getUserSessionData } from "#/features/auth/lib/auth";
import { kysely } from "#/features/core/lib/kysely";

export async function getCompany({
  rawUserId,
  companyId,
}: {
  rawUserId?: string;
  companyId?: string;
}) {
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
      .$if(!!companyId, (qb) =>
        qb.where("CompanyUser.company_id", "=", companyId!),
      )
      .innerJoin("Company", "Company.id", "CompanyUser.company_id")
      .selectAll("Company")
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
