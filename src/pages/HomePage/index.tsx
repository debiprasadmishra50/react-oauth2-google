import { HOME } from "../../constants/page-title";
import React, { useEffect } from "react";
import HomePageContainer from "./HomePageContainer";

function HomePage() {
  useEffect(() => {
    document.title = HOME;
  }, []);
  return <HomePageContainer />;
}

export default HomePage;
