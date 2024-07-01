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
import NavProfile from "#/components/shared/navbar/Profile";
import { useUserSession } from "#/contexts/auth/UserSessionProvider";

export default function Navbar() {
  const user = useUserSession();

  return (
    <NextUiNavbar className="absolute top-0">
      <NavbarContent>
        <NavbarBrand as={Link} href="/" className="gap-2 text-black">
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
          {user.user && user.session ? (
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
