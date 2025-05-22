// src/hooks/registerModal/useRegisterModal.js
//============================================
import { useState, useCallback } from "react";
import { useAuthModal } from "@/context/AuthModalContext";
import { registerUser } from "@/api/auth";

const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;

export function useRegisterModal() {
  const { setShowSignup, setShowRegister, setPostLoginRedirect } =
    useAuthModal();

  const [credentials, setCredentials] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setCredentials((c) => ({ ...c, [name]: value }));
  }, []);

  const closeRegisterModal = useCallback(() => {
    setShowRegister(false);
    setShowSignup(false);
    setPostLoginRedirect(null);
  }, [setShowRegister, setShowSignup, setPostLoginRedirect]);

  const openLoginModal = useCallback(() => {
    setShowRegister(false);
    setShowSignup(true);
    setPostLoginRedirect(null);
  }, [setShowRegister, setShowSignup, setPostLoginRedirect]);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      setError(null);
      setSuccessMessage(null);

      // Vérification de la robustesse du mot de passe
      if (!passwordRegex.test(credentials.password)) {
        setError(
          "❌ Le mot de passe doit faire au moins 8 caractères, contenir au moins une majuscule, un chiffre et un caractère spécial."
        );
        return;
      }

      // Confirmation des deux champs mot de passe
      if (credentials.password !== credentials.confirmPassword) {
        setError("❌ Les mots de passe ne correspondent pas.");
        return;
      }

      setLoading(true);
      try {
        const response = await registerUser(
          credentials.username,
          credentials.email,
          credentials.password
        );
        if (response.success) {
          setSuccessMessage("🎉 Inscription réussie !");

          // Après un court délai, on ferme la modal et on ouvre celle de login
          setTimeout(() => {
            closeRegisterModal();
            openLoginModal();
          }, 1000);
        } else {
          setError(response.message || "❌ Erreur inconnue.");
        }
      } catch (err) {
        console.error("Erreur d'inscription :", err);
        setError("❌ Erreur réseau ou serveur.");
      } finally {
        setLoading(false);
      }
    },
    [credentials, closeRegisterModal, openLoginModal]
  );

  return {
    credentials,
    error,
    successMessage,
    loading,
    handleChange,
    handleSubmit,
    closeRegisterModal,
  };
}
