import axios from "axios";

const API_URL = "http://metm-back.local/api/images";

export const fetchImages = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("❌ Erreur API Images :", error);
    throw error;
  }
};
