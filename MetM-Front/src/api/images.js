// src/api/images.js
import axios from "axios";

const BASE_URL = "http://metm-back.local/api";

/**
 * Récupère la liste des images
 * @param {string[]} keywords
 * @param {number}   page
 * @param {number}   limit
 * @returns {Promise<{ images: any[], total: number}>}
 */
export const fetchImages = async (keywords = [], page = 1, limit = 20) => {
  try {
    const keywordParam = keywords.length ? keywords.join(",") : "";
    const response = await axios.get(`${BASE_URL}/images`, {
      params: { keywords: keywordParam, page, limit },
    });
    return response.data; // { images: […], total: N }
  } catch (error) {
    console.error("❌ Erreur API fetchImages :", error.response?.data || error);
    return { images: [], total: 0 };
  }
};

/**
 * Récupère tous les mots‐clés (tags) existants
 * pour l'UI de filtrage
 */
export const fetchKeywords = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/keywords`);
    return response.data;
  } catch (error) {
    console.error("❌ Erreur API fetchKeywords :", error);
    return [];
  }
};

/**
 * Téléverse une image (création par l’utilisateur)
 * @param {File}   file        Blob ou File issu du canvas
 * @param {string} title       stocké dans la colonne `title`
 * @param {number} uploaded_by ID de l’utilisateur
 * @returns {Promise<{id:number, url:string}>|null}
 */
export const uploadImage = async (file, title = "", uploaded_by = null) => {
  try {
    const formData = new FormData();
    formData.append("image", file);
    formData.append("title", title);
    if (uploaded_by !== null) {
      formData.append("uploaded_by", uploaded_by);
    }

    const response = await axios.post(`${BASE_URL}/images`, formData, {
      // axios mettra le bon Content-Type automatiquement
      headers: {
        "Content-Type": "multipart/form-data",
        Accept: "application/json",
      },
    });

    // selon ta réponse : peut-être response.data.data ou response.data
    const payload = response.data.data || response.data;
    return { id: payload.id, url: payload.url };
  } catch (error) {
    console.error("❌ Erreur API uploadImage :", error.response?.data || error);
    return null;
  }
};

/**
 * Met à jour le titre et/ou l’URL d’une image existante
 * (utile côté admin)
 * @param {number} id
 * @param {string} title
 * @param {string} url
 */
export const updateImage = async (id, title, url) => {
  try {
    const response = await axios.put(`${BASE_URL}/images/${id}`, {
      title,
      url,
    });
    console.log("✅ Image mise à jour :", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ Erreur API updateImage :", error.response?.data || error);
    return null;
  }
};

/**
 * Supprime une image
 * @param {number} id
 */
export const deleteImage = async (id) => {
  try {
    const response = await axios.delete(`${BASE_URL}/images/${id}`);
    console.log("✅ Image supprimée :", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ Erreur API deleteImage :", error.response?.data || error);
    return null;
  }
};
