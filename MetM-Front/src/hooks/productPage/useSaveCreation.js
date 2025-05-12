// src/hooks/productPage/useImageUpload.js
//=====================================
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useAuthModal } from "@/context/AuthModalContext";

export function useSaveCreation() {
  const { user } = useAuth();
  const { setShowSignup, setPostLoginRedirect } = useAuthModal();
  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);

  function handleSaveClick({ hasModification }) {
    if (!hasModification) {
      return false; // on pourra toast dans le composant
    }
    if (!user) {
      setPostLoginRedirect(window.location.pathname);
      setShowSignup(true);
    } else {
      setIsSaveModalOpen(true);
    }
    return true;
  }

  return {
    isSaveModalOpen,
    openSaveModal: () => setIsSaveModalOpen(true),
    closeSaveModal: () => setIsSaveModalOpen(false),
    handleSaveClick,
  };
}
