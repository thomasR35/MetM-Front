import { useState, useEffect, createContext, useContext } from "react";

// Création du contexte d'authentification
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (token && storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (userData, token) => {
    const userWithRole = {
      ...userData,
      role:
        userData.role && userData.role.trim() !== "" ? userData.role : "user", // 🔥 Définit un rôle par défaut
    };

    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(userWithRole));
    setUser(userWithRole);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isAdmin: user?.role === "admin",
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// ✅ Export propre du hook
export const useAuth = () => {
  return useContext(AuthContext);
};
