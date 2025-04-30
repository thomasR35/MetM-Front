// src/components/Signup.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { login } from "@/api/auth";
import { toast } from "react-toastify";
import "../styles/components/_signup.scss";

export default function Signup({
  closeModal,
  postLoginRedirect,
  setShowRegister,
}) {
  const { login: authLogin } = useAuth();
  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setCredentials((c) => ({ ...c, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const data = await login(credentials.username, credentials.password);
      if (data.token && data.user) {
        authLogin(data.user, data.token);
        toast.success(`Bienvenue, ${data.user.username} 👋`);
        navigate(postLoginRedirect || "/");
        closeModal();
      } else {
        setError("Réponse inattendue de l’API.");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Connexion échouée.");
    }

    setLoading(false);
  };

  return (
    <div className="modal-overlay" role="presentation">
      <div
        className="modal-content"
        role="dialog"
        aria-modal="true"
        aria-labelledby="login-title"
      >
        <button
          className="close-modal"
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
            className="btn-submit"
            disabled={loading}
            aria-busy={loading}
          >
            {loading ? "Connexion en cours…" : "Se connecter"}
          </button>

          <p className="signup-link">
            Pas encore inscrit&nbsp;?{" "}
            <button
              type="button"
              className="form-button"
              onClick={() => {
                closeModal();
                setShowRegister(true);
              }}
            >
              Rejoignez-nous !
            </button>
          </p>
        </form>
      </div>
    </div>
  );
}
