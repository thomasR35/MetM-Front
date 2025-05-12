// src/services/galleryService.js
import axios from "@/api/axiosConfig";
import { fetchImages } from "@/api/images";

export async function fetchKeywords() {
  const { data } = await axios.get("/keywords");
  // on filtre les mots‐clés vides
  return data.filter((kw) => kw.name.trim() !== "");
}

/**
 * Récupère les images paginées selon des mots‐clés sélectionnés.
 * @param {string[]} selectedKeywords
 * @param {number} page
 * @param {number} perPage
 * @returns {Promise<{ images: any[], total: number }>}
 */
export async function fetchGalleryImages(selectedKeywords, page, perPage) {
  // on suppose que l'API renvoie { images: [...], total: N }
  return fetchImages(selectedKeywords, page, perPage);
}
