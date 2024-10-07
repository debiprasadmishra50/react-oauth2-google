import { CircularProgress } from "@mui/material";
import { H6 } from "../../components/Typography";
import { useAuthContext } from "../../providers/AuthProvider/context";
import React, { memo, useEffect } from "react";
import { setLocalStorage } from "../../utils/localstorage";
import { AppleContainer } from "./styles";
import axios from "axios";

function AppleLogin() {
  const backendURI = "https://8db5-103-165-168-38.ngrok-free.app/api/v1/auth/apple/callback";
  // const { googleLogin } = useAuthContext();

  useEffect(() => {
    // Dynamically load the Apple ID JS script
    const script = document.createElement("script");
    script.src = "https://appleid.cdn-apple.com/appleauth/static/jsapi/appleid/1/en_US/appleid.auth.js";
    script.defer = true;
    script.onload = () => {
      if (window.AppleID && window.AppleID.auth) {
        // Initialize Apple ID login after the script is loaded
        window.AppleID.auth.init({
          clientId: "app.e556-103-165-168-38.ngrok-free",
          scope: "name email",
          // redirectURI: "https://8db5-103-165-168-38.ngrok-free.app/api/v1/auth/apple/callback",
          redirectURI: "https://b82c-103-165-168-38.ngrok-free.app/apple",
          state: "origin:web",
          nonce: crypto.randomUUID(),
          usePopup: true,
        });
      }
    };

    document.body.appendChild(script);

    return () => {
      // Clean up the script if the component unmounts
      document.body.removeChild(script);
    };
  }, []);

  const handleAppleSignIn = () => {
    if (window.AppleID && window.AppleID.auth) {
      window.AppleID.auth
        .signIn()
        .then(async (response) => {
          console.log(response);

          // Handle successful sign-in
          const res = await axios.post(backendURI, { token: response.authorization.id_token });

          console.log("Frontend Logging Backend Response", res.data);
        })
        .catch((error) => {
          // Handle error
          console.error("Apple sign-in error:", error);
        });
    }
  };

  return (
    <div>
      <h2>Logging in with APPLE</h2>
      <div
        id="appleid-signin"
        data-color="black"
        data-border="true"
        data-type="sign in"
        onClick={handleAppleSignIn}
        style={{ width: "210px", height: "44px" }}
      ></div>
    </div>
  );
}

export default memo(AppleLogin);
