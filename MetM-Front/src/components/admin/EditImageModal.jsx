import React from "react";

export default function EditImageModal({
  image,
  editData,
  setEditData,
  onClose,
  onUpdate,
}) {
  return (
    <div className="modal-overlay" role="dialog" aria-modal="true">
      <div className="modal" role="document">
        <button
          className="close-btn"
          aria-label="Fermer la fenêtre d’édition"
          onClick={onClose}
        >
          &times;
        </button>
        <h3>Modifier l’image #{image.id}</h3>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onUpdate(image.id, editData);
          }}
        >
          <label>Titre</label>
          <input
            type="text"
            value={editData.title}
            onChange={(e) =>
              setEditData((d) => ({ ...d, title: e.target.value }))
            }
            required
          />

          <label>URL</label>
          <input
            type="text"
            value={editData.url}
            onChange={(e) =>
              setEditData((d) => ({ ...d, url: e.target.value }))
            }
            required
          />

          <label>Mots-clé</label>
          <input
            type="text"
            value={editData.keywords}
            onChange={(e) =>
              setEditData((d) => ({ ...d, keywords: e.target.value }))
            }
          />

          <button type="submit" className="btn btn-success">
            Mettre à jour
          </button>
        </form>
      </div>
    </div>
  );
}
