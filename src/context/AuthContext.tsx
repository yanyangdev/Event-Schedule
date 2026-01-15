import { createContext, useContext } from "react";
import type { AuthContextType } from "../types";

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context)
    throw new Error(
      "useAuth muss innerhalb eines AuthProvider verwendet werden!"
    );
  return context;
};
