// src/services/checkoutService.js
/**
 * @module services/checkoutService
 * @description Service pour gérer le paiement avec Stripe
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
