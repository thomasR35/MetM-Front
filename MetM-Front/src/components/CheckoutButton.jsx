// src/components/CheckoutButton.jsx
// ========================
import React from "react";
import { useStripeCheckout } from "@/hooks/stripeCheckout/useStripeCheckout";

/**
 * Bouton de paiement Stripe.
 * Délègue toute la logique à useStripeCheckout.
 */
export default function CheckoutButton({
  items,
  total,
  className = "",
  ...props
}) {
  const { loading, handleCheckout } = useStripeCheckout(items);

  return (
    <button
      onClick={handleCheckout}
      disabled={loading || items.length === 0}
      className={className}
      {...props}
    >
      {loading ? "Chargement…" : `Payer ${total.toFixed(2)} €`}
    </button>
  );
}
