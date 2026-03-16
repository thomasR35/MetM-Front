// src/components/AccountModal.jsx
// ===============================
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";
import { useConfirm } from "@/hooks/components/confirmDialog/useConfirm";

export default function AccountModal({ isOpen, onClose }) {
  const navigate = useNavigate();
  const { confirm, ConfirmUI } = useConfirm();

  if (!isOpen) return null;

  const handleDelete = async () => {
    try {
      await confirm({
        title: "Supprimer votre compte ?",
        message: "Cette action est irréversible. Voulez-vous continuer ?",
        confirmLabel: "Oui, supprimer",
        cancelLabel: "Non, annuler",
      });
      await fetch("/api/users/me", {
        method: "DELETE",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      });
      onClose();
      navigate("/");
      window.location.reload();
    } catch {}
  };

  return createPortal(
    <>
      {/* overlay flex → centrage garanti sur tous écrans */}
      <div
        className="account-modal-overlay"
        onClick={onClose}
        aria-hidden="true"
      >
        <div
          className="account-modal"
          role="dialog"
          aria-modal="true"
          aria-labelledby="account-modal-title"
          onClick={(e) => e.stopPropagation()}
        >
          <button className="close-btn" aria-label="Fermer" onClick={onClose}>
            ×
          </button>

          <h2 id="account-modal-title">Mon compte</h2>

          <ul className="account-options">
            <li>
              <button
                onClick={() => {
                  onClose();
                  navigate("/account/creations");
                }}
              >
                Mes créations
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  onClose();
                  navigate("/account/orders");
                }}
              >
                Mes commandes
              </button>
            </li>
            <li>
              <button className="btn-delete" onClick={handleDelete}>
                Supprimer mon compte
              </button>
            </li>
          </ul>
        </div>
      </div>

      <ConfirmUI />
    </>,
    document.body,
  );
}
