import axios from "@/api/axiosConfig";

/**
 * Récupère la liste des images.
 * @returns {Promise<Array>}
 */
export async function getImages() {
  const { data } = await axios.get("/images");
  return Array.isArray(data.images) ? data.images : [];
}

/**
 * Téléverse une nouvelle image.
 * @param {FormData} formData
 * @returns {Promise<Object>} — image créée
 */
export async function uploadImage(formData) {
  const { data } = await axios.post("/images", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data;
}

/**
 * Supprime une image par son ID.
 * @param {string|number} id
 */
export async function deleteImage(id) {
  await axios.delete(`/images/${id}`);
}

/**
 * Met à jour une image existante.
 * @param {string|number} id
 * @param {Object} updatedData
 * @returns {Promise<Object>} — image mise à jour
 */
export async function updateImage(id, updatedData) {
  const { data } = await axios.put(`/images/${id}`, updatedData, {
    headers: { "Content-Type": "application/json" },
  });
  return data;
}
