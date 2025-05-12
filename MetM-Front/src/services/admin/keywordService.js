import axios from "@/api/axiosConfig";

/**
 * Récupère tous les mots-clé.
 * @returns {Promise<Array>}
 */
export async function getKeywords() {
  const { data } = await axios.get("/keywords");
  return Array.isArray(data) ? data : [];
}

/**
 * Crée un nouveau mot-clé.
 * @param {{ name: string, created_by: string|number }} payload
 * @returns {Promise<Object>} — mot-clé créé
 */
export async function createKeyword(payload) {
  const { data } = await axios.post("/keywords", payload);
  return data;
}

/**
 * Supprime un mot-clé.
 * @param {string|number} id
 */
export async function deleteKeyword(id) {
  await axios.delete(`/keywords/${id}`);
}
