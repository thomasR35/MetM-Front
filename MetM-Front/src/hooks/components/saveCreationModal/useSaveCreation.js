// src/hooks/components/saveCreationModal/useSaveCreation.js
// =============================================================
import { useState, useEffect, useCallback } from "react";
import { CompositeImage } from "@/services/composite/CompositeImage";
import { uploadImage, fetchKeywords } from "@/api/images";
import { useAuth } from "@/context/AuthContext";
import { useAuthModal } from "@/context/AuthModalContext";
import { toast } from "react-toastify";

export function useSaveCreation({
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
  const [saving, setSaving] = useState(false);

  // 1) Charger les mots-clés existants à l’ouverture
  useEffect(() => {
    if (isOpen && user) {
      fetchKeywords()
        .then((data) => setAvailableKeywords(Array.isArray(data) ? data : []))
        .catch(() => toast.error("Erreur chargement mots-clés"));
    }
  }, [isOpen, user]);

  // 2) Ajouter / supprimer un mot-clé
  const addKeyword = useCallback(() => {
    const kw = keywordInput.trim();
    if (kw && !selectedKeywords.includes(kw)) {
      setSelectedKeywords((prev) => [...prev, kw]);
    }
    setKeywordInput("");
  }, [keywordInput, selectedKeywords]);

  const removeKeyword = useCallback((kw) => {
    setSelectedKeywords((prev) => prev.filter((k) => k !== kw));
  }, []);

  // 3) Sauvegarde : génération composite + upload
  const handleSave = useCallback(async () => {
    // pas de modif => rien à faire
    if (!croppedImageData && !customText.trim()) {
      toast.info("Aucune modification détectée.");
      return;
    }

    // pas connecté => ouvrir la modale de login
    if (!user) {
      onClose();
      setPostLoginRedirect(window.location.pathname);
      setShowSignup(true);
      return;
    }

    setSaving(true);
    try {
      // générer le composite
      const composite = await CompositeImage.create({
        productImageUrl: productImages[currentSlide],
        croppedData: croppedImageData,
        customText,
        textOptions,
        cropArea,
      });
      const blob = await (await fetch(composite.dataUrl)).blob();

      // upload
      await uploadImage(
        blob,
        `${productType}-${Date.now()}`,
        user.id,
        selectedKeywords
      );

      toast.success("Création enregistrée !");
      onClose();
    } catch (err) {
      console.error("Échec upload :", err);
      toast.error("Échec de l’enregistrement.");
    } finally {
      setSaving(false);
    }
  }, [
    isOpen,
    onClose,
    productImages,
    currentSlide,
    croppedImageData,
    customText,
    textOptions,
    cropArea,
    productType,
    user,
    selectedKeywords,
    setPostLoginRedirect,
    setShowSignup,
  ]);

  // 4) rediriger vers login si besoin
  const handleAuthClick = useCallback(() => {
    onClose();
    setPostLoginRedirect(window.location.pathname);
    setShowSignup(true);
  }, [onClose, setPostLoginRedirect, setShowSignup]);

  return {
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
  };
}
