// src/api/auth.js
import axios from "axios";

const API_URL = "http://metm-back.local/api/auth/login";

export const login = async (username, password) => {
  try {
    const response = await axios.post(
      API_URL,
      { username, password },
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    console.error(
      "❌ Erreur lors de la connexion :",
      error.response?.data || error
    );
    throw error;
  }
};

export const registerUser = async (username, email, password) => {
  try {
    const response = await fetch("http://metm-back.local/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, email, password, role: "user" }),
    });

    const data = await response.json();

    if (response.ok) {
      return { success: true, data };
    } else {
      return {
        success: false,
        message: data.error || "❌ Erreur d'inscription",
      };
    }
  } catch (error) {
    console.error("❌ Erreur lors de l'inscription :", error);
    return {
      success: false,
      message: "❌ Impossible de contacter le serveur.",
    };
  }
};
