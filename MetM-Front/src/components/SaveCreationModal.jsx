// src/components/SaveCreationModal.jsx
// ========================
import React from "react";
import { createPortal } from "react-dom";
import "@/styles/components/_saveCreationModal.scss";
import { useSaveCreation } from "@/hooks/components/saveCreationModal/useSaveCreation";

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
  } = useSaveCreation(props);

  // Cas modal fermée
  if (!props.isOpen) return null;

  // Si pas connecté, on propose la connexion
  if (!user) {
    return createPortal(
      <div className="modal-overlay" role="dialog" aria-modal="true">
        <div className="modal">
          <button className="close-btn" onClick={onClose} aria-label="Fermer">
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

  // Modal d'enregistrement
  return createPortal(
    <div
      className="modal-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="save-modal-title"
    >
      <div className="modal">
        <button className="close-btn" onClick={onClose} aria-label="Fermer">
          ×
        </button>
        <h2 id="save-modal-title">Enregistrer la création</h2>

        <div className="preview">
          {previewUrl ? (
            <img src={previewUrl} alt="Aperçu de la création" />
          ) : (
            <p>Aucun aperçu disponible</p>
          )}
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
          <button type="button" onClick={addKeyword} className="generic-button">
            Ajouter
          </button>
        </div>

        <ul className="keywords-list">
          {selectedKeywords.map((kw) => (
            <li key={kw}>
              {kw}{" "}
              <button
                onClick={() => removeKeyword(kw)}
                className="close-btn"
                aria-label={`Supprimer ${kw}`}
              >
                ×
              </button>
            </li>
          ))}
        </ul>

        <button type="button" onClick={handleSave} className="generic-button">
          Sauvegarder
        </button>
      </div>
    </div>,
    document.body
  );
}
