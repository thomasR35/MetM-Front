// src/hooks/useCheckoutForm.js
import { useState, useCallback } from "react";

const INITIAL = { name: "", email: "", address: "" };

export function useCheckoutForm() {
  const [formData, setFormData] = useState(INITIAL);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((f) => ({ ...f, [name]: value }));
  }, []);

  const resetForm = useCallback(() => {
    setFormData(INITIAL);
  }, []);

  return { formData, handleChange, resetForm };
}
