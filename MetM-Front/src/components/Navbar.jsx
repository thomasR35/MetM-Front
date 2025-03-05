import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import "@/styles/components/_navbar.scss";

const Navbar = () => {
  const { user, isAuthenticated, isAdmin, logout } = useAuth();

  // 🔥 Fonction pour confirmer la déconnexion
  const handleLogout = () => {
    const confirmLogout = window.confirm(
      "Voulez-vous vraiment vous déconnecter ?"
    );
    if (confirmLogout) {
      logout();
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <Link className="navbar-brand" to="/">
          Marcelle & Maurice Shop
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/gallery">
                Galerie
              </Link>
            </li>

            {!isAuthenticated ? (
              <li className="nav-item">
                <Link className="nav-link btn btn-primary" to="/signup">
                  Connexion
                </Link>
              </li>
            ) : (
              <>
                <li className="nav-item">
                  <span className="nav-link">Bonjour, {user.username}!</span>
                </li>
                <li className="nav-item">
                  <button
                    className="nav-link btn btn-danger"
                    onClick={handleLogout}
                  >
                    Déconnexion
                  </button>
                </li>
              </>
            )}

            {isAdmin && (
              <li className="nav-item">
                <Link
                  className="nav-link btn btn-warning"
                  to="/admin/dashboard"
                >
                  Admin
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
