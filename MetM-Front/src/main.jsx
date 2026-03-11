// src/main.jsx
// Bootstrap CSS supprimé — toutes les classes Bootstrap ont été remplacées
// par notre design system custom (voir session de redesign)
import "./styles/main.scss";

import ReactDOM from "react-dom/client";
import App from "./App";
import { HashRouter } from "react-router-dom";

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
  </HashRouter>,
);
