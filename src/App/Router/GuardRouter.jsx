import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";
// import { IAuthentication } from "../Interface/IAuthentication";
// import { useTSSelector } from "../Store/hooksHelper";

const RequireAuth = ({ children, requiredRoles }) => {
  // const usr = localStorage.getItem("userInfo");
  // const role = "";
  // const isLoggedIn = true;
  const role = useSelector((state) => state.user.role);
  const isLoggedIn = useSelector((state) => state.user.isLogin);
  const location = useLocation();

  if (!isLoggedIn) {
    // return <Navigate href="/login" state={{ from: location }} />;
    return <Navigate to="/sign-in"  />;
  }

  const correctRole = requiredRoles.includes(role);

  if (!correctRole) {
    return <Navigate to="/forbidden" />;
  }

  return children;
};

export default RequireAuth;
