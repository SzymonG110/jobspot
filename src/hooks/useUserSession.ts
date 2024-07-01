import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { UserSessionData } from "#/types/global";

export const useUserSession = () => {
  return useQuery({
    queryKey: ["userSession"],
    queryFn: async (): Promise<UserSessionData> =>
      (await axios.get("/api/auth/session")).data,
    initialData: null,
    gcTime: 1000 * 60 * 5,
  });
};
