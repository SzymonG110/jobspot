"use server";

import { getUserSessionData } from "#/features/auth/lib/auth";
import { kysely } from "#/features/core/lib/kysely";
import {
  AddCompany,
  AddCompanySchema,
} from "#/features/company/schemas/addCompany";

export async function createCompany(data: AddCompany) {
  const session = await getUserSessionData();
  if (!session) {
    return {
      ok: false,
      error: "Unauthorized",
    };
  }

  // TODO: Fix this
  // const values = AddCompanySchema.safeParse(data);
  // if (!values.success) {
  //   return {
  //     ok: false,
  //     error: values.error,
  //   };
  // }

  try {
    const { id } = await kysely.transaction().execute(async (trx) => {
      const company = await trx
        .insertInto("Company")
        .values(data)
        .returning("id")
        .executeTakeFirstOrThrow();

      await trx
        .insertInto("CompanyUser")
        .values({
          company_id: company.id,
          user_id: session.user.id,
        })
        .executeTakeFirstOrThrow();

      return company;
    });

    return {
      ok: true,
      id,
    };
  } catch {
    return {
      ok: false,
      error: "Company with that name already exists",
    };
  }
}
