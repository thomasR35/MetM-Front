import { Link } from "react-router-dom";

const AdminSidebar = () => {
  return (
    <div
      className="admin-sidebar bg-light p-3"
      style={{ width: "250px", height: "100vh", position: "fixed" }}
    >
      <h3>Admin</h3>
      <ul className="nav flex-column">
        <li className="nav-item">
          <Link to="/admin/dashboard/users" className="nav-link">
            👤 Gestion des utilisateurs
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/admin/dashboard/images" className="nav-link">
            🖼️ Gestion des images
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default AdminSidebar;
