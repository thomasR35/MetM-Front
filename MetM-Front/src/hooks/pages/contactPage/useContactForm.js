// src/hooks/useContactForm.js
//=====================================
import { useState, useCallback } from "react";
import { submitContactForm } from "@/services/contactService/contactService";

export function useContactForm(
  initial = {
    name: "",
    email: "",
    subject: "",
    message: "",
  }
) {
  const [formData, setFormData] = useState(initial);
  const [status, setStatus] = useState(null);
  const [error, setError] = useState("");

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((f) => ({ ...f, [name]: value }));
  }, []);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      setStatus("loading");
      setError("");
      try {
        const result = await submitContactForm(formData);
        if (result.success) {
          setStatus("success");
          setFormData(initial);
        } else {
          throw new Error(result.message || "Erreur serveur");
        }
      } catch (err) {
        console.error("Contact form error:", err);
        setStatus("error");
        setError(err.message);
      }
    },
    [formData, initial]
  );

  return {
    formData,
    status,
    error,
    handleChange,
    handleSubmit,
  };
}
