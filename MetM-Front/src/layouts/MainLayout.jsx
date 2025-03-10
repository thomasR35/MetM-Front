import { useState, useCallback } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Signup from "@/pages/Signup";
import Register from "@/pages/Register";
import "../styles/utils/_global.scss";

const MainLayout = ({ children }) => {
  const [showSignup, setShowSignup] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  // ✅ Fonction pour ouvrir la modale de connexion après inscription
  const openLoginModal = useCallback(() => {
    console.log("➡ `openLoginModal` a été appelé !");
    setShowRegister(false);
    setShowSignup(true);
  }, []);

  // ✅ Fonction pour fermer `Register.jsx` si la connexion est réussie
  const closeRegisterModal = () => {
    console.log("🔴 Fermeture de `Register.jsx` après connexion");
    setShowRegister(false);
  };

  console.log(
    "📌 `openLoginModal` est bien défini dans MainLayout :",
    typeof openLoginModal
  );

  return (
    <div className="main-layout">
      <Navbar setShowSignup={setShowSignup} setShowRegister={setShowRegister} />
      <main className="content">{children}</main>
      <Footer />

      {/* ✅ Modale Connexion */}
      {showSignup && (
        <div className="modal-overlay">
          <Signup closeModal={() => setShowSignup(false)} />
        </div>
      )}

      {/* ✅ Modale Inscription - S'affiche en tant que modale */}
      {showRegister && (
        <div className="modal-overlay">
          <Register
            openLoginModal={openLoginModal}
            closeRegisterModal={closeRegisterModal}
          />
        </div>
      )}
    </div>
  );
};

export default MainLayout;
