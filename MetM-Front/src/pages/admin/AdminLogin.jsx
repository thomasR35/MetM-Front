// src/pages/AdminLogin.jsx
// =====================================
import { useAdminLogin } from "@/hooks/admin/adminLoginPage/useAdminLogin";
import { useNavigate } from "react-router-dom";
import "@/styles/pages/_admin-login.scss";

export default function AdminLogin() {
  const navigate = useNavigate();
  const { credentials, error, handleChange, handleSubmit } = useAdminLogin();

  return (
    <main className="admin-login-page">
      <div className="admin-login-card">
        <div className="admin-login-header">
          <h1>Admin</h1>
          <span>Marcelle &amp; Maurice Shop</span>
        </div>

        {error && (
          <div className="error-message" role="alert">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="admin-username">Identifiant</label>
            <input
              id="admin-username"
              type="text"
              name="username"
              value={credentials.username}
              onChange={handleChange}
              required
              autoComplete="username"
            />
          </div>
          <div className="form-group">
            <label htmlFor="admin-password">Mot de passe</label>
            <input
              id="admin-password"
              type="password"
              name="password"
              value={credentials.password}
              onChange={handleChange}
              required
              autoComplete="current-password"
            />
          </div>

          <button type="submit" className="btn-admin-login">
            Se connecter
          </button>
          <button
            type="button"
            className="btn-admin-back"
            onClick={() => navigate("/")}
          >
            ← Retour à l'accueil
          </button>
        </form>
      </div>
    </main>
  );
}
