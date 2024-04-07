import React, { ReactNode, createContext, useContext, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import useLocalStorage from "./useLocalStorage";

interface AuthContextType {
  token: string | null;
  login: (token: string | null) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  // const [token, setToken] = useLocalStorage("token", '');
  const [token, setToken] = useState<string | null>(null);
  const navigate = useNavigate();

  const login = async (newToken: string | null) => {
    setToken(newToken);
    navigate("/");
  };

  const logout = () => {
    setToken(null);
    navigate("/login", { replace: true });
  };

  const value = useMemo(() => ({ token, login, logout }), [token]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

const useAuth = () => {
  return useContext(AuthContext);
};

export default useAuth;
