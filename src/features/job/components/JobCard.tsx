"use client";

import { Image, Card, CardBody } from "@nextui-org/react";
import { IconStarFilled } from "@tabler/icons-react";
import Link from "next/link";

export function JobCard({}: {}) {
  return (
    <Card>
      <CardBody>
        <Link href="https://google.com" className="flex flex-row gap-5">
          <Image
            src="https://via.placeholder.com/150"
            alt="Job"
            width={150}
            height={150}
          />

          <div>
            <h3 className="font-bold text-3xl">Job Title</h3>
            <p className="text-md font-medium">SomeName sp. z o. o.</p>
            <p>Katowice, Poland</p>
            <p>IT</p>

            <p className="absolute bottom-2 font-semibold text-foreground-400 text-sm">
              Published: 21 may 2021
            </p>
          </div>
        </Link>
      </CardBody>

      <div className="absolute top-5 right-5">
        <IconStarFilled size={24} color={false ? "#FFD700" : "#A2A2A2"} />
      </div>
    </Card>
  );
}
