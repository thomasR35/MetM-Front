// src/components/CheckoutButton.jsx
// ========================
// src/components/CheckoutButton.jsx
import React from "react";

export default function CheckoutButton({
  onClick,
  disabled = false,
  loading = false,
  className = "",
  children,
  ...props
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      className={className}
      {...props}
    >
      {loading ? "Chargement…" : children}
    </button>
  );
}
