import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import ProviderContext from "./components/Authentication/ProviderContext";
import { CardProvider } from "./components/Cart/CardContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <ProviderContext>
        <CardProvider>
          <App />
        </CardProvider>
      </ProviderContext>
    </BrowserRouter>
  </StrictMode>
);
