import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import { loginRequest } from "../api/authApi";
import type { User } from "../types";

interface AuthValue { user: User | null; login: (email: string, password: string) => Promise<User>; logout: () => void; }
const AuthContext = createContext<AuthValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    try { return JSON.parse(localStorage.getItem("ailyt_user") || "null"); } catch { return null; }
  });
  const value = useMemo<AuthValue>(() => ({
    user,
    login: async (email, password) => {
      const data = await loginRequest(email, password);
      localStorage.setItem("ailyt_access_token", data.accessToken);
      localStorage.setItem("ailyt_user", JSON.stringify(data.user));
      setUser(data.user);
      return data.user;
    },
    logout: () => { localStorage.removeItem("ailyt_access_token"); localStorage.removeItem("ailyt_user"); setUser(null); }
  }), [user]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const value = useContext(AuthContext);
  if (!value) throw new Error("useAuth must be used inside AuthProvider");
  return value;
};
