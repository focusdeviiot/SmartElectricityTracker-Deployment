import  { useContext, useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

interface PrivateRouteProps {
  children: JSX.Element;
  requiredRole?: string[];
}

const PrivateRoute = ({ children, requiredRole }: PrivateRouteProps) => {
  const auth = useContext(AuthContext);
  const location = useLocation();

  useEffect(() => {
    auth?.setIsCheckingToken(!auth.isCheckingToken);
  }, [location.pathname]);

  if (auth === undefined) {
    return null;
  }

  if (!auth.isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  if (auth.role === null) {
    return null;
  }

  if (requiredRole && !requiredRole.includes(auth.role as string)) {
    return <Navigate to="/unauthorized" state={{ from: location }} />;
  }

  return children;
};

export default PrivateRoute;
