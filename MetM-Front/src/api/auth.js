// src/api/auth.js
const API_BASE = "http://metm-back.local/api";

/**
 * POST /api/auth/login
 * @returns {Promise<{user:object, token:string}>}
 */
export function login(username, password) {
  return fetch(`${API_BASE}/auth/login`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ username, password }),
  }).then(async (res) => {
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error || data.message || "Connexion échouée");
    }
    return data;
  });
}

/**
 * POST /api/users
 * @returns {Promise<object>}
 */
export function registerUser(username, email, password) {
  return fetch(`${API_BASE}/users`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ username, email, password, role: "user" }),
  }).then(async (res) => {
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error || data.message || "Inscription échouée");
    }
    return data;
  });
}
