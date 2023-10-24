import React, {
  useState,
  createContext,
  useContext,
  Dispatch,
  SetStateAction,
} from "react";

type UserIdValue = {
  userInfo: { userId: string; userName: string; coins: string };
  setUserInfo: Dispatch<
    SetStateAction<{ userId: string; userName: string; coins: string }>
  >;
};

export const UserId = createContext<UserIdValue | null>(null);

export function UserIdContext({ children }: any) {
  const [userInfo, setUserInfo] = useState({
    userId: "",
    userName: "",
    coins: "",
  });
  return (
    <UserId.Provider value={{ userInfo, setUserInfo }}>
      {children}
    </UserId.Provider>
  );
}

export function GlobalStateWrapper() {
  const context: UserIdValue | null = useContext(UserId);
  return context;
}
