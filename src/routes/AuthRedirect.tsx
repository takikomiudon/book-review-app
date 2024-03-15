import { ReactNode, useEffect } from "react";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const AuthRedirect = ({ children }: { children: ReactNode }) => {
  const { token } = useAuth()!;
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token, navigate]);

  return children;
};

export default AuthRedirect;
