// src/layouts/AdminLayout.jsx
// ========================
import { useEffect, useState } from "react";
import { Outlet, useNavigate, NavLink } from "react-router-dom";

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

  if (!isAuthenticated) return null;

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin/login");
  };

  return (
    <div className="admin-layout">
      <nav className="admin-sidebar">
        <div className="admin-sidebar__top">
          <h2>
            Admin
            <span>M &amp; M Shop</span>
          </h2>

          <ul className="nav">
            <li>
              <NavLink
                className={({ isActive }) =>
                  "nav-link" + (isActive ? " active" : "")
                }
                to="/admin/dashboard/users"
              >
                <svg
                  viewBox="0 0 16 16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  aria-hidden="true"
                >
                  <circle cx="6" cy="5" r="2.5" />
                  <path d="M1 13c0-2.8 2.2-5 5-5h0c2.8 0 5 2.2 5 5" />
                  <circle cx="12" cy="5" r="2" />
                  <path d="M14 13c0-2-1.3-3.7-3-4.5" />
                </svg>
                Utilisateurs
              </NavLink>
            </li>
            <li>
              <NavLink
                className={({ isActive }) =>
                  "nav-link" + (isActive ? " active" : "")
                }
                to="/admin/dashboard/images"
              >
                <svg
                  viewBox="0 0 16 16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  aria-hidden="true"
                >
                  <rect x="1.5" y="3" width="13" height="10" rx="1.5" />
                  <circle cx="5.5" cy="6.5" r="1" />
                  <path d="M1.5 11l3.5-3 2.5 2.5 2-2 4 4" />
                </svg>
                Images
              </NavLink>
            </li>
          </ul>
        </div>

        <div className="admin-sidebar__bottom">
          <button className="back-to-shop-btn" onClick={() => navigate("/")}>
            ← Retour au shop
          </button>
          <button className="logout-btn" onClick={handleLogout}>
            Déconnexion
          </button>
        </div>
      </nav>

      <div className="admin-content">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
