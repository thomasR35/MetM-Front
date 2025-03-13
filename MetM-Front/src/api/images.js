import axios from "axios";

const BASE_URL = "http://metm-back.local/api";

export const fetchImages = async (keywords = [], page = 1, limit = 20) => {
  try {
    // ✅ Transformer le tableau de mots-clés en une chaîne de requête lisible par l'API
    const keywordParam = keywords.length > 0 ? keywords.join(",") : "";

    const response = await axios.get(`${BASE_URL}/images`, {
      params: { keywords: keywordParam, page, limit },
    });

    return response.data;
  } catch (error) {
    console.error("❌ Erreur API :", error);
    return { images: [], total: 0 };
  }
};

// 🔹 Récupérer tous les mots-clés disponibles
export const fetchKeywords = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/keywords`);
    console.log("✅ Mots-clés reçus de l'API :", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ Erreur API fetchKeywords :", error);
    return [];
  }
};

// 🔹 Ajouter une nouvelle image avec mots-clés
export const uploadImage = async (file, title, keywords, uploaded_by) => {
  try {
    const formData = new FormData();
    formData.append("image", file);
    formData.append("title", title);
    formData.append("keywords", keywords);
    formData.append("uploaded_by", uploaded_by);

    const response = await axios.post(`${BASE_URL}/images`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    console.log("✅ Image téléversée :", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ Erreur API uploadImage :", error);
    return null;
  }
};

// 🔹 Mettre à jour une image avec mots-clés
export const updateImage = async (id, title, url, keywords) => {
  try {
    const response = await axios.put(`${BASE_URL}/images/${id}`, {
      title,
      url,
      keywords,
    });

    console.log("✅ Image mise à jour :", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ Erreur API updateImage :", error);
    return null;
  }
};

// 🔹 Supprimer une image
export const deleteImage = async (id) => {
  try {
    const response = await axios.delete(`${BASE_URL}/images/${id}`);
    console.log("✅ Image supprimée :", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ Erreur API deleteImage :", error);
    return null;
  }
};
