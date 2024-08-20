import { AUTHENTICATION } from "../providers/AuthProvider/constants";
import { useAuthContext } from "../providers/AuthProvider/context";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const AuthRoute = ({ children }: { children: JSX.Element }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const { authStatus } = useAuthContext();

  useEffect(() => {
    if (authStatus === AUTHENTICATION.FAILURE) {
      navigate("/login", { state: { from: location.pathname } });
    }
  }, [authStatus]);

  return children;
};

export default AuthRoute;
