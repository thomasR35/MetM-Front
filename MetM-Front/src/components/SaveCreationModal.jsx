// src/components/SaveCreationModal.jsx
// ========================
import React from "react";
import { createPortal } from "react-dom";
import "@/styles/components/_saveCreationModal.scss";
import { useSaveCreation } from "@/hooks/components/saveCreationModal/useSaveCreation";
import MockupProduct from "@/components/MockupProduct";

export default function SaveCreationModal(props) {
  const {
    availableKeywords,
    selectedKeywords,
    keywordInput,
    setKeywordInput,
    addKeyword,
    removeKeyword,
    previewUrl,
    handleSave,
    handleAuthClick,
    user,
    onClose,
    saving,
  } = useSaveCreation(props);

  if (!props.isOpen) return null;

  // Si non connecté
  if (!user) {
    return createPortal(
      <div className="modal-overlay" role="dialog" aria-modal="true">
        <div className="modal">
          <button className="close-btn" onClick={onClose}>
            ×
          </button>
          <h2>Connexion requise</h2>
          <p>Vous devez être connecté pour enregistrer votre création.</p>
          <button className="apply-btn" onClick={handleAuthClick}>
            Se connecter
          </button>
        </div>
      </div>,
      document.body
    );
  }

  // Modale d’enregistrement
  return createPortal(
    <div
      className="modal-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="save-modal-title"
    >
      <div className="modal">
        <button className="close-btn" onClick={onClose}>
          ×
        </button>
        <h2 id="save-modal-title">Enregistrer la création</h2>

        <div className="preview">
          <MockupProduct
            productImage={props.productImages[props.currentSlide]}
            croppedImageData={props.croppedImageData}
            customText={props.customText}
            textOptions={props.textOptions}
            cropArea={props.cropArea}
          />
        </div>

        <div className="keyword-input">
          <label htmlFor="keyword">Ajouter un mot-clé :</label>
          <input
            id="keyword"
            list="keywords-list"
            value={keywordInput}
            onChange={(e) => setKeywordInput(e.target.value)}
          />
          <datalist id="keywords-list">
            {availableKeywords.map((kw) => (
              <option key={kw.id} value={kw.name} />
            ))}
          </datalist>
          <button type="button" className="generic-button" onClick={addKeyword}>
            Ajouter
          </button>
        </div>

        <ul className="keywords-list">
          {selectedKeywords.map((kw) => (
            <li key={kw}>
              {kw}
              <button
                className="close-btn"
                aria-label={`Supprimer ${kw}`}
                onClick={() => removeKeyword(kw)}
              >
                ×
              </button>
            </li>
          ))}
        </ul>

        <button
          type="button"
          className="generic-button"
          onClick={handleSave}
          disabled={saving}
        >
          {saving ? "Enregistrement…" : "Sauvegarder"}
        </button>
      </div>
    </div>,
    document.body
  );
}
