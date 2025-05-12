// src/hooks/successPage/usePaymentSuccess.js
// =========================================================
import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { toast } from "react-toastify";

export function usePaymentSuccess() {
  const { clearCart } = useCart();
  const { search } = useLocation();
  const firedRef = useRef(false);

  useEffect(() => {
    const sessionId = new URLSearchParams(search).get("session_id");
    if (sessionId && !firedRef.current) {
      clearCart();
      toast.success("🎉 Paiement réussi ! Merci pour votre commande.", {
        position: "top-center",
        autoClose: 5000,
      });
      firedRef.current = true;
    }
  }, [search, clearCart]);
}
