import SignupContainer from "../../components/sessions/Signup/index";
import { SIGNUP } from "../../constants/page-title";
import { AUTHENTICATION } from "../../providers/AuthProvider/constants";
import { useAuthContext } from "../../providers/AuthProvider/context";
import React, { memo, useEffect } from "react";
import { useNavigate } from "react-router";
import { Container } from "./styles";

function Signup() {
  const { authStatus } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (authStatus === AUTHENTICATION.SUCCESS) navigate("/home");
  }, [authStatus]);

  useEffect(() => {
    document.title = SIGNUP;
  }, []);
  return (
    <Container>
      <SignupContainer />
    </Container>
  );
}

export default memo(Signup);
