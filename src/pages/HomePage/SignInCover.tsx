import COVER from "../../assets/images/signin-cover.png";
import FlexBox from "../../components/FlexBox";
import useWindowSize from "../../hooks/useWindowSize";
import React from "react";
import { Link } from "react-router-dom";
import { Heading, SignInButton, SignInCoverContainer, SigninCoverImage, SignInCoverWrapper } from "./styles";

function SignInCover() {
  const screenWidth = useWindowSize();
  return (
    <SignInCoverWrapper>
      <SignInCoverContainer
        sx={{ background: screenWidth > 450 ? "unset" : "#000000" }}
        height={screenWidth > 450 ? "364px" : "480px"}
      >
        <SigninCoverImage src={COVER} alt="signin-cover" width={"100%"}></SigninCoverImage>
        <FlexBox
          flexDirection={screenWidth > 450 ? "row" : "column"}
          width={"60%"}
          zIndex={"2"}
          alignSelf={screenWidth > 450 ? "flex-end" : "center"}
          justifyContent={"space-around"}
          alignItems={"center"}
        >
          <Heading
            sx={{ fontSize: screenWidth > 450 ? "50px" : "32px" }}
            md={4}
            xs={10}
            maxWidth={screenWidth > 450 ? "inherit" : "unset"}
          >
            Enjoy the Most Thrilling and Exciting Games
          </Heading>
          <Link to="/login">
            <SignInButton variant="contained" color="primary">
              Sign In
            </SignInButton>
          </Link>
        </FlexBox>
      </SignInCoverContainer>
    </SignInCoverWrapper>
  );
}

export default SignInCover;
