// src/hooks/successPage/usePaymentSuccess.js
// =========================================================
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { useCart } from "@/context/CartContext";

/**
 * Lit le session_id dans l’URL, vide le panier et affiche un toast de succès.
 * @returns {string|null} sessionId
 */
export function usePaymentSuccess() {
  const { clearCart } = useCart();
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const sessionId = params.get("session_id");

  useEffect(() => {
    if (sessionId) {
      clearCart();
      toast.success("🎉 Paiement réussi ! Merci pour votre commande.", {
        position: "top-center",
        autoClose: 5000,
      });
    }
  }, [sessionId, clearCart]);

  return sessionId;
}
