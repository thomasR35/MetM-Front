// src/components/LoginModal.jsx
// ======================================
import { useLoginModal } from "@/hooks/components/loginModal/useLoginModal";

export default function LoginModal({
  onClose,
  onSwitchToRegister,
  postLoginRedirect,
}) {
  const { credentials, error, loading, handleChange, handleSubmit } =
    useLoginModal({ onClose, postLoginRedirect });

  return (
    <div className="modal-overlay" role="presentation" onClick={onClose}>
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="login-title"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="close-btn" onClick={onClose} aria-label="Fermer">
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
            <label htmlFor="login-username">Nom d'utilisateur</label>
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
              onClick={onSwitchToRegister}
            >
              Rejoignez-nous !
            </button>
          </p>
        </form>
      </div>
    </div>
  );
}
