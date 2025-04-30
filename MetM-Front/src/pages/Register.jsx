// src/pages/Register.jsx
import { useState } from "react";
import { registerUser } from "@/api/auth";
import "../styles/pages/_register.scss";

const Register = ({
  openLoginModal,
  closeRegisterModal,
  setPostLoginRedirect,
}) => {
  const [credentials, setCredentials] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);

    if (credentials.password !== credentials.confirmPassword) {
      setError("❌ Les mots de passe ne correspondent pas.");
      return;
    }

    setLoading(true);

    const response = await registerUser(
      credentials.username,
      credentials.email,
      credentials.password
    );

    if (response.success) {
      setSuccessMessage("🎉 Inscription réussie !");
      // On attend un peu puis on bascule sur la modal de login
      setTimeout(() => {
        setPostLoginRedirect(null);
        closeRegisterModal();
        openLoginModal();
      }, 1000);
    } else {
      setError(response.message || "❌ Erreur inconnue.");
    }

    setLoading(false);
  };

  return (
    <div
      className="modal-content"
      role="dialog"
      aria-modal="true"
      aria-labelledby="register-title"
    >
      <button
        className="close-modal"
        onClick={closeRegisterModal}
        aria-label="Fermer la fenêtre d’inscription"
      >
        ✖
      </button>

      <h2 id="register-title">Créer un compte</h2>

      {error && (
        <div id="register-error" className="error-message" role="alert">
          {error}
        </div>
      )}
      {successMessage && (
        <div id="register-success" className="success-message" role="status">
          {successMessage}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        aria-describedby={
          (error ? "register-error " : "") +
          (successMessage ? "register-success" : "")
        }
      >
        <div className="input-group">
          <label htmlFor="register-username">Nom d’utilisateur</label>
          <input
            type="text"
            id="register-username"
            name="username"
            value={credentials.username}
            onChange={handleChange}
            required
          />
        </div>

        <div className="input-group">
          <label htmlFor="register-email">Email</label>
          <input
            type="email"
            id="register-email"
            name="email"
            value={credentials.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="input-group">
          <label htmlFor="register-password">Mot de passe</label>
          <input
            type="password"
            id="register-password"
            name="password"
            value={credentials.password}
            onChange={handleChange}
            required
          />
        </div>

        <div className="input-group">
          <label htmlFor="register-confirmPassword">
            Confirmer le mot de passe
          </label>
          <input
            type="password"
            id="register-confirmPassword"
            name="confirmPassword"
            value={credentials.confirmPassword}
            onChange={handleChange}
            required
          />
        </div>

        <button
          type="submit"
          className="btn-submit"
          disabled={loading}
          aria-busy={loading}
        >
          {loading ? "Inscription en cours…" : "S’inscrire"}
        </button>
      </form>
    </div>
  );
};

export default Register;
