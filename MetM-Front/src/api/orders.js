// src/api/orders.js
//===================

import api from "./axiosConfig";
export const sendOrder = async ({ user_id, customer, items, total }) => {
  try {
    const { data } = await api.post("/orders", {
      user_id,
      customer,
      items,
      total,
    });
    return data;
  } catch (err) {
    console.error("❌ Erreur API sendOrder :", err.response?.data || err);
    const message =
      err.response?.data?.error ||
      "Erreur lors de l'enregistrement de la commande";
    throw new Error(message);
  }
};

export async function fetchMyOrders() {
  const { data } = await api.get("/users/me/orders");
  return data.orders ?? [];
}
