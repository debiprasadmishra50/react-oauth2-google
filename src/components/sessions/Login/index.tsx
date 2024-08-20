import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Box, IconButton } from "@mui/material";
import Button from "../../../components/Button";
import CircularLoader from "../../../components/CircularLoader";
import FlexBox from "../../../components/FlexBox";
import Image from "../../../components/Image";
import TextField from "../../../components/TextField";
import { H3, H6 } from "../../../components/Typography";
import { useFormik } from "formik";
import useWindowSize from "../../../hooks/useWindowSize";
import { AUTHENTICATION } from "../../../providers/AuthProvider/constants";
import { useAuthContext } from "../../../providers/AuthProvider/context";
import React, { memo, useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { LocationState } from "../../../types/location.type";
import { formSchema, initialValues } from "./constants";
import { StyledCard, StyledLink } from "./styles";

const Login = () => {
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const { login, isLoading, authStatus } = useAuthContext();
  const navigate = useNavigate();
  const location = useLocation();
  const togglePasswordVisibility = useCallback(() => {
    setPasswordVisibility((visible) => !visible);
  }, []);
  const screenWidth = useWindowSize();

  useEffect(() => {
    const routeState = location.state ? (location.state as LocationState) : undefined;
    if (authStatus === AUTHENTICATION.SUCCESS && routeState) {
      navigate(routeState.from, { replace: true });
    }

    if (authStatus === AUTHENTICATION.SUCCESS && !routeState) {
      navigate("/home", { replace: true });
    }
  }, [authStatus, location]);

  const handleFormSubmit = async (values: any) => {
    const routeState = location.state ? (location.state as LocationState) : undefined;
    if (login) {
      const response = await login({
        email: values.email,
        password: values.password,
      });
      if (response && routeState) {
        navigate(routeState.from, { state: routeState, replace: true });
        return;
      }
      if (response) navigate("/home", { replace: true });
    }
  };

  const redirectToSignup = () => {
    const routeState = location.state ? (location.state as LocationState) : undefined;
    navigate("/signup", { state: routeState });
  };

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
    onSubmit: handleFormSubmit,
    initialValues,
    validationSchema: formSchema,
    validateOnChange: true,
    validateOnBlur: false,
  });

  const navigateToGoogle = () => {
    window.location.href = `${process.env.REACT_APP_BASE_URL}/auth/google`;
  };

  return (
    <StyledCard elevation={3} passwordVisibility={passwordVisibility}>
      <form className="content" onSubmit={handleSubmit}>
        <H3
          fontWeight={700}
          fontSize={screenWidth < 450 ? "38px" : "50px"}
          lineHeight={"120%"}
          textAlign="center"
          mb={3}
        >
          Log In
        </H3>

        <TextField
          mb={3}
          name="email"
          placeholder="Email"
          variant="outlined"
          size="small"
          type="email"
          fullWidth
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.email || ""}
          error={!!touched.email && !!errors.email}
          helperText={touched.email && errors.email}
        />

        <TextField
          mb={6}
          name="password"
          placeholder="Password"
          autoComplete="on"
          type={passwordVisibility ? "text" : "password"}
          variant="outlined"
          size="small"
          fullWidth
          InputProps={{
            endAdornment: (
              <IconButton size="small" type="button" onClick={togglePasswordVisibility}>
                {passwordVisibility ? (
                  <Visibility className="passwordEye" fontSize="small" />
                ) : (
                  <VisibilityOff className="passwordEye" fontSize="small" />
                )}
              </IconButton>
            ),
          }}
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.password || ""}
          error={!!touched.password && !!errors.password}
          helperText={touched.password && errors.password}
        />

        <FlexBox
          flexDirection={screenWidth < 450 ? "column" : "row"}
          justifyContent={"space-between"}
          alignItems="center"
        >
          <Button
            variant="contained"
            color="primary"
            type="submit"
            fullWidth
            sx={{
              height: 44,
              mr: screenWidth < 450 ? 0 : "14px",
              mb: screenWidth < 450 ? "16px" : 0,
            }}
          >
            Log In
            {isLoading && <CircularLoader sx={{ marginLeft: 1 }} size={16} color="inherit" />}
          </Button>

          <Button
            className="googleButton"
            size="medium"
            onClick={navigateToGoogle}
            fullWidth
            sx={{
              height: 44,
            }}
          >
            <Image src="/assets/images/icons/google-1.svg" alt="google" />
            <Box fontSize="12px" ml={1}>
              Log in with Google
            </Box>
          </Button>
        </FlexBox>
      </form>

      <FlexBox justifyContent={screenWidth < 450 ? "space-between" : "center"}>
        <FlexBox alignItems="center" my="1.25rem">
          <StyledLink to="/forgot-password">
            <Button
              type="button"
              sx={{
                p: "12px 8px",
                borderRadius: "10px",
              }}
              variant="text"
            >
              <H6 fontSize={screenWidth <= 380 ? "13px" : "14px"} mr={1}>
                Forgot your password?
              </H6>
            </Button>
          </StyledLink>
        </FlexBox>
        <FlexBox justifyContent="center" alignItems="center" my="1.25rem">
          <StyledLink to="/signup">
            <Button
              type="button"
              sx={{
                p: "12px 8px",
                borderRadius: "10px",
                fontSize: screenWidth <= 380 ? "13px" : "14px",
              }}
              variant="text"
            >
              <H6 fontSize={screenWidth <= 380 ? "13px" : "14px"}>Don't have an account?</H6>
            </Button>
          </StyledLink>
        </FlexBox>
      </FlexBox>
    </StyledCard>
  );
};

export default memo(Login);
