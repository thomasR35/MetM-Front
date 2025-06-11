// src/hooks/useOrder.js
//=====================================
import { useState, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { useAuthModal } from "@/context/AuthModalContext";
import { sendOrder } from "@/api/orders";
import { createCheckoutSession } from "@/services/checkoutService/checkoutService"; // <-- chemin corrigé

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
        // 1) Enregistrer la commande
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

        // 2) Créer la session Stripe
        const stripeItems = cartItems.map((item) => ({
          product_name: item.product.name,
          unit_amount: Math.round(item.product.price * 100),
          quantity: item.quantity,
        }));

        // Attention : on reçoit peut-être { sessionId } ou { url }
        const session = await createCheckoutSession(
          stripeItems,
          total,
          formData
        );
        console.log("createCheckoutSession response →", session);

        // 3) Vider le panier
        clearCart();

        // 4) Redirection
        if (session.url) {
          // si ton back renvoie directement l’URL de checkout
          window.location.href = session.url;
        } else if (session.sessionId) {
          // si ton back ne renvoie qu’un sessionId
          const stripe = await stripePromise;
          await stripe.redirectToCheckout({ sessionId: session.sessionId });
        } else {
          throw new Error(
            "Session Stripe invalide : " + JSON.stringify(session)
          );
        }
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
