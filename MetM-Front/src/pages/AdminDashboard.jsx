import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import AdminLayout from "@/layouts/AdminLayout";
import UsersManagement from "@/pages/admin/UsersManagement";
import ImagesManagement from "@/pages/admin/ImagesManagement";

const AdminDashboard = () => {
  const [adminName, setAdminName] = useState("");

  useEffect(() => {
    const userData = localStorage.getItem("user");
    console.log("📥 Contenu de localStorage.user :", userData);

    if (userData) {
      try {
        const user = JSON.parse(userData);
        console.log("👤 Admin récupéré :", user);
        if (user && user.username) {
          setAdminName(user.username);
        }
      } catch (error) {
        console.error("❌ Erreur lors du parsing de l'utilisateur :", error);
      }
    }
  }, []);

  return (
    <Routes>
      <Route path="/" element={<AdminLayout />}>
        <Route
          index
          element={
            <h2>
              Bienvenue sur le Dashboard Admin (
              {adminName ? adminName : "Inconnu"})
            </h2>
          }
        />
        <Route path="users" element={<UsersManagement />} />
        <Route path="images" element={<ImagesManagement />} />
      </Route>
    </Routes>
  );
};

export default AdminDashboard;
