"user server";

import { withAuthorization } from "#/features/auth/actions/withAuth";
import { getCompany } from "#/features/company/actions/getCompany";
import { kysely } from "#/features/core/lib/kysely";

export async function editCompany({
  companyId,
  name,
  logo,
}: {
  companyId: string;
  name?: string;
  logo?: string;
}) {
  return withAuthorization(async () => {
    const company = await getCompany({ companyId });

    if (!company.ok) {
      return company;
    }

    if (!company.companies!.length) {
      return {
        ok: false,
        error: "Company not found",
      };
    }

    try {
      const updatedCompany = await kysely
        .updateTable("Company")
        .$if(!!name, (qb) => qb.set("name", name!))
        .$if(!!logo, (qb) => qb.set("logo_buffer", logo!))
        .returningAll()
        .executeTakeFirstOrThrow();

      return {
        ok: true,
        company: updatedCompany,
      };
    } catch {
      return {
        ok: false,
        error: "Company with this name already exists",
      };
    }
  });
}
