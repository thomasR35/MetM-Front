// src/services/authService.js
import { login } from "@/api/auth";

/**
 * Appelle l’API pour authentifier un admin.
 * @param {string} username
 * @param {string} password
 * @returns {Promise<{ token: string, user: object }>}
 */
export async function adminLogin(username, password) {
  return login(username, password);
}
