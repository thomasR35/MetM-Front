// src/pages/AdminLogin.jsx
// ========================
import { useState } from "react";
import { login } from "@/api/auth";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const data = await login(credentials.username, credentials.password);

      if (data.token && data.user) {
        localStorage.setItem("adminToken", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));

        console.log("Token stocké :", data.token);
        console.log("Utilisateur stocké :", data.user);

        navigate("/admin/dashboard");
      } else {
        throw new Error("Aucun token ou utilisateur reçu");
      }
    } catch (error) {
      setError(error.response?.data?.error || "Erreur de connexion");
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4" style={{ width: "400px" }}>
        <h2 className="text-center">Connexion Admin</h2>
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Identifiant</label>
            <input
              type="text"
              name="username"
              className="form-control"
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Mot de passe</label>
            <input
              type="password"
              name="password"
              className="form-control"
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">
            Se connecter
          </button>
          <button className="generic-button" onClick={() => navigate("/")}>
            Retour à l’accueil
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
