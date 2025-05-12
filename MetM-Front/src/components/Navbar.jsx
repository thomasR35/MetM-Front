// src/components/Navbar.jsx
// ========================
import React from "react";
import { Link } from "react-router-dom";
import { FaShoppingCart, FaBars, FaTimes } from "react-icons/fa";
import "@/styles/components/_navbar.scss";
import { useNavbar } from "@/hooks/navBar/useNavbar";

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
  } = useNavbar();

  return (
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
          onClick={() => setMenuOpen((o) => !o)}
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
        <div id="nav-center" className={`nav-center ${menuOpen ? "open" : ""}`}>
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
            <button className="btn-logout" onClick={handleLogout}>
              Déconnexion
            </button>
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

        {/* Icône panier */}
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
}
