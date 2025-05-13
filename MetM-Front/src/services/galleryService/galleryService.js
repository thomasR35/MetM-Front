// src/services/galleryService.js
import axios from "@/api/axiosConfig";
import { fetchImages } from "@/api/images";

/**
 * Récupère tous les mots‐clés (via /keywords).
 * Filtre les valeurs vides.
 */
export async function fetchKeywords() {
  const { data } = await axios.get("/keywords");
  return data.filter((kw) => kw.name.trim() !== "");
}

/**
 * Récupère les images paginées selon des mots‐clés sélectionnés.
 * On délègue à fetchImages, qui utilise axios.
 *
 * @param {string[]} selectedKeywords
 * @param {number} page
 * @param {number} perPage
 * @returns {Promise<{ images: any[], total: number }>}
 */
export async function fetchGalleryImages(selectedKeywords, page, perPage) {
  return fetchImages(selectedKeywords, page, perPage);
}
