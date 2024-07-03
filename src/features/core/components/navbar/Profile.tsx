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
import { logout as logoutAuth } from "#/features/auth/actions/signOut";
import { useUserSession } from "#/features/user/hooks/useUserSession";

export default function NavProfile() {
  const { userSession, isLoading } = useUserSession();

  const { mutate: logout } = useMutation({
    mutationKey: ["userSessionLogout"],
    mutationFn: () => logoutAuth(),
    onSuccess: (data) => data.ok && (location.href = "/"),
  });

  if (!userSession || isLoading) {
    return <NavProfileSkeleton />;
  }

  return (
    <Dropdown>
      <DropdownTrigger>
        <div>
          <User
            as="button"
            avatarProps={{
              isBordered: true,
              // src: userSession.avatar,
            }}
            className="transition-transform font-bold hidden sm:flex"
            name={`${userSession.user.first_name} ${userSession.user.last_name}`}
            description={userSession.user.email}
          />

          <User
            as="button"
            avatarProps={{
              isBordered: true,
              // src: userSession.avatar,
            }}
            className="transition-transform font-bold sm:hidden"
            name=""
          />
        </div>
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

export function NavProfileSkeleton() {
  return (
    <div className="animate-pulse flex items-center space-x-4">
      <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
      <div className="hidden sm:block">
        <div className="w-32 h-4 bg-gray-300 rounded-md mb-2"></div>
        <div className="w-48 h-3 bg-gray-300 rounded-md"></div>
      </div>
    </div>
  );
}
