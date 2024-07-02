"use client";

import { useQuery } from "@tanstack/react-query";
import AddCompany from "#/features/company/components/AddCompany";
import { getCompany } from "#/features/company/actions/getCompany";

export default function Page() {
  const { data } = useQuery({
    queryKey: ["getCompany"],
    queryFn: () => getCompany(),
  });

  return (
    <div>
      <AddCompany />

      {data?.companies?.map((company) => (
        <div key={company.id}>
          <h2>{company.name}</h2>
          <img src={company.logo_buffer} alt={company.name} className="w-52" />
        </div>
      ))}
    </div>
  );
}
