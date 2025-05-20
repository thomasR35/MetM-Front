// src/hooks/useCheckoutForm.js
//=====================================

import { useState, useCallback } from "react";

export function useCheckoutForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");

  const handleNameChange = useCallback((e) => setName(e.target.value), []);
  const handleEmailChange = useCallback((e) => setEmail(e.target.value), []);
  const handleAddressChange = useCallback(
    (e) => setAddress(e.target.value),
    []
  );

  const formData = { name, email, address };

  return {
    formData,
    handleNameChange,
    handleEmailChange,
    handleAddressChange,
  };
}

// Formulaire potentiellement évolutif en fonction des besoins

// import { useState, useCallback } from "react";

// export function useCheckoutForm() {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     address: "",
//   });

//   const handleChange = useCallback((e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   }, []);

//   return { formData, handleChange };
// }
