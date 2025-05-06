// src/components/SaveCreationModal.jsx
// ========================
import React, { useState, useEffect } from "react";
import { CompositeImage } from "@/services/composite/CompositeImage";
import { uploadImage, fetchKeywords } from "@/api/images";
import { useAuth } from "@/context/AuthContext";
import { useAuthModal } from "@/context/AuthModalContext";
import { toast } from "react-toastify";

export default function SaveCreationModal({
  isOpen,
  onClose,
  productType,
  productImages,
  currentSlide,
  croppedImageData,
  customText,
  textOptions,
  cropArea,
}) {
  const { user } = useAuth();
  const { setShowSignup, setPostLoginRedirect } = useAuthModal();

  const [availableKeywords, setAvailableKeywords] = useState([]);
  const [selectedKeywords, setSelectedKeywords] = useState([]);
  const [keywordInput, setKeywordInput] = useState("");

  // Récupère les mots-clés existants quand la modale s'ouvre
  useEffect(() => {
    if (isOpen && user) {
      fetchKeywords()
        .then((data) => {
          // On attend un tableau d'objets { id, name, ... }
          setAvailableKeywords(Array.isArray(data) ? data : []);
        })
        .catch((err) => {
          console.error("Erreur mots-clés :", err);
          setAvailableKeywords([]);
        });
    }
  }, [isOpen, user]);

  const addKeyword = () => {
    const kw = keywordInput.trim();
    if (kw && !selectedKeywords.includes(kw)) {
      setSelectedKeywords((prev) => [...prev, kw]);
    }
    setKeywordInput("");
  };

  const removeKeyword = (kw) =>
    setSelectedKeywords((prev) => prev.filter((k) => k !== kw));

  // Prépare l'URL d'aperçu
  const previewUrl = croppedImageData?.dataUrl || croppedImageData || "";

  const handleSave = async () => {
    // Si ni image ni texte custom, rien à faire
    if (!croppedImageData && !customText) {
      toast.info("Aucune modification détectée.");
      return;
    }
    try {
      // 1) Génère le composite (texte + image)
      const composite = await CompositeImage.create({
        productImageUrl: productImages[currentSlide],
        croppedData: croppedImageData,
        customText,
        textOptions,
        cropArea,
      });
      const blob = await (await fetch(composite.dataUrl)).blob();

      // 2) Téléverse avec uploaded_by + keywords
      const result = await uploadImage(
        blob,
        `${productType}-${Date.now()}`,
        user.id,
        selectedKeywords
      );

      if (!result || !result.url) {
        throw new Error("Téléversement échoué");
      }

      toast.success("Création enregistrée !");
      onClose();
    } catch (err) {
      console.error("Échec handleSave :", err);
      toast.error("Échec de l’enregistrement de la création.");
    }
  };

  const handleAuthClick = () => {
    // Fermeture + redirection après login
    onClose();
    setPostLoginRedirect(window.location.pathname);
    setShowSignup(true);
  };

  if (!isOpen) return null;

  // Si pas connecté, propose la connexion
  if (!user) {
    return (
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
      </div>
    );
  }

  // Modale d'enregistrement
  return (
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
          <button type="button" onClick={addKeyword} className="apply-btn">
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

        <button type="button" onClick={handleSave} className="apply-btn">
          Sauvegarder
        </button>
      </div>
    </div>
  );
}
