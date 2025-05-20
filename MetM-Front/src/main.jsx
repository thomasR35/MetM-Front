// src/index.jsx
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/main.scss";

import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";

import { AuthProvider } from "@/context/AuthContext";
import { AuthModalProvider } from "@/context/AuthModalContext";
import { CartProvider } from "@/context/CartContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthProvider>
      <AuthModalProvider>
        <CartProvider>
          <App />
        </CartProvider>
      </AuthModalProvider>
    </AuthProvider>
  </BrowserRouter>
);
