"use client";

import {
  Navbar as NextUiNavbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
  Image,
} from "@nextui-org/react";
import NavProfile from "#/features/core/components/navbar/Profile";
import { useUserSession } from "#/features/user/hooks/useUserSession";

export default function Navbar() {
  const { data: user } = useUserSession();

  return (
    <NextUiNavbar>
      <NavbarContent>
        <NavbarBrand
          as={Link}
          href="/"
          className="gap-2 text-black dark:text-white"
        >
          <Image
            src="/img/briefcase.svg"
            alt="JobSpot"
            width={30}
            height={30}
            className="rounded-none"
          />
          <p className="font-bold text-inherit">JobSpot</p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem>
          {user ? ( // if loading is true, show loading spinner
            <NavProfile />
          ) : (
            <Button as={Link} color="primary" href="/auth/login" variant="flat">
              Login
            </Button>
          )}
        </NavbarItem>
      </NavbarContent>
    </NextUiNavbar>
  );
}
