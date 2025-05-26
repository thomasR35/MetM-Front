// src/hooks/loginModal/useLoginModal.js
// ======================================
import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { useAuthModal } from "@/context/AuthModalContext";
import { login as apiLogin } from "@/api/auth";
import { toast } from "react-toastify";

/**
 * Gère tout le state et les handlers de la modal de login/inscription.
 */
export function useLoginModal() {
  const { login: authLogin } = useAuth();
  const {
    showSignup,
    setShowSignup,
    showRegister,
    setShowRegister,
    postLoginRedirect,
    setPostLoginRedirect,
  } = useAuthModal();
  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const closeModal = useCallback(() => {
    setShowSignup(false);
    setShowRegister(false);
    setPostLoginRedirect(null);
  }, [setShowSignup, setShowRegister, setPostLoginRedirect]);

  const switchToRegister = useCallback(() => {
    setShowSignup(false);
    setShowRegister(true);
    setError(null);
  }, [setShowSignup, setShowRegister]);

  const switchToLogin = useCallback(() => {
    setShowRegister(false);
    setShowSignup(true);
    setError(null);
  }, [setShowRegister, setShowSignup]);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setCredentials((c) => ({ ...c, [name]: value }));
  }, []);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      setError(null);
      setLoading(true);
      try {
        const { user, token } = await apiLogin(
          credentials.username,
          credentials.password
        );
        authLogin({ user, token });
        toast.success(`Bienvenue, ${user.username} !`);
        closeModal();
        navigate(postLoginRedirect || "/");
      } catch (err) {
        setError(err.response?.data?.message || "Connexion échouée.");
      } finally {
        setLoading(false);
      }
    },
    [credentials, apiLogin, authLogin, closeModal, navigate, postLoginRedirect]
  );

  return {
    // qui affiche la modal
    showSignup,
    showRegister,

    // state
    credentials,
    error,
    loading,

    // handlers
    closeModal,
    switchToRegister,
    switchToLogin,
    handleChange,
    handleSubmit,
  };
}
