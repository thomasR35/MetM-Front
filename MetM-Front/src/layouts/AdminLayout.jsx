import React from "react";
import { Outlet, useNavigate } from "react-router-dom";

const AdminLayout = () => {
  const navigate = useNavigate();

  // Vérifie si l'admin est connecté
  const isAuthenticated = localStorage.getItem("adminToken");

  if (!isAuthenticated) {
    navigate("/admin/login");
    return null;
  }

  return (
    <div className="container mt-5">
      <h1>Tableau de bord</h1>
      <Outlet /> {/* Affiche les sous-pages du back-office */}
    </div>
  );
};

export default AdminLayout;
