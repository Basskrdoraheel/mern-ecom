import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useSelector((state) => state.user);
  const navigate = useNavigate();

  if (isAuthenticated === false) {
    navigate("/login");
    return null;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
