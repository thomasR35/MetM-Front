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
    role: "user", // Ajout d'un rôle par défaut
  });
  const [editUser, setEditUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 🔹 Charger les utilisateurs
  useEffect(() => {
    axios
      .get("http://metm-back.local/api/users")
      .then((response) => setUsers(response.data))
      .catch((error) => console.error("Erreur de chargement", error));
  }, []);

  // 🔹 Gérer l'ajout d'un utilisateur
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/users", newUser);
      setUsers([...users, response.data]); // Utiliser l'ID retourné par l'API
      setNewUser({ username: "", email: "", password: "", role: "user" }); // Réinitialisation du formulaire
    } catch (error) {
      console.error("Erreur lors de l'ajout", error);
    }
  };

  // 🔹 Supprimer un utilisateur
  const handleDelete = async (id) => {
    try {
      await axios.delete(`/users/${id}`);
      setUsers(users.filter((user) => user.id !== id));
    } catch (error) {
      console.error("Erreur lors de la suppression", error);
    }
  };

  // 🔹 Ouvrir la modale d'édition
  const openEditModal = (user) => {
    setEditUser(user);
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
      await axios.put(`/users/${editUser.id}`, editUser);
      setUsers(users.map((u) => (u.id === editUser.id ? editUser : u)));
      closeModal();
    } catch (error) {
      console.error("Erreur lors de la mise à jour", error);
    }
  };

  return (
    <main className="admin-content">
      <h2>Gestion des utilisateurs</h2>

      {/* 🔹 Formulaire d'ajout */}
      <section className="form-container">
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
          >
            <option value="user">Utilisateur</option>
            <option value="admin">Administrateur</option>
          </select>
          <button type="submit">Ajouter</button>
        </form>
      </section>

      {/* 🔹 Liste des utilisateurs */}
      <section className="table-container">
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
                <td>{user.role}</td>
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

      {isModalOpen &&
        createPortal(
          <div className="modal-overlay">
            <div className="modal">
              <header>
                <span className="close" onClick={closeModal}>
                  &times;
                </span>
                <h3>Modifier l'utilisateur</h3>
              </header>
              <form onSubmit={handleUpdate}>
                <label>Nom d'utilisateur</label>
                <input
                  type="text"
                  value={editUser.username}
                  onChange={(e) =>
                    setEditUser({ ...editUser, username: e.target.value })
                  }
                  required
                />
                <label>Email</label>
                <input
                  type="email"
                  value={editUser.email}
                  onChange={(e) =>
                    setEditUser({ ...editUser, email: e.target.value })
                  }
                  required
                />
                <label>Rôle</label>
                <select
                  value={editUser.role}
                  onChange={(e) =>
                    setEditUser({ ...editUser, role: e.target.value })
                  }
                >
                  <option value="user">Utilisateur</option>
                  <option value="admin">Administrateur</option>
                </select>
                <button type="submit">Mettre à jour</button>
              </form>
            </div>
          </div>,
          document.body
        )}
    </main>
  );
};

export default UsersManagement;
