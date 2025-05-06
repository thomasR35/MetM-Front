// src/components/CheckoutButton.jsx
// ========================
import { useState } from "react";
import { stripePromise } from "../services/stripe/stripe";
import { createCheckoutSession } from "../api/checkout";

export default function CheckoutButton({
  items,
  total,
  className = "",
  ...props
}) {
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);
    try {
      // 1) on transforme ici
      const payload = items.map((i) => ({
        product_name: i.product.name,
        unit_amount: Math.round(i.product.price * 100),
        quantity: i.quantity,
      }));

      // 2) on envoie le bon tableau
      const sessionId = await createCheckoutSession(payload);

      // 3) on redirige
      const stripe = await stripePromise;
      await stripe.redirectToCheckout({ sessionId });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={loading || items.length === 0}
      className={className}
      {...props}
    >
      {loading ? "Chargement…" : `Payer ${total.toFixed(2)} €`}
    </button>
  );
}
