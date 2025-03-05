import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import "./Navbar.scss";

const Navbar = () => {
  const { user, isAuthenticated, isAdmin, logout } = useAuth();

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

            {/* Afficher le bouton "Connexion" ou "Déconnexion" */}
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
                  <button className="nav-link btn btn-danger" onClick={logout}>
                    Déconnexion
                  </button>
                </li>
              </>
            )}

            {/* Afficher le lien Admin uniquement pour les administrateurs */}
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
