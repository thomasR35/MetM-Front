import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/main.scss";

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./hooks/useAuth.jsx";
import { CartProvider } from "./context/CartContext.jsx";
import { AuthModalProvider } from "./context/AuthModalContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthProvider>
      <CartProvider>
        <AuthModalProvider>
          <App />
        </AuthModalProvider>
      </CartProvider>
    </AuthProvider>
  </BrowserRouter>
);
