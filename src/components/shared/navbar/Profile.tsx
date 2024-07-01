"use client";

import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  User,
} from "@nextui-org/react";
import { useUserSession } from "#/contexts/auth/UserSessionProvider";

export default function NavProfile() {
  const user = useUserSession()
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
        <DropdownItem>Companies</DropdownItem>
        <DropdownItem>My Candidates</DropdownItem>
        <DropdownItem color="danger" onClick={() => user.logout()}>
          Log Out
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
