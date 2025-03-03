import { useState, useEffect } from "react";
import axios from "@/api/axiosConfig";

const UsersManagement = () => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({
    username: "",
    email: "",
    password: "",
  });

  // Charger les utilisateurs
  useEffect(() => {
    axios
      .get("/users")
      .then((response) => setUsers(response.data))
      .catch((error) => console.error("Erreur de chargement", error));
  }, []);

  // Gérer l'ajout d'un utilisateur
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/users", newUser);
      setUsers([...users, newUser]);
    } catch (error) {
      console.error("Erreur lors de l'ajout", error);
    }
  };

  return (
    <div>
      <h2>Gestion des utilisateurs</h2>

      {/* Formulaire d'ajout */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nom d'utilisateur"
          onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
          required
        />
        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
          required
        />
        <input
          type="password"
          placeholder="Mot de passe"
          onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
          required
        />
        <button type="submit">Ajouter</button>
      </form>

      {/* Liste des utilisateurs */}
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nom</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>
                <button>Modifier</button>
                <button>Supprimer</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersManagement;
