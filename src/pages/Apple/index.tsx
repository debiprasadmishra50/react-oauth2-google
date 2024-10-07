import LoginContainer from "../../components/sessions/Login/index";
import { SIGNIN } from "../../constants/page-title";
import React, { memo, useEffect } from "react";
import { Container } from "./styles";
import AppleLogin from "./AppleLogin";

function Apple() {
  useEffect(() => {
    document.title = SIGNIN;
  }, []);
  return (
    <Container>
      <AppleLogin />
    </Container>
  );
}

export default memo(Apple);
