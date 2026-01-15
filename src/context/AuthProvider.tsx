import { useState } from "react";
import { AuthContext } from "./AuthContext";

type AuthContextProviderProps = {
  children: React.ReactNode;
};
export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [isLogIn, setIsLogIn] = useState(
    localStorage.getItem("token") !== null ? true : false
  );

  const logout = () => {
    setIsLogIn(false);
    localStorage.removeItem("token");
  };
  return (
    <AuthContext value={{ isLogIn, setIsLogIn, logout }}>
      {children}
    </AuthContext>
  );
};
