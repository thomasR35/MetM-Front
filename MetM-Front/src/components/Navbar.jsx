// src/components/Navbar.jsx
// ========================
import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import { useAuthModal } from "@/context/AuthModalContext";
import { FaShoppingCart, FaBars, FaTimes } from "react-icons/fa";
import { toast } from "react-toastify";
import "../styles/components/_navbar.scss";

const Navbar = () => {
  const { isAuthenticated, isAdmin, logout } = useAuth();
  const { cartItems } = useCart();
  const { setShowSignup, setShowRegister, setPostLoginRedirect } =
    useAuthModal();

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    if (window.confirm("Voulez-vous vraiment vous déconnecter ?")) {
      logout();
      setMenuOpen(false);
      toast.info("Déconnexion réussie 👋", { icon: "👋" });
    }
  };

  const handleLoginClick = (e) => {
    e.preventDefault();
    setPostLoginRedirect(null);
    setShowSignup(true);
    setMenuOpen(false);
  };

  const handleRegisterClick = (e) => {
    e.preventDefault();
    setPostLoginRedirect(null);
    setShowRegister(true);
    setMenuOpen(false);
  };

  return (
    <nav
      className="navbar"
      role="navigation"
      aria-label="Navigation principale"
    >
      <div className="navbar-container">
        {/* BOUTON BURGER accessible */}
        <button
          className="burger-menu"
          type="button"
          aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"}
          aria-controls="nav-center"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>

        {/* LOGO */}
        <Link
          className="logo"
          to="/"
          aria-label="Accueil Marcelle & Maurice Shop"
        >
          Marcelle &amp; Maurice Shop
        </Link>

        {/* LIENS CENTRAUX */}
        <div id="nav-center" className={`nav-center ${menuOpen ? "open" : ""}`}>
          <Link className="btn-gallery" to="/gallery">
            Galerie
          </Link>

          {!isAuthenticated ? (
            <>
              <button className="btn-login" onClick={handleLoginClick}>
                Connexion
              </button>
              <button className="btn-register" onClick={handleRegisterClick}>
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

        {/* ICÔNE PANIER */}
        <div className="nav-right">
          <Link
            className="cart-icon"
            to="/panier"
            aria-label={`Panier (${totalItems} article${
              totalItems > 1 ? "s" : ""
            })`}
          >
            <FaShoppingCart />
            {totalItems > 0 && (
              <span className="cart-badge" aria-live="polite">
                {totalItems}
              </span>
            )}
          </Link>
        </div>
      </div>

      {/* ANCIEN MENU MOBILE (si jamais tu le conserves) */}
      {menuOpen && (
        <ul className="nav-links-mobile" role="menu">
          <li role="none">
            <Link
              role="menuitem"
              className="btn-gallery"
              to="/gallery"
              onClick={() => setMenuOpen(false)}
            >
              Galerie
            </Link>
          </li>

          {!isAuthenticated ? (
            <>
              <li role="none">
                <button
                  role="menuitem"
                  className="btn-login"
                  onClick={handleLoginClick}
                >
                  Connexion
                </button>
              </li>
              <li role="none">
                <button
                  role="menuitem"
                  className="btn-register"
                  onClick={handleRegisterClick}
                >
                  Inscription
                </button>
              </li>
            </>
          ) : (
            <li role="none">
              <button
                role="menuitem"
                className="btn-logout"
                onClick={handleLogout}
              >
                Déconnexion
              </button>
            </li>
          )}

          {isAdmin && (
            <li role="none">
              <Link
                role="menuitem"
                className="btn-admin"
                to="/admin/dashboard"
                onClick={() => setMenuOpen(false)}
              >
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
