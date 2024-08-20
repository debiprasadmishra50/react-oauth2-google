import { BrowserRouter } from "react-router-dom";
import React from "react";
import "./App.css";
import SnackbarProvider from "./components/snackbar/SnackbarProvider";
import AuthProvider from "./providers/AuthProvider";
import Pages from "./pages";

function App() {
  return (
    <BrowserRouter>
      <SnackbarProvider>
        <AuthProvider>
          <Pages />
        </AuthProvider>
      </SnackbarProvider>
    </BrowserRouter>
  );
}

export default App;
