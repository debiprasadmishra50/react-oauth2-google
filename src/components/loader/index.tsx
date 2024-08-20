import LOADER from "../../assets/lotties/loader.json";
import React from "react";
import Lottie from "react-lottie";
import { Container } from "./styles";

function Loader() {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: LOADER,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <Container>
      <Lottie options={defaultOptions} style={{ width: "84px", height: "84px", margin: 0 }} />
    </Container>
  );
}

export default Loader;
