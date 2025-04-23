import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { login } from "@/api/auth";
import { toast } from "react-toastify";
import "../styles/components/_signup.scss";

const Signup = ({ closeModal, postLoginRedirect, setShowRegister }) => {
  const { login: authLogin } = useAuth();
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
        toast.success("Bienvenue, ${data.user.username} 👋");
        navigate(postLoginRedirect || "/");
        closeModal();
      } else {
        setError("Réponse inattendue de l'API.");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Connexion échouée.");
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-modal" onClick={closeModal}>
          ✖
        </button>
        <h2 className="modal-title">Connexion</h2>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Nom d'utilisateur</label>
            <input
              type="text"
              name="username"
              value={credentials.username}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label>Mot de passe</label>
            <input
              type="password"
              name="password"
              value={credentials.password}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="btn-submit">
            Se connecter
          </button>

          <p className="signup-link">
            pas encore inscrit ?{" "}
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
};

export default Signup;
