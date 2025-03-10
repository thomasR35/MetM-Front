import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { login } from "@/api/auth"; // ✅ Import de la fonction API

const Signup = () => {
  const { login: authLogin } = useAuth(); // ✅ Renommé pour éviter conflit avec la fonction API
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const data = await login(credentials.username, credentials.password);

      if (data.token && data.user) {
        authLogin(data.user, data.token);
        navigate("/");
      } else {
        setError("Réponse inattendue de l'API.");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Connexion échouée.");
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Connexion</h2>

      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Nom d'utilisateur</label>
          <input
            type="text"
            name="username"
            className="form-control"
            value={credentials.username}
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
            value={credentials.password}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary w-100">
          Se connecter
        </button>
      </form>
    </div>
  );
};

export default Signup;
