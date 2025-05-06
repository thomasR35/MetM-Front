// src/api/images.js
import axios from "axios";

const BASE_URL = "http://metm-back.local/api";

/**
 * Téléverse une image (création par l’utilisateur)
 * @param {File}     file         File ou Blob issu du canvas
 * @param {string}   title        Titre/qualiﬁant de l’image
 * @param {number}   uploaded_by  ID de l’utilisateur
 * @param {string[]} keywords     Liste de mots‐clés à rattacher
 */
export const uploadImage = async (
  file,
  title = "",
  uploaded_by = null,
  keywords = []
) => {
  try {
    const formData = new FormData();
    formData.append("image", file);
    formData.append("title", title);
    if (uploaded_by != null) {
      formData.append("uploaded_by", uploaded_by);
    }
    if (keywords.length) {
      formData.append("keywords", keywords.join(","));
    }

    const res = await axios.post(`${BASE_URL}/images`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    // Votre ImageController::store() renvoie déjà un JSON { id, url, … }
    return res.data;
  } catch (err) {
    console.error("❌ Erreur API uploadImage :", err.response?.data || err);
    return null;
  }
};

/**
 * Récupère tous les mots‐clés
 */
export const fetchKeywords = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/keywords`);
    return res.data; // doit être un tableau
  } catch (err) {
    console.error("❌ Erreur API fetchKeywords :", err.response?.data || err);
    return [];
  }
};

/**
 * Récupère la liste des images
 */
export const fetchImages = async (keywords = [], page = 1, limit = 20) => {
  try {
    const params = { page, limit };
    if (keywords.length) params.keywords = keywords.join(",");
    const res = await axios.get(`${BASE_URL}/images`, { params });
    return res.data; // { images: […], total: N }
  } catch (err) {
    console.error("❌ Erreur API fetchImages :", err.response?.data || err);
    return { images: [], total: 0 };
  }
};
