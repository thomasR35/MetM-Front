import axios from "axios";

const API_URL = "http://metm-back.local/api/auth/login"; // 🔥 Vérifie bien cette URL

export const login = async (username, password) => {
  try {
    const response = await axios.post(
      API_URL,
      { username, password },
      { withCredentials: true } // 🔥 Assure que les cookies et credentials sont envoyés
    );

    console.log("Réponse API :", response.data); // ✅ Vérification
    return response.data; // 🔥 Doit renvoyer { token, user }
  } catch (error) {
    console.error(
      "Erreur lors de la connexion :",
      error.response?.data || error
    );
    throw error;
  }
};
