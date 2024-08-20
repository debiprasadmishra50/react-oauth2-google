import AuthRoute from "../components/AuthRoute";
import Loader from "../components/loader";
import React, { memo, useLayoutEffect } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { routes } from "./constants";

function Pages() {
  const location = useLocation();
  useLayoutEffect(() => {
    document.documentElement.scrollTo(0, 0);
  }, [location.pathname]);
  return (
    <Routes>
      {routes.map((route) => (
        <Route
          key={route.path}
          path={route.path}
          element={
            <React.Suspense fallback={<Loader />}>
              {route.authRoute && (
                <AuthRoute>
                  <route.Component />
                </AuthRoute>
              )}
              {!route.authRoute && <route.Component />}
            </React.Suspense>
          }
        />
      ))}

      <Route path="*" element={<Navigate to="/home" />} />
    </Routes>
  );
}

export default memo(Pages);
