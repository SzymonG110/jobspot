"use client";

import { useQuery } from "@tanstack/react-query";
import AddCompany from "#/features/company/components/AddCompany";
import Company from "#/features/company/components/Company";
import { getCompany } from "#/features/company/actions/getCompany";
import Loading from "#/features/core/components/Loading";

export default function Page() {
  const { data, isLoading } = useQuery({
    queryKey: ["getCompany"],
    queryFn: () => getCompany({}),
  });

  return (
    <div>
      <AddCompany />

      {!data || isLoading ? (
        <Loading />
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 2xl:grid-cols-6 gap-5 mt-8">
          {data.companies?.map((company) => (
            <Company key={company.id} company={company} />
          ))}
        </div>
      )}
    </div>
  );
}
