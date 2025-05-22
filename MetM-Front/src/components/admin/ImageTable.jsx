const API_BASE = import.meta.env.VITE_API_URL.replace(/\/api\/?$/i, "");

export default function ImagesTable({ images, loading, onEdit, onDelete }) {
  return (
    <section>
      <h2>Images ({images.length})</h2>
      {loading ? (
        <p>Chargement…</p>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Aperçu</th>
              <th>Titre</th>
              <th>Mots-clé</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {images.length === 0 && (
              <tr>
                <td colSpan="5">Aucune image trouvée.</td>
              </tr>
            )}
            {images.map((img) => (
              <tr key={img.id}>
                <td>{img.id}</td>
                <td>
                  <img
                    src={`${API_BASE}${img.url}`}
                    alt={img.title}
                    loading="lazy"
                    className="image-thumbnail"
                  />
                </td>
                <td>{img.title}</td>
                <td>
                  {img.keywords ? img.keywords.split(",").join(", ") : "—"}
                </td>
                <td className="table-actions">
                  <button
                    className="btn btn-warning btn-sm"
                    onClick={() => onEdit(img)}
                  >
                    Modifier
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => {
                      if (window.confirm(`Supprimer l'image #${img.id} ?`)) {
                        onDelete(img.id);
                      }
                    }}
                  >
                    Supprimer
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </section>
  );
}
