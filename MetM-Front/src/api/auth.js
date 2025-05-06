// src/api/auth.js
import axios from "axios";

const api = axios.create({
  baseURL: "http://metm-back.local/api",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

/**
 * POST /api/auth/login
 * @throws AxiosError
 * @returns {{user: object, token: string}}
 */
export async function login(username, password) {
  const res = await api.post("/auth/login", { username, password });
  // on attend que l'API renvoie { user: {...}, token: "..." }
  return res.data;
}

/**
 * POST /api/users
 * @throws AxiosError
 * @returns {object}
 */
export async function registerUser(username, email, password) {
  const res = await api.post("/users", {
    username,
    email,
    password,
    role: "user",
  });
  return res.data;
}
