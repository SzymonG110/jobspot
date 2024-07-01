"use client";

import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Link,
  User,
} from "@nextui-org/react";
import { useUserSession } from "#/contexts/auth/UserSessionProvider";

export default function NavProfile() {
  const user = useUserSession();
  if (!user.user || !user.session) return null; // TODO: Add a loading skeleton

  return (
    <Dropdown>
      <DropdownTrigger>
        <User
          as="button"
          avatarProps={{
            isBordered: true,
            // src: user.avatar,
          }}
          className="transition-transform font-bold"
          name={`${user.user.first_name} ${user.user.last_name}`}
          description={user.user.email}
        />
      </DropdownTrigger>

      <DropdownMenu aria-label="User Actions" variant="flat">
        <DropdownItem
          as={Link}
          href="/companies"
          className="text-black dark:text-white"
        >
          Companies
        </DropdownItem>
        <DropdownItem
          as={Link}
          href="/candidates"
          className="text-black dark:text-white"
        >
          My Candidates
        </DropdownItem>
        <DropdownItem
          as={Link}
          href="/settings"
          color="primary"
          className="text-black dark:text-white"
        >
          User Settings
        </DropdownItem>
        <DropdownItem color="danger" onClick={() => user.logout()}>
          Log Out
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
