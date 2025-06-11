// src/index.jsx
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/main.scss";

import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter, HashRouter } from "react-router-dom";

import { AuthProvider } from "@/context/AuthContext";
import { AuthModalProvider } from "@/context/AuthModalContext";
import { CartProvider } from "@/context/CartContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <HashRouter>
    <AuthProvider>
      <AuthModalProvider>
        <CartProvider>
          <App />
        </CartProvider>
      </AuthModalProvider>
    </AuthProvider>
  </HashRouter>
);
