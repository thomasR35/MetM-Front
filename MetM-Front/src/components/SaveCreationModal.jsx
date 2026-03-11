// src/components/SaveCreationModal.jsx
// ========================
import { createPortal } from "react-dom";
import { useEffect, useRef } from "react";
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
    handleSave,
    handleAuthClick,
    saving,
    user,
    onClose,
  } = useSaveCreation(props);

  const overlayRef = useRef(null);
  const firstFocusableRef = useRef(null);

  if (!props.isOpen) return null;

  useEffect(() => {
    const previousActive = document.activeElement;
    firstFocusableRef.current?.focus();
    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("keydown", handleKey);
      previousActive?.focus();
    };
  }, [onClose]);

  if (!user) {
    return createPortal(
      <div
        className="modal-overlay"
        role="dialog"
        aria-modal="true"
        aria-labelledby="auth-title"
        aria-describedby="auth-desc"
        ref={overlayRef}
      >
        <div className="modal" role="document">
          <button
            ref={firstFocusableRef}
            className="close-btn"
            onClick={onClose}
            aria-label="Fermer la fenêtre de connexion requise"
          >
            ×
          </button>
          <h2 id="auth-title">Connexion requise</h2>
          <p id="auth-desc">
            Vous devez être connecté pour enregistrer votre création.
          </p>
          <button
            className="apply-btn"
            onClick={handleAuthClick}
            aria-label="Ouvrir la fenêtre de connexion"
          >
            Se connecter
          </button>
        </div>
      </div>,
      document.body,
    );
  }

  return createPortal(
    <div
      className="modal-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="save-modal-title"
      aria-describedby="save-modal-desc"
      ref={overlayRef}
      onClick={(e) => e.target === overlayRef.current && onClose()}
    >
      <div className="modal" role="document">
        <button
          ref={firstFocusableRef}
          className="close-btn"
          onClick={onClose}
          aria-label="Fermer la fenêtre d’enregistrement"
        >
          ×
        </button>
        <h2 id="save-modal-title">Enregistrer la création</h2>
        <p id="save-modal-desc" className="sr-only">
          Saisissez un ou plusieurs mots-clés puis cliquez sur "Sauvegarder".
        </p>

        <div
          id="preview-region"
          className="preview"
          role="region"
          aria-labelledby="save-modal-title"
        >
          <MockupProduct
            productImage={props.productImages[props.currentSlide]}
            croppedImageData={props.croppedImageData}
            customText={props.customText}
            textOptions={props.textOptions}
            cropArea={props.cropArea}
            alt={`Aperçu du produit personnalisé ${
              props.productImages[props.currentSlide].alt || ""
            }`}
          />
        </div>

        <div
          className="keyword-input"
          role="group"
          aria-labelledby="keyword-label"
        >
          <label id="keyword-label" htmlFor="keyword">
            Ajouter un mot-clé :
          </label>
          <input
            id="keyword"
            list="keywords-list"
            value={keywordInput}
            onChange={(e) => setKeywordInput(e.target.value)}
            aria-required="true"
            aria-describedby="keyword-help"
          />
          <p id="keyword-help" className="sr-only">
            Commencez à taper pour filtrer les mots-clés existants, puis appuyez
            sur Ajouter.
          </p>
          <datalist id="keywords-list">
            {availableKeywords.map((kw) => (
              <option key={kw.id} value={kw.name} />
            ))}
          </datalist>
          <button
            type="button"
            className="generic-button"
            onClick={addKeyword}
            aria-label="Ajouter le mot-clé saisi"
          >
            Ajouter
          </button>
        </div>

        <ul
          className="keywords-list"
          aria-live="polite"
          aria-relevant="additions removals"
        >
          {selectedKeywords.map((kw) => (
            <li key={kw}>
              {kw}{" "}
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
          aria-disabled={saving}
          disabled={saving}
        >
          {saving ? "Enregistrement…" : "Sauvegarder"}
        </button>
      </div>
    </div>,
    document.body,
  );
}
