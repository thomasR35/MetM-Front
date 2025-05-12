// src/hooks/stripeCheckout/useStripeCheckout.js
// ========================
import { useState, useCallback } from "react";
import { useAuth } from "@/context/AuthContext";
import { useAuthModal } from "@/context/AuthModalContext";
import { stripePromise } from "@/services/stripe/stripe";
import { createCheckoutSession } from "@/api/checkout";

export function useStripeCheckout(items = []) {
  const [loading, setLoading] = useState(false);
  const { isAuthenticated } = useAuth();
  const { setShowSignup, setPostLoginRedirect } = useAuthModal();

  const handleCheckout = useCallback(async () => {
    // 1) si pas connecté → on ouvre la modale
    if (!isAuthenticated) {
      setPostLoginRedirect(window.location.pathname);
      setShowSignup(true);
      return;
    }

    // 2) sinon on lance Stripe
    setLoading(true);
    try {
      const payload = items.map((i) => ({
        product_name: i.product.name,
        unit_amount: Math.round(i.product.price * 100),
        quantity: i.quantity,
      }));

      const sessionId = await createCheckoutSession(payload);
      const stripe = await stripePromise;
      await stripe.redirectToCheckout({ sessionId });
    } catch (err) {
      console.error("Erreur Stripe checkout:", err);
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated, items, setPostLoginRedirect, setShowSignup]);

  return { loading, handleCheckout };
}
