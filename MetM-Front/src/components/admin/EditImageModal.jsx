// src/components/admin/EditImageModal.jsx
// ========================
import { createPortal } from "react-dom";

const BASE_URL = import.meta.env.VITE_API_URL || "";

export default function EditImageModal({
  image,
  editData,
  setEditData,
  onClose,
  onUpdate,
}) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({ ...prev, [name]: value }));
  };

  const handleKeywordsChange = (e) => {
    setEditData((prev) => ({ ...prev, keywords: e.target.value }));
  };

  const removeKeyword = (kw) => {
    const updated = (editData.keywords || "")
      .split(",")
      .map((k) => k.trim())
      .filter((k) => k && k !== kw)
      .join(", ");
    setEditData((prev) => ({ ...prev, keywords: updated }));
  };

  const keywordList = (editData.keywords || "")
    .split(",")
    .map((k) => k.trim())
    .filter(Boolean);

  return createPortal(
    <div
      className="admin-modal-overlay"
      role="presentation"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        className="admin-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="edit-image-title"
      >
        <button
          className="admin-modal-close"
          onClick={onClose}
          aria-label="Fermer"
        >
          ✕
        </button>

        <h3 id="edit-image-title">Modifier l'image</h3>

        {/* Aperçu */}
        {image?.filename && (
          <div className="image-preview">
            <img
              src={`${BASE_URL}/uploads/${image.filename}`}
              alt={editData.title || image.filename}
            />
          </div>
        )}

        <form onSubmit={onUpdate}>
          <div className="form-group">
            <label htmlFor="ei-title">Titre</label>
            <input
              id="ei-title"
              type="text"
              name="title"
              value={editData.title || ""}
              onChange={handleChange}
            />
          </div>

          {/* Tags actuels */}
          {keywordList.length > 0 && (
            <div className="form-group">
              <label>Mots-clé associés</label>
              <div className="keywords-tags">
                {keywordList.map((kw) => (
                  <span key={kw}>
                    {kw}
                    <button
                      type="button"
                      onClick={() => removeKeyword(kw)}
                      aria-label={`Retirer ${kw}`}
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Champ texte brut en secours */}
          <div className="form-group">
            <label htmlFor="ei-keywords">
              Mots-clé{" "}
              <span style={{ opacity: 0.4, fontSize: "0.65rem" }}>
                (séparés par virgules)
              </span>
            </label>
            <input
              id="ei-keywords"
              type="text"
              name="keywords"
              value={editData.keywords || ""}
              onChange={handleKeywordsChange}
              placeholder="chat, roux, mignon…"
            />
          </div>

          <div className="admin-modal-actions">
            <button type="button" className="btn-cancel" onClick={onClose}>
              Annuler
            </button>
            <button type="submit" className="btn-save">
              Sauvegarder
            </button>
          </div>
        </form>
      </div>
    </div>,
    document.body,
  );
}
