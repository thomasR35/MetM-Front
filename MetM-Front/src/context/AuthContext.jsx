// src/context/AuthContext.jsx
import React, { createContext, useState, useEffect, useContext } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Au montage, on restaure l’utilisateur depuis localStorage
  useEffect(() => {
    const raw = localStorage.getItem("user");
    if (raw && raw !== "undefined") {
      try {
        setUser(JSON.parse(raw));
      } catch {
        localStorage.removeItem("user");
      }
    }
  }, []);

  // Login : on stocke l’objet user et on met à jour l’état
  const login = (userData) => {
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
  };

  // Logout : on vide
  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  // Déduits ces deux flags à partir de `user`
  const isAuthenticated = Boolean(user);
  const isAdmin = Boolean(user && user.role === "admin");
  // ← adapte `user.role` si ta propriété diffère

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isAdmin,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
export default AuthContext;
