// src/pages/AdminLogin.jsx
//=====================================
import { useAdminLogin } from "@/hooks/admin/adminLoginPage/useAdminLogin";

export default function AdminLogin() {
  const { credentials, error, handleChange, handleSubmit } = useAdminLogin();

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4" style={{ width: "400px" }}>
        <h2 className="text-center">Connexion Admin</h2>
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="admin-username" className="form-label">
              Identifiant
            </label>
            <input
              id="admin-username"
              type="text"
              name="username"
              className="form-control"
              value={credentials.username}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="admin-password" className="form-label">
              Mot de passe
            </label>
            <input
              id="admin-password"
              type="password"
              name="password"
              className="form-control"
              value={credentials.password}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">
            Se connecter
          </button>
          <button
            type="button"
            className="generic-button mt-2"
            onClick={() => window.location.replace("/")}
          >
            Retour à l’accueil
          </button>
        </form>
      </div>
    </div>
  );
}
