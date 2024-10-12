/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect } from "react";
import { userContext } from "./App";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();

  const { isUserLoggedIn } = useContext(userContext);
  useEffect(() => {
    if (!isUserLoggedIn) navigate("/login");
  }, [navigate]);

  return children;
};

export default ProtectedRoute;
