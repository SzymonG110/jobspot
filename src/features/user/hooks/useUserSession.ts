import { useQuery } from "@tanstack/react-query";
import { session } from "#/features/auth/actions/session";

const cacheTime = 1000 * 60 * 5;

export function useUserSession() {
  const { data: userSession = null, ...rest } = useQuery({
    queryKey: ["userSession"],
    queryFn: () => session(),
    gcTime: cacheTime,
  });

  return { userSession, ...rest };
}
