// src/pages/admin/UsersManagement.jsx
//=====================================
import React, { useState } from "react";
import { createPortal } from "react-dom";
import "@/styles/pages/_admin.scss";

import { useUserManagement } from "@/hooks/admin/adminUserManagement/useUserManagement";
import { useUserEditModal } from "@/hooks/admin/adminUserManagement/useUserEditModal";

export default function UsersManagement() {
  const { users, loading, addUser, editUser, removeUser } = useUserManagement();

  const {
    isOpen: isModalOpen,
    selected: selectedUser,
    formData: editData,
    setFormData: setEditData,
    open: openEditModal,
    close: closeEditModal,
  } = useUserEditModal();

  // Formulaire de création
  const [newUser, setNewUser] = useState({
    username: "",
    email: "",
    password: "",
    role: "user",
  });

  const handleCreate = async (e) => {
    e.preventDefault();
    await addUser(newUser);
    setNewUser({ username: "", email: "", password: "", role: "user" });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!selectedUser) return;
    await editUser(selectedUser.id, {
      username: editData.username,
      email: editData.email,
      role: editData.role,
    });
    closeEditModal();
  };

  return (
    <main>
      <h2>Gestion des utilisateurs</h2>

      {/* Ajout d’un utilisateur */}
      <section className="form-container">
        <form onSubmit={handleCreate}>
          <input
            type="text"
            placeholder="Nom d’utilisateur"
            value={newUser.username}
            onChange={(e) =>
              setNewUser((u) => ({ ...u, username: e.target.value }))
            }
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={newUser.email}
            onChange={(e) =>
              setNewUser((u) => ({ ...u, email: e.target.value }))
            }
            required
          />
          <input
            type="password"
            placeholder="Mot de passe"
            value={newUser.password}
            onChange={(e) =>
              setNewUser((u) => ({ ...u, password: e.target.value }))
            }
            required
          />
          <select
            value={newUser.role}
            onChange={(e) =>
              setNewUser((u) => ({ ...u, role: e.target.value }))
            }
          >
            <option value="user">Utilisateur</option>
            <option value="admin">Admin</option>
          </select>
          <button type="submit" className="btn btn-primary">
            Ajouter
          </button>
        </form>
      </section>

      {/* Liste des utilisateurs */}
      <section>
        <h2>Liste des utilisateurs</h2>
        {loading ? (
          <p>Chargement…</p>
        ) : (
          <>
            <p>
              {users.length} utilisateur{users.length > 1 ? "s" : ""}
            </p>
            <table className="table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nom</th>
                  <th>Email</th>
                  <th>Rôle</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr key={u.id}>
                    <td>{u.id}</td>
                    <td>{u.username}</td>
                    <td>{u.email}</td>
                    <td>{u.role || "user"}</td>
                    <td className="table-actions">
                      <button
                        className="btn btn-warning btn-sm"
                        onClick={() => openEditModal(u)}
                      >
                        Modifier
                      </button>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => removeUser(u.id)}
                      >
                        Supprimer
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}
      </section>

      {/* Modale d’édition */}
      {isModalOpen &&
        selectedUser &&
        createPortal(
          <div className="modal-overlay">
            <div className="modal">
              <button className="close-btn" onClick={closeEditModal}>
                &times;
              </button>
              <h3>Modifier l’utilisateur #{selectedUser.id}</h3>
              <form onSubmit={handleUpdate}>
                <label>Nom</label>
                <input
                  type="text"
                  value={editData.username}
                  onChange={(e) =>
                    setEditData((d) => ({ ...d, username: e.target.value }))
                  }
                  required
                />
                <label>Email</label>
                <input
                  type="email"
                  value={editData.email}
                  onChange={(e) =>
                    setEditData((d) => ({ ...d, email: e.target.value }))
                  }
                  required
                />
                <label>Rôle</label>
                <select
                  value={editData.role}
                  onChange={(e) =>
                    setEditData((d) => ({ ...d, role: e.target.value }))
                  }
                >
                  <option value="user">Utilisateur</option>
                  <option value="admin">Admin</option>
                </select>
                <button type="submit" className="btn btn-success">
                  Mettre à jour
                </button>
              </form>
            </div>
          </div>,
          document.body
        )}
    </main>
  );
}
