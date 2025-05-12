// src/hooks/stripeCheckout/useStripeCheckout.js
// ========================
import { useState, useCallback } from "react";
import { stripePromise } from "@/services/stripe/stripe";
import { createCheckoutSession } from "@/api/checkout";
import { toast } from "react-toastify";

/**
 * Hook pour gérer la création de session Stripe et la redirection.
 * @param {Array} items – liste d’items du panier (avec product.name, product.price, quantity)
 */
export function useStripeCheckout(items) {
  const [loading, setLoading] = useState(false);

  const handleCheckout = useCallback(async () => {
    if (items.length === 0) return;
    setLoading(true);
    try {
      // 1) Transformation du panier au format back
      const payload = items.map((i) => ({
        product_name: i.product.name,
        unit_amount: Math.round(i.product.price * 100),
        quantity: i.quantity,
      }));

      // 2) Création de la session via l’API
      const sessionId = await createCheckoutSession(payload);

      // 3) Redirection Stripe
      const stripe = await stripePromise;
      const { error } = await stripe.redirectToCheckout({ sessionId });
      if (error) {
        console.error("Stripe redirect error:", error);
        toast.error("Échec de la redirection vers le paiement.");
      }
    } catch (err) {
      console.error("Erreur lors de la création de la session Stripe :", err);
      toast.error("Impossible de démarrer le paiement.");
    } finally {
      setLoading(false);
    }
  }, [items]);

  return { loading, handleCheckout };
}
