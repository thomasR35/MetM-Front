import { Routes, Route } from "react-router-dom";
import AdminLayout from "@/layouts/AdminLayout";
import UsersManagement from "@/pages/admin/UsersManagement";
import ImagesManagement from "@/pages/admin/ImagesManagement";

const AdminDashboard = () => {
  return (
    <Routes>
      <Route path="/" element={<AdminLayout />}>
        {/* ✅ Ajout d'un écran par défaut si l'admin arrive sur /admin/dashboard */}
        <Route index element={<h2>Bienvenue sur le Dashboard</h2>} />

        {/* ✅ Routes correctes pour UsersManagement et ImagesManagement */}
        <Route path="users" element={<UsersManagement />} />
        <Route path="images" element={<ImagesManagement />} />
      </Route>
    </Routes>
  );
};

export default AdminDashboard;
