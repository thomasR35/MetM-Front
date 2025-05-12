// src/components/RegisterModal.jsx
// ========================
import React from "react";
import "../styles/pages/_register.scss";
import { useRegisterModal } from "@/hooks/registerModal/useRegisterModal";

export default function RegisterModal() {
  const {
    credentials,
    error,
    successMessage,
    loading,
    handleChange,
    handleSubmit,
    closeRegisterModal,
  } = useRegisterModal();

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
          className="generic-button"
          disabled={loading}
          aria-busy={loading}
        >
          {loading ? "Inscription en cours…" : "S’inscrire"}
        </button>
      </form>
    </div>
  );
}
