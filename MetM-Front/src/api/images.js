// src/api/images.js
import api from "./axiosConfig"; // ← on importe api, pas axios

/**
 * Récupère tous les mots‐clés
 * @returns {Promise<Array<{ id: number, name: string }>>}
 */
export async function fetchKeywords() {
  try {
    const { data } = await api.get("/keywords");
    return data;
  } catch (err) {
    console.error("❌ Erreur API fetchKeywords :", err.response?.data || err);
    throw new Error("Erreur récupération mots‐clés");
  }
}

/**
 * Récupère la liste des images paginées
 * @param {string[]} keywords
 * @param {number} page
 * @param {number} limit
 * @returns {Promise<{ images: Array<object>, total: number }>}
 */
export async function fetchImages(keywords = [], page = 1, limit = 20) {
  try {
    const params = { page, limit };
    if (keywords.length) params.keywords = keywords.join(",");
    const { data } = await api.get("/images", { params });
    return data; // data = { images: […], total: N }
  } catch (err) {
    console.error("❌ Erreur API fetchImages :", err.response?.data || err);
    throw new Error("Erreur récupération images");
  }
}

/**
 * Upload d’une image (FormData multipart)
 * @param {File|Blob} file
 * @param {string} title
 * @param {number|null} uploaded_by
 * @param {string[]} keywords
 * @returns {Promise<object>} l’objet image créé
 */
export async function uploadImage(
  file,
  title = "",
  uploaded_by = null,
  keywords = []
) {
  const formData = new FormData();
  formData.append("image", file);
  formData.append("title", title);
  if (uploaded_by != null) formData.append("uploaded_by", uploaded_by);
  if (keywords.length) formData.append("keywords", keywords.join(","));

  try {
    const { data } = await api.post("/images", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return data;
  } catch (err) {
    console.error("❌ Erreur API uploadImage :", err.response?.data || err);
    throw new Error("Erreur upload image");
  }
}
