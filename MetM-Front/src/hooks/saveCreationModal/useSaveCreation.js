import { useState, useEffect, useCallback } from "react";
import { CompositeImage } from "@/services/composite/CompositeImage";
import { uploadImage, fetchKeywords } from "@/api/images";
import { useAuth } from "@/context/AuthContext";
import { useAuthModal } from "@/context/AuthModalContext";
import { toast } from "react-toastify";

/**
 * Hook gérant la logique d'enregistrement d'une création :
 * - chargement des mots-clés
 * - sélection / suppression
 * - génération du composite + upload
 * - cas non connecté
 */
export function useSaveCreation({
  isOpen,
  productType,
  productImages,
  currentSlide,
  croppedImageData,
  customText,
  textOptions,
  cropArea,
  onClose,
}) {
  const { user } = useAuth();
  const { setShowSignup, setPostLoginRedirect } = useAuthModal();

  // ⚙️ mots-clés
  const [availableKeywords, setAvailableKeywords] = useState([]);
  const [selectedKeywords, setSelectedKeywords] = useState([]);
  const [keywordInput, setKeywordInput] = useState("");

  // 1) charger les mots-clés quand la modal s'ouvre et qu'on est connecté
  useEffect(() => {
    if (isOpen && user) {
      fetchKeywords()
        .then((data) => setAvailableKeywords(Array.isArray(data) ? data : []))
        .catch((err) => {
          console.error("Erreur mots-clés :", err);
          setAvailableKeywords([]);
        });
    }
  }, [isOpen, user]);

  // ⚙️ gestion des mots-clés sélectionnés
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

  // ⚙️ URL d'aperçu
  const previewUrl = croppedImageData?.dataUrl || "";

  // ⚙️ sauvegarde (crop + upload)
  const handleSave = useCallback(async () => {
    if (!croppedImageData && !customText.trim()) {
      toast.info("Aucune modification détectée.");
      return;
    }
    try {
      // 1) création du composite en local
      const composite = await CompositeImage.create({
        productImageUrl: productImages[currentSlide],
        croppedData: croppedImageData,
        customText,
        textOptions,
        cropArea,
      });
      // 2) récupération du blob
      const blob = await (await fetch(composite.dataUrl)).blob();
      // 3) upload
      const result = await uploadImage(
        blob,
        `${productType}-${Date.now()}`,
        user.id,
        selectedKeywords
      );
      if (!result?.url) throw new Error("Téléversement échoué");
      toast.success("Création enregistrée !");
      onClose();
    } catch (err) {
      console.error("Échec handleSave :", err);
      toast.error("Échec de l’enregistrement de la création.");
    }
  }, [
    croppedImageData,
    customText,
    productImages,
    currentSlide,
    textOptions,
    cropArea,
    productType,
    user,
    selectedKeywords,
    onClose,
  ]);

  // ⚙️ cas pas connecté → ouverture du modal auth
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
    previewUrl,
    handleSave,
    handleAuthClick,
    user,
    onClose,
  };
}
