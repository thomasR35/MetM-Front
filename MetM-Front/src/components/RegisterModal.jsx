// src/components/RegisterModal.jsx
// ========================
import { useState } from "react";
import "../styles/pages/_register.scss";
import { useRegisterModal } from "@/hooks/components/registerModal/useRegisterModal";

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
        aria-controls="register-form"
      >
        ✖
      </button>

      <h2 id="register-title">Créer un compte</h2>

      {error && (
        <div
          id="register-error"
          className="error-message"
          role="alert"
          aria-live="assertive"
        >
          {error}
        </div>
      )}
      {successMessage && (
        <div
          id="register-success"
          className="success-message"
          role="status"
          aria-live="polite"
        >
          {successMessage}
        </div>
      )}

      <form
        id="register-form"
        onSubmit={handleSubmit}
        aria-labelledby="register-title"
        aria-describedby={
          (error ? "register-error " : "") +
          (successMessage ? "register-success" : "")
        }
      >
        <div
          className="input-group"
          role="group"
          aria-labelledby="label-username"
        >
          <label id="label-username" htmlFor="register-username">
            Nom d’utilisateur
          </label>
          <input
            type="text"
            id="register-username"
            name="username"
            value={credentials.username}
            onChange={handleChange}
            required
            aria-required="true"
            aria-labelledby="label-username"
          />
        </div>

        <div className="input-group" role="group" aria-labelledby="label-email">
          <label id="label-email" htmlFor="register-email">
            Email
          </label>
          <input
            type="email"
            id="register-email"
            name="email"
            value={credentials.email}
            onChange={handleChange}
            required
            aria-required="true"
            aria-labelledby="label-email"
          />
        </div>

        <div
          className="input-group"
          role="group"
          aria-labelledby="label-password"
        >
          <label id="label-password" htmlFor="register-password">
            Mot de passe
          </label>

          <input
            type="password"
            id="register-password"
            name="password"
            value={credentials.password}
            onChange={(e) => {
              handleChange(e);
              hideRequirements();
            }}
            onFocus={hideRequirements}
            required
            aria-required="true"
            pattern="(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}"
            title="Le mot de passe doit contenir au moins 8 caractères, dont 1 majuscule, 1 chiffre et 1 caractère spécial."
            aria-labelledby="label-password"
            aria-describedby={`register-password-requirements${
              error ? " register-error" : ""
            }`}
          />
        </div>

        <p id="register-password-requirements" className="pwd-requirements">
          Le mot de passe doit faire au moins 8 caractères, contenir une
          majuscule, un chiffre et un caractère spécial.
        </p>

        <div
          className="input-group"
          role="group"
          aria-labelledby="label-confirmPassword"
        >
          <label id="label-confirmPassword" htmlFor="register-confirmPassword">
            Confirmer le mot de passe
          </label>
          <input
            type="password"
            id="register-confirmPassword"
            name="confirmPassword"
            value={credentials.confirmPassword}
            onChange={(e) => {
              handleChange(e);
              hideRequirements();
            }}
            onFocus={hideRequirements}
            required
            aria-required="true"
            pattern="(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}"
            title="Le mot de passe doit contenir au moins 8 caractères, dont 1 majuscule, 1 chiffre et 1 caractère spécial."
            aria-labelledby="label-confirmPassword"
            aria-describedby={`register-password-requirements${
              error ? " register-error" : ""
            }`}
          />
        </div>

        <button
          type="submit"
          className="generic-button"
          disabled={loading}
          aria-busy={loading}
          aria-disabled={loading}
        >
          {loading ? "Inscription en cours…" : "S’inscrire"}
        </button>
      </form>
    </div>
  );
}
