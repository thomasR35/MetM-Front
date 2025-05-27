// src/components/admin/UsersTable.jsx
//====================================
import { useState, useEffect, useCallback } from "react";

export default function UsersTable({ users, loading, onEdit, onDelete }) {
  const [selectedIds, setSelectedIds] = useState([]);
  const allSelected = users.length > 0 && selectedIds.length === users.length;
  const toggleAll = () => {
    setSelectedIds(allSelected ? [] : users.map((u) => u.id));
  };

  const toggleOne = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };
  const handleBulkDelete = async () => {
    if (
      selectedIds.length > 0 &&
      window.confirm(`Supprimer ${selectedIds.length} utilisateur(s) ?`)
    ) {
      await Promise.all(selectedIds.map((id) => onDelete(id)));
      setSelectedIds([]);
    }
  };

  useEffect(() => {
    setSelectedIds((prev) =>
      prev.filter((id) => users.some((u) => u.id === id))
    );
  }, [users]);

  if (loading) return <p>Chargement…</p>;

  return (
    <>
      <p>
        {users.length} utilisateur{users.length > 1 ? "s" : ""}
      </p>

      {selectedIds.length > 0 && (
        <button className="btn btn-danger mb-3" onClick={handleBulkDelete}>
          Supprimer {selectedIds.length} utilisateur
          {selectedIds.length > 1 ? "s" : ""}
        </button>
      )}

      <table className="table">
        <thead>
          <tr>
            <th>
              <input
                type="checkbox"
                checked={allSelected}
                onChange={toggleAll}
                aria-label={
                  allSelected ? "Tout désélectionner" : "Tout sélectionner"
                }
              />
            </th>
            <th>ID</th>
            <th>Nom d’utilisateur</th>
            <th>Email</th>
            <th>Rôle</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.length === 0 && (
            <tr>
              <td colSpan="6">Aucun utilisateur trouvé.</td>
            </tr>
          )}
          {users.map((u) => {
            const isChecked = selectedIds.includes(u.id);
            return (
              <tr key={u.id}>
                <td>
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => toggleOne(u.id)}
                    aria-label={
                      isChecked
                        ? `Désélectionner ${u.username}`
                        : `Sélectionner ${u.username}`
                    }
                  />
                </td>
                <td>{u.id}</td>
                <td>{u.username}</td>
                <td>{u.email}</td>
                <td>{u.role || "user"}</td>
                <td className="table-actions">
                  <button
                    onClick={() => onEdit(u)}
                    className="btn btn-warning btn-sm me-2"
                  >
                    Modifier
                  </button>
                  <button
                    onClick={() => {
                      if (window.confirm(`Supprimer l’utilisateur #${u.id}?`)) {
                        onDelete(u.id);
                        setSelectedIds((prev) =>
                          prev.filter((x) => x !== u.id)
                        );
                      }
                    }}
                    className="btn btn-danger btn-sm"
                  >
                    Supprimer
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}
