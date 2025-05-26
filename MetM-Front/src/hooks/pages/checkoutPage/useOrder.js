// src/hooks/useOrder.js
//=====================================
// src/hooks/useOrder.js
import { useState, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { useAuthModal } from "@/context/AuthModalContext";
import { sendOrder } from "@/api/orders";
import { stripePromise } from "@/services/stripe/stripe";
import { createCheckoutSession } from "@/api/checkout";

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
        // ➊ Enregistre la commande côté back
        await sendOrder({
          user_id: user.id,
          customer: formData,
          items: cartItems.map((item) => ({
            product: { id: item.product.id },
            quantity: item.quantity,
            // customImageId: item.customImageId ?? null, // si tu enregistres des customs
          })),
          total,
        });

        // ➋ Crée la session Stripe
        const stripeItems = cartItems.map((item) => ({
          product_name: item.product.name,
          unit_amount: Math.round(item.product.price * 100),
          quantity: item.quantity,
        }));
        const sessionId = await createCheckoutSession(stripeItems);
        const stripe = await stripePromise;
        await stripe.redirectToCheckout({ sessionId });

        // ➌ Vide le panier (après redirection ou sur ta page success)
        clearCart();
      } catch (err) {
        console.error("Erreur processOrder :", err);
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
