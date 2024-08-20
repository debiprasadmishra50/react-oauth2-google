import React from "react";

const Login = React.lazy(() => import("./Login"));
const Signup = React.lazy(() => import("./Signup"));
const GoogleAuth = React.lazy(() => import("./Login/GoogleLogin"));
const HomePage = React.lazy(() => import("./HomePage"));

export const routes = [
  {
    path: "/login",
    Component: Login,
  },
  {
    path: "/signup",
    Component: Signup,
  },
  {
    path: "/auth/google/callback",
    Component: GoogleAuth,
  },
  {
    path: "/home",
    Component: HomePage,
    authRoute: true,
  },
];
