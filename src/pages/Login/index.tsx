import LoginContainer from "../../components/sessions/Login/index";
import { SIGNIN } from "../../constants/page-title";
import React, { memo, useEffect } from "react";
import { Container } from "./styles";

function Login() {
  useEffect(() => {
    document.title = SIGNIN;
  }, []);
  return (
    <Container>
      <LoginContainer />
    </Container>
  );
}

export default memo(Login);
