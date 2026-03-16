// src/pages/admin/UsersManagement.jsx
//=====================================
import { useState } from "react";
import { useUserManagement } from "@/hooks/admin/adminUserManagement/useUserManagement";
import { useUserEditModal } from "@/hooks/admin/adminUserManagement/useUserEditModal";
import NewUserForm from "@/components/admin/NewUserForm";
import UsersTable from "@/components/admin/UsersTable";
import EditUserModal from "@/components/admin/EditUserModal";
import ConfirmDialog from "@/components/ConfirmDialog";

export default function UsersManagement() {
  const { users, loading, addUser, editUser, removeUser } = useUserManagement();

  // ⚠️ le hook expose `selected` (pas `selectedUser`)
  const { isOpen, selected, formData, setFormData, open, close } =
    useUserEditModal();

  // État pour la modale de confirmation suppression
  const [confirmState, setConfirmState] = useState({
    isOpen: false,
    userId: null,
    username: "",
  });

  const askDelete = (user) => {
    setConfirmState({
      isOpen: true,
      userId: user.id,
      username: user.username,
    });
  };

  const confirmDelete = async () => {
    await removeUser(confirmState.userId);
    setConfirmState({ isOpen: false, userId: null, username: "" });
  };

  const cancelDelete = () => {
    setConfirmState({ isOpen: false, userId: null, username: "" });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    await editUser(selected.id, formData);
    close();
  };

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
          onDelete={askDelete}
        />
      </section>

      {/* Modale édition — conditionné sur `selected` (nom correct du hook) */}
      {isOpen && selected && (
        <EditUserModal
          user={selected}
          formData={formData}
          setFormData={setFormData}
          onClose={close}
          onUpdate={handleUpdate}
        />
      )}

      {/* Modale confirmation suppression */}
      <ConfirmDialog
        isOpen={confirmState.isOpen}
        title="Supprimer l'utilisateur"
        message={`Supprimer définitivement « ${confirmState.username} » ? Cette action est irréversible.`}
        confirmLabel="Supprimer"
        cancelLabel="Annuler"
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
      />
    </main>
  );
}
