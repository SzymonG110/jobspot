"use client";

import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Link,
  User,
} from "@nextui-org/react";
import { useMutation } from "@tanstack/react-query";
import { useUserSession } from "#/features/user/hooks/useUserSession";
import { logout as logoutAuth } from "#/features/auth/actions/signOut";

export default function NavProfile() {
  const { data: user } = useUserSession();

  const { mutate: logout } = useMutation({
    mutationKey: ["userSessionLogout"],
    mutationFn: () => logoutAuth(),
    onSuccess: (data) => data.ok && (location.href = "/"),
  });

  if (!user) return null; // TODO: Add a loading skeleton

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
          href="/candidacies"
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
        <DropdownItem color="danger" onClick={() => logout()}>
          Log Out
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
