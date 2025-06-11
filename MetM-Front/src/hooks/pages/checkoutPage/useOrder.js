// src/hooks/useOrder.js
//=====================================
import { useState, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { useAuthModal } from "@/context/AuthModalContext";
import { sendOrder } from "@/api/orders";
import stripePromise from "@/services/stripe/stripe.js";
import { createCheckoutSession } from "@/services/checkoutService/checkoutService.js";

export function useOrder() {
  const { cartItems, total, clearCart } = useCart();
  const { user, isAuthenticated } = useAuth();
  const { setShowSignup, setPostLoginRedirect } = useAuthModal();
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  const processOrder = useCallback(
    async (formData) => {
      if (cartItems.length === 0) {
        navigate(`/product/${localStorage.getItem("lastProduct") || "mug"}`);
        return;
      }
      if (!isAuthenticated) {
        setPostLoginRedirect(location.pathname + location.search);
        setShowSignup(true);
        return;
      }

      setLoading(true);
      try {
        // 1) Enregistre la commande côté back
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

        // 2) Prépare les items pour Stripe
        const stripeItems = cartItems.map((item) => ({
          product_name: item.product.name,
          unit_amount: Math.round(item.product.price * 100),
          quantity: item.quantity,
        }));

        // 3) Crée la session Stripe et récupère sessionId
        const { sessionId, url } = await createCheckoutSession(
          stripeItems,
          total,
          formData
        );
        console.log("useOrder → sessionId, url:", sessionId, url);

        // 4) Vide le panier avant redirection
        clearCart();

        // 5) Redirige vers Stripe Checkout
        if (url) {
          window.location.href = url;
        } else if (sessionId) {
          const stripe = await stripePromise;
          await stripe.redirectToCheckout({ sessionId });
        } else {
          throw new Error("Session Stripe invalide");
        }
      } catch (err) {
        console.error("Erreur processOrder :", err);
        // Afficher un message d'erreur à l'utilisateur si besoin
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
