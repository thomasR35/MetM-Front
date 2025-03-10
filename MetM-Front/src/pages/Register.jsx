import { useState, useEffect } from "react";
import { registerUser } from "@/api/auth";
import "../styles/pages/_register.scss";

const Register = ({ openLoginModal, closeRegisterModal }) => {
  console.log(
    "🔍 `openLoginModal` reçu dans Register :",
    typeof openLoginModal
  );

  useEffect(() => {
    if (!openLoginModal || typeof openLoginModal !== "function") {
      console.warn("⏳ `openLoginModal` est encore en attente...");
    } else {
      console.log("✅ `openLoginModal` est bien une fonction !");
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

    console.log("🔹 Envoi du formulaire avec :", credentials);

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

    console.log("✅ Réponse API :", response);

    if (response.success) {
      console.log("✅ Inscription réussie !");
      setSuccessMessage("🎉 Inscription réussie ! Connexion...");

      setTimeout(() => {
        console.log("➡ Fermeture de `Register.jsx` après connexion");
        closeRegisterModal(); // 🔥 Ferme la modale après succès
        openLoginModal(); // 🔥 Ouvre la modale de connexion
      }, 2000);
    } else {
      console.error("❌ Erreur API :", response.message);
      setError(response.message || "❌ Erreur inconnue.");
    }

    setLoading(false);
  };

  return (
    <div className="modal-content">
      {/* ✅ Bouton de fermeture en haut à droite */}
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
