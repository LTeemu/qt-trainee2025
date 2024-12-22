import { Navigate } from "react-router-dom";
import { ProtectedRouteProps } from "../types";

const ProtectedRoute = ({ element }: ProtectedRouteProps) => {
  const loggedUser = localStorage.getItem("logged_user");
  return loggedUser ? element : <Navigate to="/login" />;
};

export default ProtectedRoute;
