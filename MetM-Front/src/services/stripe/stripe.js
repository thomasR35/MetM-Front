// src/services/stripe.js
import { loadStripe } from "@stripe/stripe-js";

// import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY sera remplacé au build
export const stripePromise = loadStripe(
  import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY
);
