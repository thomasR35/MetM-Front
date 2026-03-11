// src/components/admin/UsersTable.jsx
//====================================
import { useState, useEffect } from "react";

export default function UsersTable({ users, loading, onEdit, onDelete }) {
  const [selectedIds, setSelectedIds] = useState([]);
  const allSelected = users.length > 0 && selectedIds.length === users.length;

  const toggleAll = () => {
    setSelectedIds(allSelected ? [] : users.map((u) => u.id));
  };

  const toggleOne = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  };

  // Nettoyage si des users ont été supprimés
  useEffect(() => {
    setSelectedIds((prev) =>
      prev.filter((id) => users.some((u) => u.id === id)),
    );
  }, [users]);

  if (loading)
    return (
      <p
        style={{
          fontFamily: "'Jost', sans-serif",
          fontSize: "0.8rem",
          color: "rgba(42,31,26,0.4)",
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          padding: "1rem 0",
        }}
      >
        Chargement…
      </p>
    );

  return (
    <>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "0.6rem",
        }}
      >
        <p className="table-count">
          {users.length} utilisateur{users.length > 1 ? "s" : ""}
        </p>

        {selectedIds.length > 0 && (
          <button
            className="btn-delete"
            onClick={() =>
              onDelete({
                bulk: true,
                ids: selectedIds,
                onDone: () => setSelectedIds([]),
              })
            }
          >
            Supprimer {selectedIds.length} sélectionné
            {selectedIds.length > 1 ? "s" : ""}
          </button>
        )}
      </div>

      <div className="table-container">
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
              <th>Nom d'utilisateur</th>
              <th>Email</th>
              <th>Rôle</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 && (
              <tr>
                <td
                  colSpan="6"
                  style={{
                    textAlign: "center",
                    color: "rgba(42,31,26,0.35)",
                    fontStyle: "italic",
                  }}
                >
                  Aucun utilisateur trouvé.
                </td>
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
                  <td>
                    <span
                      className={`role-badge ${u.role === "admin" ? "admin" : "user"}`}
                    >
                      {u.role || "user"}
                    </span>
                  </td>
                  <td>
                    <div className="table-actions">
                      <button className="btn-edit" onClick={() => onEdit(u)}>
                        Modifier
                      </button>
                      <button
                        className="btn-delete"
                        onClick={() => {
                          onDelete(u);
                          setSelectedIds((prev) =>
                            prev.filter((x) => x !== u.id),
                          );
                        }}
                      >
                        Supprimer
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}
