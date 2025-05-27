// src/hooks/adminImageManagement/useImageEditModal.js
//=====================================
import { useState, useEffect, useCallback } from "react";
import axios from "@/api/axiosConfig";

export function useImageManagement() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  // 1) Fonction pour tout charger en une fois
  const fetchAllImages = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await axios.get("/images?limit=10000&page=1");
      // votre API renvoie { images: [...], total: N }
      setImages(data.images);
    } catch (err) {
      console.error("Erreur fetchAllImages :", err);
    } finally {
      setLoading(false);
    }
  }, []);

  // 2) Au montage, on charge tout
  useEffect(() => {
    fetchAllImages();
  }, [fetchAllImages]);

  // 3) Après chaque action CRUD, on re-charge tout
  const handleUpload = async (formData) => {
    try {
      await axios.post("/images", formData);
      await fetchAllImages();
    } catch (err) {
      console.error("Upload failed :", err);
    }
  };

  const handleDelete = async (imageId) => {
    try {
      await axios.delete(`/images/${imageId}`);
      await fetchAllImages();
    } catch (err) {
      console.error("Delete failed :", err);
    }
  };

  const handleUpdate = async (imageId, payload) => {
    try {
      await axios.put(`/images/${imageId}`, payload);
      await fetchAllImages();
    } catch (err) {
      console.error("Update failed :", err);
    }
  };

  return {
    images,
    loading,
    handleUpload,
    handleDelete,
    handleUpdate,
  };
}
