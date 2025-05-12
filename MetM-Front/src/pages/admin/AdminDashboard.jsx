// src/pages/AdminDashboard.jsx
//=====================================
import React from "react";
import { Routes, Route } from "react-router-dom";

import AdminLayout from "@/layouts/AdminLayout";
import UsersManagement from "@/pages/admin/UsersManagement";
import ImagesManagement from "@/pages/admin/ImagesManagement";
import { useAdminUser } from "@/hooks/admin/adminDashboardPage/useAdminUser";

export default function AdminDashboard() {
  const user = useAdminUser();
  const adminName = user?.username || "Inconnu";

  return (
    <Routes>
      <Route path="/" element={<AdminLayout />}>
        <Route
          index
          element={<h2>Bienvenue sur le Dashboard Admin ({adminName})</h2>}
        />
        <Route path="users" element={<UsersManagement />} />
        <Route path="images" element={<ImagesManagement />} />
      </Route>
    </Routes>
  );
}
