// src/hooks/useOrder.js
import { useCallback } from "react";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import { createCheckoutSession } from "@/services/checkoutService/checkoutService";

export function useOrder() {
  const { cartItems, total, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const processOrder = useCallback(
    async (customerData) => {
      // On ajoute l'ID utilisateur si connecté
      const payload = { ...customerData, userId: user?.id };
      try {
        const { url } = await createCheckoutSession(cartItems, total, payload);
        // on vide le panier puis on redirige vers Stripe
        clearCart();
        window.location.href = url;
      } catch (err) {
        console.error("Échec de la création de session de paiement :", err);
      }
    },
    [cartItems, total, user, clearCart]
  );

  return { cartItems, total, processOrder };
}
