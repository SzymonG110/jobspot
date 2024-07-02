import { useQuery } from "@tanstack/react-query";
import { session } from "#/features/auth/actions/session";

export function useUserSession() {
  const { data: userSession = null, ...rest } = useQuery({
    queryKey: ["userSession"],
    queryFn: () => session(),
    gcTime: 1000 * 60 * 5,
  });

  return { userSession, ...rest };
}
