import { createContext, useEffect, useState, ReactNode } from "react";
import { checkToken } from "../api/auth";
import Loading from "../pages/Loading";

interface AuthContextProps {
  isAuthenticated: boolean;
  role: string | null;
  isCheckingToken: boolean;
  userName: string | null;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  setRole: (role: string | null) => void;
  setIsCheckingToken: (isCheckingToken: boolean) => void;
}

export const AuthContext = createContext<AuthContextProps | undefined>(
  undefined
);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [userName, setUserName] = useState<string | null>(null); 
  const [role, setRole] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [delayLoading, setDelayLoading] = useState<boolean>(true);
  const [isCheckingToken, setIsCheckingToken] = useState<boolean>(true);

  useEffect(() => {
    
    const verifyToken = async () => {
      setLoading(true);
      const valid = await checkToken();
      setIsAuthenticated(valid);
      if (valid) {
        const userRole = localStorage.getItem("user_role");
        const user_name = localStorage.getItem("user_name");
        setRole(userRole);
        setUserName(user_name);
      }

      setTimeout(() => {
        setDelayLoading(false);
        setTimeout(() => {
          setLoading(false);
        }, 200);
      }, 500);
    };

    verifyToken();
  }, [isAuthenticated]);

  useEffect(() => {
    if (!isAuthenticated) return; 
    const verifyToken = async () => {
      console.log("verifying token");
      const valid = await checkToken();
      setIsAuthenticated(valid);
      if (valid) {
        const userRole = localStorage.getItem("user_role");
        setRole(userRole);
      }
    };

    verifyToken();
  }, [isCheckingToken]);

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, role, isCheckingToken, userName, setIsAuthenticated, setRole, setIsCheckingToken }}
    >
      <div className="">
        <div
          className={`transition-opacity duration-200 ${
            delayLoading ? "opacity-100" : "opacity-0"
          }`}
        >
          {loading ? <Loading /> : null}
        </div>
        <div
          className={`transition-opacity duration-500 ${
            !loading ? "opacity-100" : "opacity-0"
          }`}
        >
          {!loading ? children : null}
        </div>
      </div>
    </AuthContext.Provider>
  );
};