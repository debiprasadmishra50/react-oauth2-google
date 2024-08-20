import { useEffect } from "react";
import { AUTHENTICATION } from "../../providers/AuthProvider/constants";
import { useAuthContext } from "../../providers/AuthProvider/context";
import SignInCover from "./SignInCover";
import { Container } from "./styles";
import { getLocalStorage } from "../../utils/localstorage";
import { get } from "../../api/auth";

function HomePageContainer() {
  const { authStatus } = useAuthContext();

  // useEffect(() => {
  //   const fetchUser = async () => {
  //     try {
  //       const user = await get("/users/me");

  //       console.log("USER", user);
  //     } catch (error) {
  //       console.error("Error fetching user data:", error);
  //     }
  //   };

  //   fetchUser();
  // });

  return (
    <Container>
      <h1>User inside the page</h1>

      {authStatus === AUTHENTICATION.FAILURE && <SignInCover />}
    </Container>
  );
}

export default HomePageContainer;
