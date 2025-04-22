import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
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
    e.stopPropagation();
    setPostLoginRedirect(null);
    setShowSignup(true);
    setMenuOpen(false);
  };

  const handleRegisterClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setPostLoginRedirect(null);
    setShowRegister(true);
    setMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="burger-menu" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <FaTimes /> : <FaBars />}
        </div>

        <Link className="logo" to="/">
          Marcelle & Maurice Shop
        </Link>

        <div className={`nav-center ${menuOpen ? "open" : ""}`}>
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

        <div className="nav-right">
          <Link className="cart-icon" to="/panier">
            <FaShoppingCart />
            {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
          </Link>
        </div>
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
            <>
              <li>
                <button className="btn-login" onClick={handleLoginClick}>
                  Connexion
                </button>
              </li>
              <li>
                <button className="btn-register" onClick={handleRegisterClick}>
                  Inscription
                </button>
              </li>
            </>
          ) : (
            <li>
              <button className="btn-logout" onClick={handleLogout}>
                Déconnexion
              </button>
            </li>
          )}

          {isAdmin && (
            <li>
              <Link
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
