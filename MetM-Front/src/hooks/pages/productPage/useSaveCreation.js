// src/hooks/productPage/useSaveCreation.js
//=====================================================
import { useState, useEffect } from "react";
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
  const [previewUrl, setPreviewUrl] = useState("");
  const [saving, setSaving] = useState(false);

  // Charger les mots-clés au moment de l’ouverture
  useEffect(() => {
    if (isOpen && user) {
      fetchKeywords()
        .then((data) => setAvailableKeywords(data))
        .catch(() => toast.error("Erreur chargement mots-clés"));
    }
  }, [isOpen, user]);

  // Générer le **mockup complet** pour l’aperçu
  useEffect(() => {
    if (!isOpen) return;

    // pas de modif → pas d’aperçu
    if (!croppedImageData && !customText.trim()) {
      setPreviewUrl("");
      return;
    }

    CompositeImage.create({
      productImageUrl: productImages[currentSlide],
      croppedData: croppedImageData,
      customText,
      textOptions,
      cropArea,
    })
      .then((composite) => setPreviewUrl(composite.dataUrl))
      .catch((err) => {
        console.error("Erreur preview composite :", err);
        toast.error("Impossible de générer l’aperçu");
      });
  }, [
    isOpen,
    productImages,
    currentSlide,
    croppedImageData,
    customText,
    textOptions,
    cropArea,
  ]);

  // Ajout / suppression de mots-clés
  const addKeyword = () => {
    const kw = keywordInput.trim();
    if (kw && !selectedKeywords.includes(kw)) {
      setSelectedKeywords((k) => [...k, kw]);
    }
    setKeywordInput("");
  };
  const removeKeyword = (kw) =>
    setSelectedKeywords((k) => k.filter((x) => x !== kw));

  // Quand on clique sur "Sauvegarder"
  const handleSave = async () => {
    if (!previewUrl) {
      toast.info("Aucune création à sauvegarder.");
      return;
    }
    if (!user) {
      onClose();
      setPostLoginRedirect(window.location.pathname);
      setShowSignup(true);
      return;
    }

    setSaving(true);
    try {
      // récupérer le blob du composite pour l’uploader
      const blob = await (await fetch(previewUrl)).blob();
      const res = await uploadImage(
        blob,
        `${productType}-${Date.now()}`,
        user.id,
        selectedKeywords
      );
      toast.success("Création enregistrée !");
      onClose();
    } catch (err) {
      console.error("Échec upload :", err);
      toast.error("Échec de l’enregistrement de la création.");
    } finally {
      setSaving(false);
    }
  };

  // Si utilisateur non connecté dans la modale
  const handleAuthClick = () => {
    onClose();
    setPostLoginRedirect(window.location.pathname);
    setShowSignup(true);
  };

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
    saving,
  };
}
