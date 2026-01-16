import { Navigate, Outlet } from "react-router";

import { useAuth } from "../context";

const ProtectedLayout = () => {
  const { isLogIn } = useAuth();
  if (!isLogIn) {
    return <Navigate to="/signin" replace />;
  }
  return <Outlet />;
};

export default ProtectedLayout;
