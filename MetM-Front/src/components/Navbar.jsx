import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { FaShoppingCart } from "react-icons/fa";
import "../styles/components/_navbar.scss";

const Navbar = () => {
  const { user, isAuthenticated, isAdmin, logout } = useAuth();

  // 🔥 Confirmation avant déconnexion
  const handleLogout = () => {
    const confirmLogout = window.confirm(
      "Voulez-vous vraiment vous déconnecter ?"
    );
    if (confirmLogout) {
      logout();
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link className="logo" to="/">
          Marcelle & Maurice Shop
        </Link>

        <div className="nav-center">
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
    </nav>
  );
};

export default Navbar;
