// src/components/LoginModal.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { useAuthModal } from "@/context/AuthModalContext";
import { login as apiLogin } from "@/api/auth";
import { toast } from "react-toastify";
import "../styles/components/_signup.scss"; // ou _authModal.scss

export default function LoginModal() {
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

  const closeModal = () => {
    setShowSignup(false);
    setShowRegister(false);
    setPostLoginRedirect(null);
  };

  const switchToRegister = () => {
    setShowSignup(false);
    setShowRegister(true);
  };

  const switchToLogin = () => {
    setShowRegister(false);
    setShowSignup(true);
  };

  const handleChange = (e) =>
    setCredentials((c) => ({ ...c, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const { user, token } = await apiLogin(
        credentials.username,
        credentials.password
      );
      // 1) on met à jour le contexte
      authLogin(user, token);
      toast.success(`Bienvenue, ${user.username} !`);
      // 2) on ferme la modale
      closeModal();
      // 3) redirection
      navigate(postLoginRedirect || "/");
    } catch (err) {
      setError(err.response?.data?.message || "Connexion échouée.");
    } finally {
      setLoading(false);
    }
  };

  // Si ni login ni register ne doivent s'afficher
  if (!showSignup && !showRegister) return null;

  // Modal d'inscription
  if (showRegister) {
    return (
      <RegisterModal closeModal={closeModal} switchToLogin={switchToLogin} />
    );
  }

  // Modal de connexion
  return (
    <div className="modal-overlay" role="presentation">
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="login-title"
      >
        <button
          className="close-btn"
          onClick={closeModal}
          aria-label="Fermer la fenêtre de connexion"
        >
          ✖
        </button>

        <h2 id="login-title" className="modal-title">
          Connexion
        </h2>

        {error && (
          <div id="login-error" className="error-message" role="alert">
            {error}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          aria-describedby={error ? "login-error" : undefined}
        >
          <div className="input-group">
            <label htmlFor="login-username">Nom d’utilisateur</label>
            <input
              type="text"
              id="login-username"
              name="username"
              value={credentials.username}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="login-password">Mot de passe</label>
            <input
              type="password"
              id="login-password"
              name="password"
              value={credentials.password}
              onChange={handleChange}
              required
            />
          </div>

          <button
            type="submit"
            className="apply-btn"
            disabled={loading}
            aria-busy={loading}
          >
            {loading ? "Connexion en cours…" : "Se connecter"}
          </button>

          <p className="signup-link">
            Pas encore inscrit&nbsp;?{" "}
            <button
              type="button"
              className="generic-button"
              onClick={switchToRegister}
            >
              Rejoignez-nous !
            </button>
          </p>
        </form>
      </div>
    </div>
  );
}
