import { useState, useCallback } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Signup from "@/pages/Signup";
import Register from "@/pages/Register";
import "../styles/utils/_global.scss";

const MainLayout = ({ children }) => {
  const [showSignup, setShowSignup] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  // ✅ Ouvre la modale de connexion après une inscription réussie
  const openLoginModal = useCallback(() => {
    setShowRegister(false);
    setShowSignup(true);
  }, []);

  // ✅ Ferme la modale d'inscription après connexion
  const closeRegisterModal = () => {
    setShowRegister(false);
  };

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

      {/* ✅ Modale Inscription */}
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
