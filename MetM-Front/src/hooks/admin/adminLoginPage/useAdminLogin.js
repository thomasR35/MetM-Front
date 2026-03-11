// src/hooks/adminLoginPage/useAdminLogin.js
//=====================================
import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { adminLogin } from "@/services/authService/authService";

export function useAdminLogin() {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setCredentials((c) => ({ ...c, [name]: value }));
  }, []);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      setError(null);
      try {
        const data = await adminLogin(
          credentials.username,
          credentials.password,
        );
        if (data.token && data.user) {
          localStorage.setItem("adminToken", data.token);
          localStorage.setItem("user", JSON.stringify(data.user));
          navigate("/admin/dashboard");
        } else {
          throw new Error("Aucun token ou utilisateur reçu");
        }
      } catch (err) {
        // err.response?.data?.error si axios, sinon err.message
        setError(
          err.response?.data?.error || err.message || "Erreur de connexion",
        );
        console.error("Admin login error:", err);
      }
    },
    [credentials, navigate],
  );

  return {
    credentials,
    error,
    handleChange,
    handleSubmit,
  };
}
