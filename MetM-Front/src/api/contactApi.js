export const sendContactForm = async (formData) => {
  try {
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    if (response.ok) {
      return { success: true, data };
    } else {
      return {
        success: false,
        message: data.error || "❌ Erreur lors de l'envoi",
      };
    }
  } catch (error) {
    console.error("❌ Erreur réseau :", error);
    return { success: false, message: "❌ Serveur injoignable" };
  }
};
