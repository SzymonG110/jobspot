import { useQuery } from "@tanstack/react-query";
import { session } from "#/features/auth/actions/session";

export function useUserSession() {
  return useQuery({
    queryKey: ["userSession"],
    queryFn: () => session(),
    initialData: null,
    gcTime: 1000 * 60 * 5,
  });
}
