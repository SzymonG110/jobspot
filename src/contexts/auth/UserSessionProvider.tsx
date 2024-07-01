import { createContext, useContext, useEffect, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { UserSessionData } from "#/types/global";
import { revalidatePath } from "next/cache";

type UserSessionContextType = UserSessionData & {
  logout: () => void;
  is_loading: boolean;
};

const UserSessionContext = createContext({
  user: null,
  session: null,
} as UserSessionContextType);

export function UserSessionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user_session, setUserSession] = useState<UserSessionData>({
    user: null,
    session: null,
  });

  const { data: user_session_query, isLoading: is_loading } = useQuery({
    queryKey: ["user_session"],
    queryFn: () => axios.get("/api/auth/session"),
  });

  const { mutate: logoutMutate } = useMutation({
    mutationFn: () => {
      return axios.get("/api/auth/logout");
    },
    onSuccess: (data) => {
      if (data.status === 200) location.href = "/";
    },
  });

  const fetchSession = async () => {
    const user_session_data = await user_session_query?.data;
    setUserSession(user_session_data);
  };

  useEffect(() => {
    (async () => await fetchSession())();
  }, [fetchSession]);

  return (
    <UserSessionContext.Provider
      value={{ ...user_session, is_loading, logout: logoutMutate }}
    >
      {children}
    </UserSessionContext.Provider>
  );
}

export const useUserSession = () => useContext(UserSessionContext);
