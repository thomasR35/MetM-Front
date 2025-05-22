// UsersTable.jsx
export default function UsersTable({ users, loading, onEdit, onDelete }) {
  if (loading) return <p>Chargement…</p>;
  return (
    <>
      <p>
        {users.length} utilisateur{users.length > 1 ? "s" : ""}
      </p>
      <table className="table">
        {/* thead */}
        <tbody>
          {users.map((u) => (
            <tr key={u.id}>
              <td>{u.id}</td>
              <td>{u.username}</td>
              <td>{u.email}</td>
              <td>{u.role || "user"}</td>
              <td className="table-actions">
                <button
                  onClick={() => onEdit(u)}
                  className="btn btn-warning btn-sm"
                >
                  Modifier
                </button>
                <button
                  onClick={() => onDelete(u.id)}
                  className="btn btn-danger btn-sm"
                >
                  Supprimer
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
