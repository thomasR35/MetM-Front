// src/api/axiosConfig.js
import axios from "axios";

// URL fixe en production, proxy Vite en dev
const PROD_API_URL = "https://mauriceetmarcelle.go.yj.fr/api";
const DEV_API_URL = import.meta.env.VITE_API_URL || "/api";

// import.meta.env.MODE vaut "development" ou "production"
const baseURL =
  import.meta.env.MODE === "production"
    ? "https://mauriceetmarcelle.go.yj.fr/api"
    : import.meta.env.VITE_API_URL || "/api";

const api = axios.create({
  baseURL,
  withCredentials: true,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
