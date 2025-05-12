// src/services/admin/userService.js
import axios from "@/api/axiosConfig";

/**
 * Récupère tous les utilisateurs.
 * @returns {Promise<Array>}
 */
export async function getUsers() {
  const { data } = await axios.get("/users");
  return Array.isArray(data) ? data : [];
}

/**
 * Crée un nouvel utilisateur.
 * @param {{ username:string, email:string, password:string, role:string }} payload
 * @returns {Promise<Object>} — utilisateur créé
 */
export async function createUser(payload) {
  const { data } = await axios.post("/users", payload);
  return data;
}

/**
 * Met à jour un utilisateur existant.
 * @param {number|string} id
 * @param {{ username:string, email:string, role:string }} payload
 * @returns {Promise<Object>} — utilisateur mis à jour
 */
export async function updateUser(id, payload) {
  const { data } = await axios.put(`/users/${id}`, payload);
  return data;
}

/**
 * Supprime un utilisateur par son ID.
 * @param {number|string} id
 */
export async function deleteUser(id) {
  await axios.delete(`/users/${id}`);
}
