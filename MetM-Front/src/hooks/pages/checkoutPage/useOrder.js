// src/hooks/useOrder.js
//=====================================
import { useState, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { useAuthModal } from "@/context/AuthModalContext";
import { sendOrder } from "@/api/orders";
import { createCheckoutSession } from "@/services/checkoutService"; // <-- chemin corrigé

export function useOrder() {
  const { cartItems, total, clearCart } = useCart();
  const { user, isAuthenticated } = useAuth();
  const { setShowSignup, setPostLoginRedirect } = useAuthModal();
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  const processOrder = useCallback(
    async (formData) => {
      // 1) panier vide
      if (cartItems.length === 0) {
        navigate(`/product/${localStorage.getItem("lastProduct") || "mug"}`);
        return;
      }
      // 2) pas connecté
      if (!isAuthenticated) {
        setPostLoginRedirect(location.pathname + location.search);
        setShowSignup(true);
        return;
      }

      setLoading(true);
      try {
        console.log("cartItems before sendOrder:", cartItems);

        // ➊ Enregistre la commande côté back
        await sendOrder({
          user_id: user.id,
          customer: formData,
          items: cartItems.map((item) => ({
            product: { id: item.product.id },
            quantity: item.quantity,
            customImageId: item.customImage?.id ?? null,
          })),
          total,
        });

        // ➋ Prépare les items pour Stripe
        const stripeItems = cartItems.map((item) => ({
          product_name: item.product.name,
          unit_amount: Math.round(item.product.price * 100),
          quantity: item.quantity,
        }));

        // ➌ Crée la session Stripe (POST /stripe/checkout)
        const { url } = await createCheckoutSession(
          stripeItems,
          total,
          formData
        );

        // ➍ Vide le panier avant redirection
        clearCart();

        // ➎ Redirige vers Stripe Checkout
        window.location.href = url;
      } catch (err) {
        console.error("Erreur processOrder :", err);
        // afficher un message à l'utilisateur si nécessaire
      } finally {
        setLoading(false);
      }
    },
    [
      cartItems,
      total,
      user,
      isAuthenticated,
      setShowSignup,
      setPostLoginRedirect,
      navigate,
      location.pathname,
      location.search,
      clearCart,
    ]
  );

  return { cartItems, total, loading, processOrder };
}
