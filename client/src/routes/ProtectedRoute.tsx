import { Navigate, Outlet } from "react-router-dom";
import { isAuthenticated } from "../utils/_utils";

const ProtectedRoute = () => {
  return isAuthenticated() ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
