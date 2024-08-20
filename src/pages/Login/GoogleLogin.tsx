import { CircularProgress } from "@mui/material";
import { H6 } from "../../components/Typography";
import { useAuthContext } from "../../providers/AuthProvider/context";
import React, { memo, useEffect } from "react";
import { GoogleContainer } from "./styles";
import { setLocalStorage } from "../../utils/localstorage";

function GoogleLogin() {
  const { pathname, search } = window.location;
  const endpoint = `${pathname}${search}`;
  const { googleLogin } = useAuthContext();

  useEffect(() => {
    if (googleLogin) {
      console.log("ENDPOINT:", endpoint);

      googleLogin(endpoint);
    }
  }, [endpoint, googleLogin]);
  return (
    <GoogleContainer>
      <CircularProgress sx={{ marginBottom: "24px" }} color="primary" size={32} />
      <H6>Logging in with Google</H6>
    </GoogleContainer>
  );
}

export default memo(GoogleLogin);
