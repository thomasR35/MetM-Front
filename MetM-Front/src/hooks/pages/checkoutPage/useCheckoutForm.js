// src/hooks/useCheckoutForm.js
//=====================================

import { useState, useCallback } from "react";

export function useCheckoutForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
  });

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }, []);

  return { formData, handleChange };
}
