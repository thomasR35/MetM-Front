// src/hooks/adminUserManagement/useUserEditModal.js
//=====================================
import { useState, useCallback } from "react";

export function useUserEditModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    role: "user",
  });

  const open = useCallback((user) => {
    setSelected(user);
    setFormData({
      username: user.username || "",
      email: user.email || "",
      role: user.role || "user",
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
    formData,
    setFormData,
    open,
    close,
  };
}
