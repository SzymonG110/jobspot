"use client";

import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Link,
} from "@nextui-org/react";
import { usePathname } from "next/navigation";

export function AuthCard({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const create = usePathname().includes("signup");

  return (
    <Card className="max-w-[400px]">
      <CardHeader className="flex gap-3 font-bold justify-center text-3xl">
        {create ? "Sign up" : "Login"}
      </CardHeader>
      <Divider />
      <CardBody>{children}</CardBody>
      <Divider />
      <CardFooter className="flex-col">
        {create ? "Already have an account?" : "You don't have account?"}
        <Link showAnchorIcon href={`/auth/${create ? "login" : "signup"}`}>
          {create ? "Login!" : "Create one!"}{" "}
        </Link>
      </CardFooter>
    </Card>
  );
}
