import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { useEffect } from "react";
import { jwtDecode } from "jwt-decode";

const RequireAuth = ({ allowedRoles }) => {
  const auth = JSON.parse(localStorage.getItem("Auth"));
  if (!localStorage.getItem("Token")) {
    return <Navigate to="/login" />;
  }
  if (allowedRoles?.includes(auth.role) || !allowedRoles) {
    return <Outlet />;
  } else {
    return <Navigate to="/unauthorized" />;
  }
};

export default RequireAuth;
