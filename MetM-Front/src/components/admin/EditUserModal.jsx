// src/components/admin/EditUserModal.jsx
// ========================
import { createPortal } from "react-dom";

export default function EditUserModal({
  user,
  formData,
  setFormData,
  onClose,
  onUpdate,
}) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

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
        aria-labelledby="edit-user-title"
      >
        <button
          className="admin-modal-close"
          onClick={onClose}
          aria-label="Fermer"
        >
          ✕
        </button>

        <h3 id="edit-user-title">Modifier l'utilisateur</h3>

        <form onSubmit={onUpdate}>
          <div className="form-group">
            <label htmlFor="eu-username">Nom d'utilisateur</label>
            <input
              id="eu-username"
              type="text"
              name="username"
              value={formData.username || ""}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="eu-email">Email</label>
            <input
              id="eu-email"
              type="email"
              name="email"
              value={formData.email || ""}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="eu-password">
              Nouveau mot de passe{" "}
              <span style={{ opacity: 0.4, fontSize: "0.65rem" }}>
                (laisser vide = inchangé)
              </span>
            </label>
            <input
              id="eu-password"
              type="password"
              name="password"
              value={formData.password || ""}
              onChange={handleChange}
              placeholder="••••••••"
              autoComplete="new-password"
            />
          </div>

          <div className="form-group">
            <label htmlFor="eu-role">Rôle</label>
            <select
              id="eu-role"
              name="role"
              value={formData.role || "user"}
              onChange={handleChange}
            >
              <option value="user">Utilisateur</option>
              <option value="admin">Admin</option>
            </select>
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
