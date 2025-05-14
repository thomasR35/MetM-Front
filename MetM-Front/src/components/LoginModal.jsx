// src/components/LoginModal.jsx
// ======================================
import { createPortal } from "react-dom";
import "@/styles/components/_signup.scss";
import RegisterModal from "./RegisterModal";
import { useLoginModal } from "@/hooks/components/loginModal/useLoginModal";

export default function LoginModal() {
  const {
    showSignup,
    showRegister,
    credentials,
    error,
    loading,
    closeModal,
    switchToRegister,
    switchToLogin,
    handleChange,
    handleSubmit,
  } = useLoginModal();

  // quand rien n'est affiché
  if (!showSignup && !showRegister) return null;

  // si on veut la modal d'inscription à la place
  if (showRegister) {
    return (
      <RegisterModal closeModal={closeModal} switchToLogin={switchToLogin} />
    );
  }

  // Modal de connexion
  return createPortal(
    <div className="modal-overlay" role="presentation">
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="login-title"
      >
        <button className="close-btn" onClick={closeModal} aria-label="Fermer">
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
              id="login-username"
              name="username"
              type="text"
              value={credentials.username}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="login-password">Mot de passe</label>
            <input
              id="login-password"
              name="password"
              type="password"
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
            Pas encore inscrit&nbsp;?
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
    </div>,
    document.body
  );
}
