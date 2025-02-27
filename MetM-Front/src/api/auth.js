import axios from "axios";

const API_URL = "http://metm-back.local/api/auth/login"; // 🔥 Assure-toi que cette URL est correcte

export const login = async (username, password) => {
  try {
    const response = await axios.post(API_URL, { username, password });
    console.log("Réponse API :", response.data); // 🔥 Vérifier la réponse
    return response.data; // Doit renvoyer { token, user }
  } catch (error) {
    console.error("Erreur lors de la connexion :", error.response || error);
    throw error;
  }
};
