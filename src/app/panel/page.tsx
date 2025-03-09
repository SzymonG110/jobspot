'use client';

import { authClient } from '#/features/core/auth/auth-client';
import { Button } from '#/features/core/components/ui/button';

const Panel = () => {
  const { data: orgs } = authClient.useListOrganizations();
  const { data: currentOrg } = authClient.useActiveOrganization();

  const handleCreateOrg = async () => {
    const orgName = crypto.getRandomValues(new Uint32Array(1))[0].toString(16);
    const orgSlug = orgName.toLowerCase();

    const { data: org } = await authClient.organization.create({
      name: orgName,
      slug: orgSlug,
    });

    console.log(org);
  };

  const handleSetActiveOrg = async (orgId: string) => {
    await authClient.organization.setActive({
      organizationId: orgId,
    });
  };

  return (
    <div>
      <Button onClick={handleCreateOrg}>Create Organization</Button>
      Panel
      <br />
      Current Organization: {currentOrg?.name}
      <br />
      <div className="flex flex-col gap-2">
        {orgs?.map((org, i) => (
          <div
            key={org.id}
            onClick={() => handleSetActiveOrg(org.id)}
            className="cursor-pointer"
          >
            {i + 1}. {org.name} ({org.slug})
          </div>
        ))}
      </div>
    </div>
  );
};

export default Panel;
