// src/services/stripe/stripe.js
// ========================
import { loadStripe } from "@stripe/stripe-js";

// Export par défaut
export default loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);
