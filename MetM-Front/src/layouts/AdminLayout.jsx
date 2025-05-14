// src/layouts/AdminLayout.jsx
// ========================
import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "@/styles/pages/_dashboard.scss";

const AdminLayout = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      navigate("/admin/login");
    } else {
      setIsAuthenticated(true);
    }
  }, [navigate]);

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="d-flex">
      <nav className="admin-sidebar bg-dark text-white d-flex flex-column">
        <h2 className="text-center py-3 border-bottom">Admin Panel</h2>
        <ul className="nav flex-column px-2">
          <li className="nav-item">
            <Link
              className="nav-link text-white py-2"
              to="/admin/dashboard/users"
            >
              👥 Gestion des utilisateurs
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className="nav-link text-white py-2"
              to="/admin/dashboard/images"
            >
              🖼 Gestion des images
            </Link>
          </li>
        </ul>

        <div className="mt-auto px-3 pb-4">
          <button
            className="btn btn-danger w-100 mt-4"
            onClick={() => {
              localStorage.removeItem("adminToken");
              navigate("/admin/login");
            }}
          >
            🔴 Déconnexion
          </button>
        </div>
      </nav>

      <div className="admin-content p-4 flex-grow-1">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
