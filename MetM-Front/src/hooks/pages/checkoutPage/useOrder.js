// src/hooks/useOrder.js
//=====================================
import { useState, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { useAuthModal } from "@/context/AuthModalContext";
import { stripePromise } from "@/services/stripe/stripe";
import { createCheckoutSession } from "@/api/checkout";

export function useOrder() {
  const { cartItems, total, clearCart } = useCart();
  const { isAuthenticated } = useAuth();
  const { setShowSignup, setPostLoginRedirect } = useAuthModal();
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  const processOrder = useCallback(
    async (formData) => {
      // 1) si panier vide → redirection
      if (cartItems.length === 0) {
        navigate(`/product/${localStorage.getItem("lastProduct") || "mug"}`);
        return;
      }
      // 2) si pas connecté → modale login
      if (!isAuthenticated) {
        setPostLoginRedirect(location.pathname + location.search);
        setShowSignup(true);
        return;
      }

      // 3) sinon on lance Stripe
      setLoading(true);
      try {
        const payload = cartItems.map((item) => ({
          product_name: item.product.name,
          unit_amount: Math.round(item.product.price * 100),
          quantity: item.quantity,
        }));

        const sessionId = await createCheckoutSession(payload);
        const stripe = await stripePromise;
        await stripe.redirectToCheckout({ sessionId });

        // 4) clearCart après redirection (dans ton success page ou ici)
        clearCart();
      } catch (err) {
        console.error("Erreur processOrder:", err);
      } finally {
        setLoading(false);
      }
    },
    [
      cartItems,
      isAuthenticated,
      setPostLoginRedirect,
      setShowSignup,
      navigate,
      location.pathname,
      location.search,
      clearCart,
    ]
  );

  return { cartItems, total, loading, processOrder };
}
