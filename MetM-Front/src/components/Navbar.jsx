import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { FaShoppingCart, FaBars, FaTimes } from "react-icons/fa";
import "../styles/components/_navbar.scss";

const Navbar = ({ setShowSignup, setShowRegister }) => {
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    if (window.confirm("Voulez-vous vraiment vous déconnecter ?")) {
      logout();
      setMenuOpen(false);
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* ✅ MENU BURGER - Affichage correct */}
        <div className="burger-menu" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <FaTimes /> : <FaBars />}
        </div>

        {/* ✅ LOGO */}
        <Link className="logo" to="/">
          Marcelle & Maurice Shop
        </Link>

        {/* ✅ NAVIGATION GRAND ÉCRAN */}
        <div className={`nav-center ${menuOpen ? "open" : ""}`}>
          {isAuthenticated && (
            <span className="user-info">Bonjour, {user.username}!</span>
          )}

          <Link className="btn-gallery" to="/gallery">
            Galerie
          </Link>

          {!isAuthenticated ? (
            <>
              <button className="btn-login" onClick={() => setShowSignup(true)}>
                Connexion
              </button>
              <button
                className="btn-register"
                onClick={() => setShowRegister(true)}
              >
                Inscription
              </button>
            </>
          ) : (
            <button className="btn-logout" onClick={handleLogout}>
              Déconnexion
            </button>
          )}

          {isAdmin && (
            <Link className="btn-admin" to="/admin/dashboard">
              Admin
            </Link>
          )}
        </div>

        {/* ✅ PANIER */}
        <Link className="cart-icon" to="/cart">
          <FaShoppingCart />
        </Link>
      </div>

      {/* ✅ MENU MOBILE - S'affiche uniquement si `menuOpen` est `true` */}
      {menuOpen && (
        <ul className="nav-links-mobile">
          <li>
            <Link
              className="btn-gallery"
              to="/gallery"
              onClick={() => setMenuOpen(false)}
            >
              Galerie
            </Link>
          </li>

          {!isAuthenticated ? (
            <li>
              <button
                className="btn-login"
                onClick={() => {
                  setShowSignup(true);
                  setMenuOpen(false);
                }}
              >
                Connexion
              </button>
            </li>
          ) : (
            <li>
              <button onClick={handleLogout}>Déconnexion</button>
            </li>
          )}

          {isAdmin && (
            <li>
              <Link to="/admin/dashboard" onClick={() => setMenuOpen(false)}>
                Admin
              </Link>
            </li>
          )}
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
