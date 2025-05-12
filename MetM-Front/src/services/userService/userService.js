// src/services/userService.js

/**
 * Récupère et parse les données de l'utilisateur stockées dans localStorage.
 * @returns {object|null} L'objet user ou null si indisponible / invalide
 */
export function getStoredUser() {
  const data = localStorage.getItem("user");
  if (!data) return null;
  try {
    return JSON.parse(data);
  } catch {
    console.error("❌ Impossible de parser 'user' depuis localStorage");
    return null;
  }
}
