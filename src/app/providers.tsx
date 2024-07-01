"use client";

import { NextUIProvider } from "@nextui-org/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { UserSessionProvider } from "#/contexts/auth/UserSessionProvider";

const queryClient = new QueryClient();
export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <UserSessionProvider>
        <NextUIProvider>{children}</NextUIProvider>
      </UserSessionProvider>
    </QueryClientProvider>
  );
}
