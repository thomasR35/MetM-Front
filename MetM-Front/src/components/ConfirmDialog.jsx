// src/components/ConfirmDialog.jsx
//======================================
import React from "react";
import { createPortal } from "react-dom";
import "@/styles/components/_confirmDialog.scss";

export default function ConfirmDialog({
  isOpen,
  title,
  message,
  confirmLabel = "Confirmer",
  cancelLabel = "Annuler",
  onConfirm,
  onCancel,
}) {
  if (!isOpen) return null;

  return createPortal(
    <div className="confirm-overlay">
      <div
        className="confirm-box"
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="confirm-title"
        aria-describedby="confirm-message"
      >
        <h2 id="confirm-title" className="confirm-title">
          {title}
        </h2>
        <p id="confirm-message" className="confirm-message">
          {message}
        </p>
        <div className="confirm-actions">
          <button className="btn validate-button" onClick={onConfirm} autoFocus>
            {confirmLabel}
          </button>
          <button className="btn cancel-button" onClick={onCancel}>
            {cancelLabel}
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}
