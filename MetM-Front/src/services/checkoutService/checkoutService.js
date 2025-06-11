// src/services/checkoutService.js
import api from "@/api/axiosConfig.js";

/**
 * @module services/checkoutService
 * @description Service pour gérer le paiement avec Stripe
 * @param {Array}  items        — items du panier
 * @param {number} total        — montant total
 * @param {Object} customerData — { name, email, address, userId? }
 * @returns {Promise<{ url?: string, sessionId?: string }>}
 */
export async function createCheckoutSession(items, total, customerData) {
  try {
    // En prod  : POST https://mauriceetmarcelle.go.yj.fr/api/stripe/checkout
    // En dev   : POST /api/stripe/checkout (proxy Vite)
    const { data } = await api.post("/stripe/checkout", {
      items,
      total,
      customerData,
    });

    console.log("✅ createCheckoutSession response:", data);

    // Certains back renvoient { url }, d'autres { sessionId }
    if (data.url) {
      return { url: data.url };
    }
    if (data.sessionId) {
      return { sessionId: data.sessionId };
    }

    throw new Error("Réponse Stripe inattendue : " + JSON.stringify(data));
  } catch (err) {
    console.error("Erreur démarrage paiement Stripe :", err);
    throw new Error("Impossible de démarrer le paiement");
  }
}
