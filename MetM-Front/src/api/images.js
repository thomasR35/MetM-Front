// src/api/images.js
// ====================
import api from "./axiosConfig";
const VITE_URL = import.meta.env.UPLOADS_URL;
const API_BASE = VITE_URL.replace(/\/api\/?$/, "");

/**
 * Récupère tous les mots-clés.
 */
export async function fetchKeywords() {
  try {
    const { data } = await api.get("/keywords");
    return data;
  } catch (err) {
    console.error("❌ Erreur API fetchKeywords :", err.response?.data || err);
    throw new Error("Erreur récupération mots-clés");
  }
}

/**
 * Récupère la liste des images paginées.
 * @returns {Promise<{ images: Array<object>, total: number }>}
 */
export async function fetchImages(keywords = [], page = 1, limit = 20) {
  try {
    const params = { page, limit };
    if (Array.isArray(keywords) && keywords.length) {
      params.keywords = keywords.join(",");
    }
    const { data } = await api.get("/images", { params });
    return {
      images: data.images ?? [],
      total: typeof data.total === "number" ? data.total : 0,
    };
  } catch (err) {
    console.error("❌ Erreur API fetchImages :", err.response?.data || err);
    throw new Error("Erreur récupération images");
  }
}

/** Récupère les images de l’utilisateur courant */
export async function fetchMyImages() {
  try {
    const { data } = await api.get("/users/me/images");
    return data.images ?? [];
  } catch (err) {
    console.error("❌ Erreur API fetchMyImages :", err.response?.data || err);
    throw err;
  }
}

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

  // On envoie toujours une string CSV pour les mots-clés
  let kwString = "";
  if (Array.isArray(keywords) && keywords.length) {
    kwString = keywords.filter(Boolean).join(",");
  } else if (typeof keywords === "string" && keywords.trim()) {
    kwString = keywords
      .split(",")
      .map((k) => k.trim())
      .filter(Boolean)
      .join(",");
  }
  formData.append("keywords", kwString);

  try {
    // Ne PAS préciser headers ; axiosConfig enverra correctement le boundary
    const { data } = await api.post("/images", formData);
    // Complète l’URL si nécessaire
    let absoluteUrl = data.url;
    if (absoluteUrl && absoluteUrl.startsWith("/")) {
      absoluteUrl = `${API_BASE}${absoluteUrl}`;
    }
    return { ...data, url: absoluteUrl };
  } catch (err) {
    console.error("❌ Erreur API uploadImage :", err.response?.data || err);
    const message =
      err.response?.data?.error ||
      err.response?.data?.message ||
      "Erreur upload image";
    throw new Error(message);
  }
}
