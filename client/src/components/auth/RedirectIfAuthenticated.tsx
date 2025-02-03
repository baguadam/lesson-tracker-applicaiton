import { ReactNode } from "react";
import { useAuth } from "../../hooks/useAuth";
import { Navigate } from "react-router";

const RedirectIfAuthenticated = ({ children }: { children: ReactNode }) => {
  const isAuthenticated = useAuth();
  console.log(isAuthenticated);

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
};

export default RedirectIfAuthenticated;
