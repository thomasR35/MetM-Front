// src/api/axiosConfig.js
import axios from "axios";

const api = axios.create({
  baseURL: "http://metm-back.local/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
