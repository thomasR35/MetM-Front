// src/api/checkout.js
import axios from "axios";

export async function createCheckoutSession(line_items) {
  const { data } = await axios.post("/api/stripe/checkout", {
    items: line_items,
    frontend_url: import.meta.env.VITE_FRONTEND_URL,
  });
  return data.id;
}
