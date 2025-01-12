import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { ApiContextProvider } from "./context/ApiContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
    <ApiContextProvider>
      <App />
      </ApiContextProvider>
    </BrowserRouter>
  </StrictMode>
);