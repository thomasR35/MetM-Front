import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import axios from "@/api/axiosConfig";
import "@/styles/pages/_admin.scss";

const UsersManagement = () => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({
    username: "",
    email: "",
    password: "",
    role: "user", // ✅ Assure que "user" est la valeur par défaut
  });
  const [editUser, setEditUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 🔹 Fonction pour récupérer les utilisateurs depuis l'API
  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://metm-back.local/api/users");
      setUsers(response.data);
      console.log("📌 Utilisateurs mis à jour :", response.data);
    } catch (error) {
      console.error("❌ Erreur de chargement", error);
    }
  };

  // 🔹 Charger les utilisateurs au montage
  useEffect(() => {
    fetchUsers();
  }, []);

  // 🔹 Gérer l'ajout d'un utilisateur
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("📤 Données envoyées :", newUser);

    try {
      const response = await axios.post("/users", {
        ...newUser,
        role: newUser.role || "user", // ✅ Vérification du rôle avant l'envoi
      });

      if (response.data && response.data.id) {
        console.log("✅ Nouvel utilisateur ajouté :", response.data);

        // ✅ Rafraîchir la liste depuis l'API
        await fetchUsers();

        // ✅ Réinitialiser le formulaire
        resetForm();
      } else {
        console.error("❌ Réponse API invalide :", response.data);
      }
    } catch (error) {
      console.error("❌ Erreur lors de l'ajout", error.response?.data || error);
    }
  };

  // 🔹 Réinitialiser le formulaire
  const resetForm = () => {
    setNewUser({ username: "", email: "", password: "", role: "user" });
  };

  // 🔹 Supprimer un utilisateur
  const handleDelete = async (id) => {
    try {
      await axios.delete(`/users/${id}`);
      await fetchUsers(); // ✅ Rafraîchir la liste après suppression
    } catch (error) {
      console.error("❌ Erreur lors de la suppression", error);
    }
  };

  // 🔹 Ouvrir la modale d'édition
  const openEditModal = (user) => {
    setEditUser({
      ...user,
      role: user.role || "user", // ✅ Forcer un rôle par défaut si vide
    });
    setIsModalOpen(true);
  };

  // 🔹 Fermer la modale
  const closeModal = () => {
    setIsModalOpen(false);
    setEditUser(null);
  };

  // 🔹 Gérer la mise à jour d'un utilisateur
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`/users/${editUser.id}`, {
        ...editUser,
        role: editUser.role || "user", // ✅ S'assurer que le rôle est bien envoyé
      });

      if (response.data) {
        console.log("✅ Utilisateur mis à jour :", response.data);
        await fetchUsers(); // ✅ Rafraîchir la liste après mise à jour
        closeModal();
      } else {
        console.error("❌ Réponse API invalide :", response.data);
      }
    } catch (error) {
      console.error("❌ Erreur lors de la mise à jour", error);
    }
  };

  return (
    <main className="users-management">
      <h2>Gestion des utilisateurs</h2>

      {/* 🔹 Formulaire d'ajout */}
      <section className="users-form">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Nom d'utilisateur"
            value={newUser.username}
            onChange={(e) =>
              setNewUser({ ...newUser, username: e.target.value })
            }
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={newUser.email}
            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
            required
          />
          <input
            type="password"
            placeholder="Mot de passe"
            value={newUser.password}
            onChange={(e) =>
              setNewUser({ ...newUser, password: e.target.value })
            }
            required
          />
          <select
            value={newUser.role}
            onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
            required
          >
            <option value="user">Utilisateur</option>
            <option value="admin">Admin</option>
          </select>

          <button type="submit">Ajouter</button>
        </form>
      </section>

      {/* 🔹 Liste des utilisateurs */}
      <section className="users-list">
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
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.role || "user"}</td>
                {/* ✅ Affichage correct du rôle */}
                <td className="table-actions">
                  <button
                    className="btn btn-warning btn-sm"
                    onClick={() => openEditModal(user)}
                  >
                    Modifier
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(user.id)}
                  >
                    Supprimer
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* 🔹 Modale d'édition */}
      {isModalOpen &&
        editUser &&
        createPortal(
          <div className="modal-overlay">
            <div className="modal">
              <span className="close" onClick={closeModal}>
                &times;
              </span>
              <h3>Modifier l'utilisateur</h3>
              <form onSubmit={handleUpdate}>
                <input
                  type="text"
                  placeholder="Nom d'utilisateur"
                  value={editUser.username}
                  onChange={(e) =>
                    setEditUser({ ...editUser, username: e.target.value })
                  }
                  required
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={editUser.email}
                  onChange={(e) =>
                    setEditUser({ ...editUser, email: e.target.value })
                  }
                  required
                />
                <select
                  value={editUser.role}
                  onChange={(e) =>
                    setEditUser({ ...editUser, role: e.target.value })
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
};

export default UsersManagement;
