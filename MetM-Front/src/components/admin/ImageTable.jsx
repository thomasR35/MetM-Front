// src/components/admin/ImageTable.jsx
//=====================================
import { useState, useEffect } from "react";

const API_BASE = import.meta.env.VITE_API_URL.replace(/\/api\/?$/i, "");

export default function ImagesTable({ images, loading, onEdit, onDelete }) {
  const [selectedIds, setSelectedIds] = useState([]);
  const allSelected = images.length > 0 && selectedIds.length === images.length;
  const toggleAll = () => {
    if (allSelected) {
      setSelectedIds([]);
    } else {
      setSelectedIds(images.map((img) => img.id));
    }
  };

  const toggleOne = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const handleBulkDelete = () => {
    if (
      selectedIds.length > 0 &&
      window.confirm(`Supprimer ${selectedIds.length} image(s) ?`)
    ) {
      Promise.all(selectedIds.map((id) => onDelete(id))).then(() => {
        setSelectedIds([]);
      });
    }
  };

  useEffect(() => {
    setSelectedIds((prev) =>
      prev.filter((id) => images.some((img) => img.id === id))
    );
  }, [images]);

  return (
    <section>
      <h2>Images ({images.length})</h2>

      {selectedIds.length > 0 && (
        <button className="btn btn-danger mb-3" onClick={handleBulkDelete}>
          Supprimer {selectedIds.length} image
          {selectedIds.length > 1 ? "s" : ""}
        </button>
      )}

      {loading ? (
        <p>Chargement…</p>
      ) : (
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
              <th>Aperçu</th>
              <th>Titre</th>
              <th>Mots-clé</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {images.length === 0 && (
              <tr>
                <td colSpan="6">Aucune image trouvée.</td>
              </tr>
            )}
            {images.map((img) => {
              const isChecked = selectedIds.includes(img.id);
              return (
                <tr key={img.id}>
                  <td>
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => toggleOne(img.id)}
                      aria-label={
                        isChecked
                          ? `Désélectionner image ${img.id}`
                          : `Sélectionner image ${img.id}`
                      }
                    />
                  </td>
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
                      className="btn btn-warning btn-sm me-2"
                      onClick={() => onEdit(img)}
                    >
                      Modifier
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => {
                        if (window.confirm(`Supprimer l'image #${img.id} ?`)) {
                          onDelete(img.id);
                          setSelectedIds((prev) =>
                            prev.filter((x) => x !== img.id)
                          );
                        }
                      }}
                    >
                      Supprimer
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </section>
  );
}
