// src/components/Navbar.jsx
// ========================
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaShoppingCart, FaBars, FaTimes } from "react-icons/fa";
import "@/styles/components/_navbar.scss";
import { useNavbar } from "@/hooks/components/navBar/useNavbar";
import AccountModal from "@/components/AccountModal";

export default function Navbar() {
  const {
    isAuthenticated,
    isAdmin,
    totalItems,
    menuOpen,
    setMenuOpen,
    handleLogout,
    handleLoginClick,
    handleRegisterClick,
    ConfirmUI,
  } = useNavbar();
  const [accountOpen, setAccountOpen] = useState(false);
  const navigate = useNavigate();

  const openAccount = () => {
    setMenuOpen(false);
    setAccountOpen(true);
  };

  return (
    <>
      <nav
        className="navbar"
        role="navigation"
        aria-label="Navigation principale"
      >
        <div className="navbar-container">
          {/* Burger menu */}
          <button
            className="burger-menu"
            type="button"
            aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"}
            aria-controls="nav-center"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((prev) => !prev)}
          >
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>

          {/* Logo */}
          <Link
            className="logo"
            to="/"
            aria-label="Accueil Marcelle & Maurice Shop"
            onClick={() => setMenuOpen(false)}
          >
            Marcelle &amp; Maurice Shop
          </Link>

          {/* Liens centraux */}
          <div
            id="nav-center"
            className={`nav-center ${menuOpen ? "open" : ""}`}
          >
            <Link
              className="btn-gallery"
              to="/gallery"
              onClick={() => setMenuOpen(false)}
            >
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
              <>
                <button className="btn-account" onClick={openAccount}>
                  Mon compte
                </button>
                <button className="btn-logout" onClick={handleLogout}>
                  Déconnexion
                </button>
              </>
            )}

            {isAdmin && (
              <Link
                className="btn-admin"
                to="/admin/dashboard"
                onClick={() => setMenuOpen(false)}
              >
                Admin
              </Link>
            )}
          </div>

          {/* Panier */}
          <div className="nav-right">
            <Link
              className="cart-icon"
              to="/panier"
              aria-label={`Panier (${totalItems} article${
                totalItems > 1 ? "s" : ""
              })`}
              onClick={() => setMenuOpen(false)}
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

        {/* Menu mobile secondaire */}
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
              <>
                <li role="none">
                  <button
                    role="menuitem"
                    className="btn-account"
                    onClick={openAccount}
                  >
                    Mon compte
                  </button>
                </li>
                <li role="none">
                  <button
                    role="menuitem"
                    className="btn-logout"
                    onClick={handleLogout}
                  >
                    Déconnexion
                  </button>
                </li>
              </>
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

      {/* Modale Mon compte */}
      <AccountModal
        isOpen={accountOpen}
        onClose={() => setAccountOpen(false)}
      />

      {/* Dialogue de confirmation générique */}
      <ConfirmUI />
    </>
  );
}
