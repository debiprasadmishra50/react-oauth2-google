import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Box, IconButton } from "@mui/material";
import Button from "../../../components/Button";
import CircularLoader from "../../../components/CircularLoader";
import FlexBox from "../../../components/FlexBox";
import Image from "../../../components/Image";
import BazarTextField from "../../../components/TextField";
import { H3, H6 } from "../../../components/Typography";
import { useFormik } from "formik";
import useWindowSize from "../../../hooks/useWindowSize";
import { useAuthContext } from "../../../providers/AuthProvider/context";
import React, { useCallback, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { LocationState } from "../../../types/location.type";
import { formSchema, initialValues } from "./constants";
import { StyledCard, StyledLink } from "./styles";

const Signup = () => {
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const { signup, isLoading } = useAuthContext();

  const togglePasswordVisibility = useCallback(() => {
    setPasswordVisibility((visible) => !visible);
  }, []);

  const location = useLocation();
  const navigate = useNavigate();
  const screenWidth = useWindowSize();

  const handleFormSubmit = async (values: any) => {
    const routeState = location.state ? (location.state as LocationState) : undefined;
    if (signup) {
      const response = await signup(values);
      if (response && routeState) {
        navigate(routeState.from, { state: routeState, replace: true });
        return;
      }
      if (response) navigate("/home", { replace: true });
    }
  };

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues,
    onSubmit: handleFormSubmit,
    validationSchema: formSchema,
    validateOnChange: true,
    validateOnBlur: false,
  });

  const navigateToGoogle = () => {
    window.location.href = `${process.env.REACT_APP_BASE_URL}/auth/google`;
  };

  return (
    <StyledCard elevation={0} passwordVisibility={passwordVisibility}>
      <form className="content" onSubmit={handleSubmit}>
        <H3
          fontWeight={700}
          fontSize={screenWidth < 450 ? "38px" : "50px"}
          lineHeight={"120%"}
          textAlign="center"
          mb={3}
        >
          Sign Up
        </H3>

        <BazarTextField
          mb={3}
          name="fullName"
          placeholder="Full Name"
          variant="outlined"
          size="small"
          fullWidth
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.fullName || ""}
          error={!!touched.fullName && !!errors.fullName}
          helperText={touched.fullName && errors.fullName}
        />

        <BazarTextField
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

        <BazarTextField
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
            Sign Up
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
              Sign up with Google
            </Box>
          </Button>
        </FlexBox>
      </form>
      <FlexBox justifyContent={screenWidth < 450 ? "space-between" : "center"}>
        <FlexBox alignItems="center" my="1.25rem">
          <StyledLink to="/forgot-password">
            <Button type="button" sx={{ p: "12px 8px", borderRadius: "10px" }} variant="text">
              <H6 fontSize={screenWidth <= 380 ? "13px" : "14px"} mr={1}>
                Forgot your password?
              </H6>
            </Button>
          </StyledLink>
        </FlexBox>
        <FlexBox justifyContent="center" alignItems="center" my="1.25rem">
          <StyledLink to="/login">
            <Button type="button" sx={{ p: "12px 8px", borderRadius: "10px" }} variant="text">
              <H6 fontSize={screenWidth <= 380 ? "13px" : "14px"}>Already have an account?</H6>
            </Button>
          </StyledLink>
        </FlexBox>
      </FlexBox>
    </StyledCard>
  );
};

export default Signup;
