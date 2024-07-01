"use client";

import { Image, Card, CardBody } from "@nextui-org/react";
import { IconStarFilled } from "@tabler/icons-react";

export default function JobCard({}: {}) {
  return (
    <Card>
      <CardBody className="relative flex flex-row gap-5">
        <Image
          src="https://via.placeholder.com/150"
          alt="Job"
          width={150}
          height={150}
        />
        <div className="flex flex-col">
          <h3 className="font-bold text-3xl">Job Title</h3>
          <p className="text-md font-medium">SomeName sp. z o. o.</p>
          <p>Katowice, Poland</p>
          <p>IT</p>

          <div className="absolute bottom-2 font-semibold text-foreground-400 text-sm">
            Published: 21 may 2021
          </div>
        </div>

        <div className="absolute top-5 right-5">
          <IconStarFilled size={24} color={false ? "#FFD700" : "#A2A2A2"} />
        </div>
      </CardBody>
    </Card>
  );
}
