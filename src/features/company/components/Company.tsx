import { Card, CardBody, CardFooter, Button, Image } from "@nextui-org/react";
import { getCompany } from "#/features/company/actions/getCompany";
import { Entered } from "#/features/core/types/generic";

export default function Company({
  company,
}: {
  company: Entered<Awaited<ReturnType<typeof getCompany>>["companies"]>[0];
}) {
  return (
    <div className="flex">
      <Card isFooterBlurred>
        <CardBody className="p-0">
          <Image
            alt={company.name}
            className="rounded-lg"
            height={200}
            src={company.logo_buffer}
            width={200}
          />
        </CardBody>
        <CardFooter className="justify-between items-center p-2">
          <p className="text-sm font-medium text-gray-800">{company.name}</p>
          <Button color="primary" size="sm">
            Edit
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
