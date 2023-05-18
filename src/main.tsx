import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { ChakraProvider } from "@chakra-ui/react";
import customTheme from "./styles/theme.ts";
import "./styles/index.css";
import { AuthProvider } from "./context/userContext.tsx";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <AuthProvider>
      <ChakraProvider theme={customTheme}>
        <App />
      </ChakraProvider>
    </AuthProvider>
  </React.StrictMode>
);
