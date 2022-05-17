import { Navigate, useLocation } from "react-router-dom";
import { FC  } from "react";
// import { IAuthentication } from "../Interface/IAuthentication";
// import { useTSSelector } from "../Store/hooksHelper";

const RequireAuth = ({ children, requiredRoles }) => {
  // const usr = localStorage.getItem("userInfo");
  const role = "";
  const isLoggedIn = true;
  // const role = useTSSelector((state) => state.user.role);
  // const isLoggedIn = useTSSelector((state) => state.user.isLogged);
  let location = useLocation();

  if (!isLoggedIn) {
    // return <Navigate href="/login" state={{ from: location }} />;
    return <Navigate to="/sign-in"  />;
  }

  const correctRole = requiredRoles.includes(role);

  if (!correctRole) {
    return <Navigate to="/forbid" />;
  }

  return children;
};

export default RequireAuth;
