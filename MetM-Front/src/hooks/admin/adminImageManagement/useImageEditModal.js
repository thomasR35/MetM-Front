// src/hooks/adminImageManagement/useImageEditModal.js
//=====================================
import { useState, useCallback } from "react";

export function useImageEditModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [editData, setEditData] = useState({
    title: "",
    url: "",
    keywords: "",
  });

  const open = useCallback((image) => {
    setSelected(image);
    setEditData({
      title: image.title || "",
      url: image.url || "",
      keywords: image.keywords || "",
    });
    setIsOpen(true);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
    setSelected(null);
  }, []);

  return {
    isOpen,
    selected,
    editData,
    setEditData,
    open,
    close,
  };
}
