import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { Route } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";

function PrivateRoute({ children }) {
  console.log("Hi! there from Private Route");
  const { user } = useContext(AuthContext);
  return user ? children : <Navigate to="/login" />;
}
export default PrivateRoute;
