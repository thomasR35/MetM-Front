// src/services/checkoutService.js
import api from "@/api/axiosConfig.js";

/**
 * @module services/checkoutService
 * @description Service pour gérer le paiement avec Stripe
 * @param {Array}  items        — items du panier
 * @param {number} total        — montant total
 * @param {Object} customerData — { name, email, address, userId? }
 * @returns {Promise<{ url: string }>} — url de redirection vers Stripe
 */
export async function createCheckoutSession(items, total, customerData) {
  try {
    // En prod  : POST https://mauriceetmarcelle.go.yj.fr/api/stripe/checkout
    // En dev   : POST /api/stripe/checkout (proxy Vite)
    const response = await api.post("/stripe/checkout", {
      items,
      total,
      customerData,
    });
    return response.data; // { url: "https://checkout.stripe.com/..." }
  } catch (err) {
    console.error("Erreur démarrage paiement Stripe :", err);
    throw new Error("Impossible de démarrer le paiement");
  }
}
