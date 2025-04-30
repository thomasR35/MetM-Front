import axios from "axios";

export async function createCheckoutSession(line_items) {
  const { data } = await axios.post("/api/stripe/checkout", {
    items: line_items,
  });
  return data.id;
}
