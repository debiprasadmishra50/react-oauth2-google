import { get, patch, post } from "../../api/auth";
import { useSnackbarContext } from "../../components/snackbar/context";
import React, { memo, useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router";
import { getLocalStorage, setLocalStorage } from "../../utils/localstorage";
import { AUTHENTICATION } from "./constants";
// context
import AuthContext from "./context";

interface AuthProviderProps {
  children: React.ReactNode;
}

function AuthProvider({ children }: AuthProviderProps) {
  const [userData, setUserData] = useState<any>();
  const [authStatus, setAuthStatus] = useState<AUTHENTICATION>(AUTHENTICATION.NOT_DETERMINED);
  const [isLoading, setLoader] = useState<boolean>(false);
  const {
    ToastService: { showToast },
  } = useSnackbarContext();

  const navigate = useNavigate();

  const isSeller = (user?: any) => {
    const userData = user || getLocalStorage("user");
    if (!userData) return false;
    const { roles } = userData;
    if (roles?.includes("seller")) return true;
    return false;
  };

  const isAccountActive = () => {
    const userData = getLocalStorage("user");
    const { active } = userData;
    if (active) return true;
    return false;
  };

  const login = async (body: any) => {
    try {
      setLoader(true);
      const payload = { ...body, email: body.email.toLowerCase() };
      const response: any = await post("/auth/login", payload);
      if (response.status !== "success") throw response;
      setLocalStorage("token", response.token);
      setLocalStorage("user", response.user);
      setUserData(response.user);
      setAuthStatus(AUTHENTICATION.SUCCESS);
      // showToast(true, 'success', 'Login success!');
      setLoader(false);
      window.location.reload();
      return true;
    } catch (error: any) {
      setLoader(false);
      showToast(true, "error", error.message);
      return false;
    }
  };

  const signup = async (body: any) => {
    try {
      setLoader(true);
      const payload = { ...body, email: body.email.toLowerCase() };
      const response: any = await post("/auth/signup", payload);
      if (response.status !== "success") throw response;
      setLocalStorage("token", response.token);
      setLocalStorage("user", response.user);
      setUserData(response.user);
      setAuthStatus(AUTHENTICATION.SUCCESS);
      setLoader(false);
      // showToast(true, 'success', 'Signup success!');
      window.location.reload();
      return true;
    } catch (error: any) {
      setLoader(false);
      showToast(true, "error", error.message);
      return false;
    }
  };

  const activate = useCallback(async (token: string) => {
    try {
      const response: any = await patch(`/auth/activate/${token}`);
      if (response.status !== "success") throw response;
      const userData = getLocalStorage("user");
      userData.active = true;
      setLocalStorage("user", userData);
      showToast(true, "success", "Account activated successfully");
      navigate("home");
    } catch (error: any) {
      if (error.statusCode === 400) {
        showToast(true, "error", "Your account is already been activated!");
        navigate("/home");
        return;
      }
      showToast(true, "error", error.message);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const forgotPassword = async (body: any) => {
    try {
      setLoader(true);
      const payload = { email: body.email.toLowerCase() };
      const response: any = await post("/auth/forgot-password", payload);
      if (response.status !== "success") throw response;
      setLoader(false);
      showToast(true, "success", `Password reset email sent successfully to ${body.email}.`);
      return true;
    } catch (error: any) {
      setLoader(false);
      showToast(true, "error", error.message);
      return false;
    }
  };

  const resetPassword = async (body: any) => {
    try {
      setLoader(true);
      const response: any = await patch(`/auth/reset-password/${body.token}`, body);
      if (response.status !== "success") throw response;
      setLoader(false);
      showToast(true, "success", "Password reset successful. Please login again!");
      navigate("login");
    } catch (error: any) {
      if (error.statusCode === 400) {
        showToast(true, "error", "The link is expired, please resend the reset link by entering your email!");
        navigate("/forgot-password");
        setLoader(false);
        return;
      }
      setLoader(false);
      showToast(true, "error", error.message);
    }
  };

  const verifyToken = useCallback(async (token: string) => {
    try {
      setLoader(true);
      const response: any = await get(`/auth/verify/${token}`);
      if (response.status !== "success") throw response;
      setLoader(false);
    } catch (error: any) {
      if (error.statusCode === 400) {
        showToast(true, "error", "The link is expired, please resend the reset link by entering your email!");
        navigate("/forgot-password");
        setLoader(false);
        return;
      }
      setLoader(false);
      showToast(true, "error", error.message);
    }
  }, []);

  const googleLogin = useCallback(
    async (endpoint: any) => {
      console.log("Entered the google callback");

      try {
        setLoader(true);
        const response: any = await get(endpoint);
        if (response.status !== "success") throw response;

        // console.log({ user: response.user });

        // localStorage.setItem("token-raw", response.token);
        // localStorage.setItem("user-raw", JSON.stringify(response.user));

        setLocalStorage("token", response.token);
        setLocalStorage("user", response.user);
        setLoader(false);
        // showToast(true, 'success', 'Login success!');
        setAuthStatus(AUTHENTICATION.SUCCESS);
        navigate("/home", { replace: true });
        // window.location.reload();
        // navigate('home');
      } catch (error: any) {
        setLoader(false);
        navigate("/login", { replace: true });
        showToast(true, "error", error.message);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const logout = async () => {
    try {
      setLoader(true);
      await get("/auth/logout");
      localStorage.removeItem("token");
      localStorage.removeItem("users");
      setAuthStatus(AUTHENTICATION.FAILURE);
      setLoader(false);
      // showToast(true, 'success', 'User Logout successful!', 'center',"top",1000);
      window.location.reload();
    } catch (error) {
      setLoader(false);
    }
  };

  useEffect(() => {
    const token = getLocalStorage("token");
    if (token) setAuthStatus(AUTHENTICATION.SUCCESS);
    if (!token) setAuthStatus(AUTHENTICATION.FAILURE);

    // if(!token) {
    //   let loggedOutUserDetails = localStorage.getItem("logged_out_user");
    //   if(!(!!loggedOutUserDetails)) {
    //     localStorage.setItem("logged_out_user", JSON.stringify({
    //       region: 'united-states',
    //       language: 'en',
    //       currency: 'USD',
    //     }));
    //   }
    // }
  }, []);

  useEffect(() => {
    //for logged users who haven't set their details yet, below given details should be default for them.
    if (authStatus !== AUTHENTICATION.SUCCESS) {
      let loggedOutUserDetails = localStorage.getItem("logged_out_user");
      if (!!!loggedOutUserDetails) {
        localStorage.setItem(
          "logged_out_user",
          JSON.stringify({
            region: "united-states",
            language: "en",
            currency: "USD",
          })
        );
      }
    }
  }, [authStatus, AUTHENTICATION]);

  const setAppAuthStatus = (status: AUTHENTICATION) => {
    setAuthStatus(status);
    if (status === AUTHENTICATION.FAILURE) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    }
  };

  const values = useMemo(
    () => ({
      login,
      signup,
      forgotPassword,
      resetPassword,
      googleLogin,
      logout,
      activate,
      authStatus,
      isSeller,
      setAppAuthStatus,
      isAccountActive,
      isLoading,
      verifyToken,
    }),
    [googleLogin, verifyToken, userData, authStatus, isLoading]
  );

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
}

export default memo(AuthProvider);
