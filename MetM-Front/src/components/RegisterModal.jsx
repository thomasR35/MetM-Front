// src/components/RegisterModal.jsx
// ======================================
import { useRegisterModal } from "@/hooks/components/registerModal/useRegisterModal";

export default function RegisterModal({ onClose, onSwitchToLogin }) {
  const { formData, error, loading, handleChange, handleSubmit } =
    useRegisterModal({ onClose });

  return (
    <div className="modal-overlay" role="presentation" onClick={onClose}>
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="register-title"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="close-btn" onClick={onClose} aria-label="Fermer">
          ✖
        </button>

        <h2 id="register-title" className="modal-title">
          Inscription
        </h2>

        {error && (
          <div id="register-error" className="error-message" role="alert">
            {error}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          aria-describedby={error ? "register-error" : undefined}
        >
          <div className="input-group">
            <label htmlFor="register-username">Nom d'utilisateur</label>
            <input
              id="register-username"
              name="username"
              type="text"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="register-email">Email</label>
            <input
              id="register-email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="register-password">Mot de passe</label>
            <input
              id="register-password"
              name="password"
              type="password"
              value={formData.password}
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
            {loading ? "Inscription en cours…" : "S'inscrire"}
          </button>

          <p className="signup-link">
            Déjà inscrit&nbsp;?
            <button
              type="button"
              className="generic-button"
              onClick={onSwitchToLogin}
            >
              Se connecter
            </button>
          </p>
        </form>
      </div>
    </div>
  );
}
