// src/pages/admin/UsersManagement.jsx
//=====================================
import "@/styles/pages/_admin.scss";

import { useUserManagement } from "@/hooks/admin/adminUserManagement/useUserManagement";
import { useUserEditModal } from "@/hooks/admin/adminUserManagement/useUserEditModal";

import NewUserForm from "@/components/admin/NewUserForm";
import UsersTable from "@/components/admin/UsersTables";
import EditUserModal from "@/components/admin/EditUserModal";

export default function UsersManagement() {
  const { users, loading, addUser, editUser, removeUser } = useUserManagement();
  const { isOpen, selectedUser, formData, setFormData, open, close } =
    useUserEditModal();

  return (
    <main className="admin-users-management">
      <h2>Gestion des utilisateurs</h2>

      <NewUserForm onCreate={addUser} />

      <section>
        <h2>Liste des utilisateurs</h2>
        <UsersTable
          users={users}
          loading={loading}
          onEdit={open}
          onDelete={removeUser}
        />
      </section>

      {isOpen && selectedUser && (
        <EditUserModal
          user={selectedUser}
          formData={formData}
          setFormData={setFormData}
          onClose={close}
          onUpdate={(e) => {
            e.preventDefault();
            editUser(selectedUser.id, formData);
            close();
          }}
        />
      )}
    </main>
  );
}
