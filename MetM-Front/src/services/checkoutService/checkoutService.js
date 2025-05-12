// src/services/checkoutService.js
/**
 * Appelle votre back pour créer une session Stripe (ou tout autre mécanisme de paiement).
 * @param {Array} items  — items du panier
 * @param {number} total — montant total
 * @param {Object} customerData — { name, email, address, userId? }
 * @returns {Promise<{ url: string }>} — url de redirection vers Stripe
 */
export async function createCheckoutSession(items, total, customerData) {
  const resp = await fetch("/api/checkout/session", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ items, total, customerData }),
  });
  if (!resp.ok) {
    throw new Error("Impossible de démarrer le paiement");
  }
  return resp.json();
}
