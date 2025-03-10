import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { FaShoppingCart, FaBars } from "react-icons/fa"; // Icône menu burger
import "../styles/components/_navbar.scss";

const Navbar = () => {
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    if (window.confirm("Voulez-vous vraiment vous déconnecter ?")) {
      logout();
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="burger-menu" onClick={() => setMenuOpen(!menuOpen)}>
          <FaBars />
        </div>

        <Link className="logo" to="/">
          Marcelle & Maurice Shop
        </Link>

        <div className={`nav-center ${menuOpen ? "open" : ""}`}>
          {isAuthenticated && (
            <span className="user-info">Bonjour, {user.username}!</span>
          )}

          <Link className="btn-gallery" to="/gallery">
            Galerie
          </Link>

          {!isAuthenticated ? (
            <Link className="btn-login" to="/signup">
              Connexion
            </Link>
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

        <Link className="cart-icon" to="/cart">
          <FaShoppingCart />
        </Link>
      </div>

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
              <Link
                className="btn-login"
                to="/signup"
                onClick={() => setMenuOpen(false)}
              >
                Connexion
              </Link>
            </li>
          ) : (
            <>
              <li>
                <button onClick={handleLogout}>Déconnexion</button>
              </li>
            </>
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
