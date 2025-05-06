// src/context/AuthModalContext.jsx
// ========================
import { createContext, useContext, useState } from "react";

const AuthModalContext = createContext();

export const AuthModalProvider = ({ children }) => {
  const [showSignup, setShowSignup] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [postLoginRedirect, setPostLoginRedirect] = useState(null);

  return (
    <AuthModalContext.Provider
      value={{
        showSignup,
        setShowSignup,
        showRegister,
        setShowRegister,
        postLoginRedirect,
        setPostLoginRedirect,
      }}
    >
      {children}
    </AuthModalContext.Provider>
  );
};

export const useAuthModal = () => useContext(AuthModalContext);
