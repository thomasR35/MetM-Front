// NewUserForm.jsx
// ================
import { useState } from "react";
export default function NewUserForm({ onCreate }) {
  const [newUser, setNewUser] = useState({
    username: "",
    email: "",
    password: "",
    role: "user",
  });
  const handleCreate = (e) => {
    e.preventDefault();
    onCreate(newUser);
    setNewUser({ username: "", email: "", password: "", role: "user" });
  };
  return (
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
          onChange={(e) => setNewUser((u) => ({ ...u, email: e.target.value }))}
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
          onChange={(e) => setNewUser((u) => ({ ...u, role: e.target.value }))}
        >
          <option value="user">Utilisateur</option>
          <option value="admin">Admin</option>
        </select>
        <button type="submit" className="btn btn-primary">
          Ajouter
        </button>
      </form>
    </section>
  );
}
