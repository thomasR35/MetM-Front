export const sendOrder = async ({ user_id, customer, items, total }) => {
  try {
    const response = await fetch("http://metm-back.local/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user_id,
        customer,
        items,
        total,
      }),
    });

    const text = await response.text();
    console.log("Réponse brute du back :", text);

    let data;
    try {
      data = JSON.parse(text);
    } catch (error) {
      throw new Error("Réponse du serveur invalide.");
    }

    if (!response.ok) {
      throw new Error(data.error || "Erreur lors de la commande.");
    }

    return data;
  } catch (error) {
    console.error("Erreur lors de l'envoi de la commande :", error);
    throw error;
  }
};
