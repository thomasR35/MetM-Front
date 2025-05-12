// src/api/images.js
import api from "./axiosConfig";

const API_BASE = import.meta.env.VITE_API_URL.replace(/\/api\/?$/, "");

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
    if (Array.isArray(keywords) && keywords.length) {
      params.keywords = keywords.join(",");
    }
    const { data } = await api.get("/images", { params });
    return data; // { images: […], total: N }
  } catch (err) {
    console.error("❌ Erreur API fetchImages :", err.response?.data || err);
    throw new Error("Erreur récupération images");
  }
}

/**
 * Upload d’une image (FormData multipart)
 * @param {File|Blob} file
 * @param {string} title
 * @param {number|null} uploaded_by  — l’ID Numéro d’utilisateur (obligatoire pour ton API)
 * @param {string[]|string} keywords
 * @returns {Promise<object>}
 */
export async function uploadImage(
  file,
  title = "",
  uploaded_by = null,
  keywords = []
) {
  const formData = new FormData();
  formData.append("image", file, title);
  formData.append("title", title);

  if (uploaded_by != null) {
    formData.append("uploaded_by", uploaded_by);
  }

  // normalisation keywords en tableau…
  const kwList = Array.isArray(keywords)
    ? keywords
    : typeof keywords === "string"
    ? keywords
        .split(",")
        .map((k) => k.trim())
        .filter(Boolean)
    : [];

  kwList.forEach((kw) => formData.append("keywords[]", kw));

  try {
    // Ne PAS forcer Content-Type : boundary généré automatiquement
    const { data } = await api.post("/images", formData);

    // Si le back renvoie data.url = "/uploads/xxx", on le complète :
    let absoluteUrl = data.url;
    if (absoluteUrl && absoluteUrl.startsWith("/")) {
      absoluteUrl = `${API_BASE}${absoluteUrl}`;
    }

    return { ...data, url: absoluteUrl };
  } catch (err) {
    console.error("❌ Erreur API uploadImage :", err.response?.data || err);
    throw new Error(
      err.response?.data?.error ||
        err.response?.data?.message ||
        "Erreur upload image"
    );
  }
}
