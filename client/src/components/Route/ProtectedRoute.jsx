import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ isAdmin, children }) => {
  const { loading, isAuthenticated, user } = useSelector((state) => state.user);
  const navigate = useNavigate();

  if (isAuthenticated === false) {
    navigate("/login");
    return null;
  }
  if (isAdmin === true && user.role !== "admin") {
    navigate("/");
    return null;
  }
  return <>{children}</>;
};

export default ProtectedRoute;
