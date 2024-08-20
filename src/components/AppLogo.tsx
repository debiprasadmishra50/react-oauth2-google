import styled from "@emotion/styled";
import { Box } from "@mui/system";
import APPNAME from "assets/icons/app-name.svg";
import LOGO from "../assets/lotties/logo.json";
import useWindowSize from "../hooks/useWindowSize";
import React from "react";
import Lottie from "react-lottie";
import { Link } from "react-router-dom";

const AppName = styled.img``;

interface IAppLogo {
  src?: string;
  scale?: number;
}

function AppLogo({ src, scale = 0.6 }: IAppLogo) {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: LOGO,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  const screenWidth = useWindowSize();
  return (
    <Link to="/home">
      <Box sx={{ position: "relative", cursor: "pointer" }}>
        <AppName height={screenWidth < 450 ? "48px" : "132px"} src={src ? src : APPNAME} alt="app-name" />
        <Lottie
          options={defaultOptions}
          style={{
            height: "222px",
            width: "149px",
            position: "absolute",
            left: screenWidth < 450 ? "24%" : "42%",
            top: screenWidth < 450 ? "-84px" : "-32px",
            transform: screenWidth < 450 ? `scale(${scale})` : "scale(1)",
          }}
        />
      </Box>
    </Link>
  );
}

export default AppLogo;
