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
    const { data } = await api.post("/stripe/checkout", {
      items,
      total,
      customerData,
    });

    console.log("✅ createCheckoutSession response:", data);

    // Stripe v3 renvoie souvent un { id: 'cs_test_…' }
    if (data.id) {
      return { sessionId: data.id };
    }
    // ou un { sessionId: '…' }
    if (data.sessionId) {
      return { sessionId: data.sessionId };
    }
    // si vous avez ajusté pour renvoyer une URL directement :
    if (data.url) {
      return { url: data.url };
    }

    throw new Error("Réponse Stripe inattendue : " + JSON.stringify(data));
  } catch (err) {
    console.error("Erreur démarrage paiement Stripe :", err);
    throw new Error("Impossible de démarrer le paiement");
  }
}
