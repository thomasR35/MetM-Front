import { useState, useEffect } from "react";
import { registerUser } from "@/api/auth";
import "../styles/pages/_register.scss";

const Register = ({ openLoginModal, closeRegisterModal }) => {
  useEffect(() => {
    if (!openLoginModal || typeof openLoginModal !== "function") {
      console.warn("⏳ `openLoginModal` n'est pas encore disponible...");
    }
  }, [openLoginModal]);

  const [credentials, setCredentials] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);

    if (credentials.password !== credentials.confirmPassword) {
      setError("❌ Les mots de passe ne correspondent pas.");
      return;
    }

    setLoading(true);
    const response = await registerUser(
      credentials.username,
      credentials.email,
      credentials.password
    );

    if (response.success) {
      setSuccessMessage("🎉 Inscription réussie ! Connexion...");

      setTimeout(() => {
        closeRegisterModal(); // 🔥 Ferme la modale après succès
        openLoginModal(); // 🔥 Ouvre la modale de connexion
      }, 2000);
    } else {
      setError(response.message || "❌ Erreur inconnue.");
    }

    setLoading(false);
  };

  return (
    <div className="modal-content">
      {/* ✅ Bouton de fermeture */}
      <button className="close-modal" onClick={closeRegisterModal}>
        ✖
      </button>

      <h2>Créer un compte</h2>
      {error && <div className="error-message">{error}</div>}
      {successMessage && (
        <div className="success-message">{successMessage}</div>
      )}

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
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={credentials.email}
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

        <div className="input-group">
          <label>Confirmer le mot de passe</label>
          <input
            type="password"
            name="confirmPassword"
            value={credentials.confirmPassword}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="btn-submit" disabled={loading}>
          {loading ? "Inscription en cours..." : "S'inscrire"}
        </button>
      </form>
    </div>
  );
};

export default Register;
