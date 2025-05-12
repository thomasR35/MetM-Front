import { useState, useEffect, useCallback } from "react";
import {
  getImages,
  uploadImage,
  deleteImage,
  updateImage,
} from "@/services/admin/imageService";
import { getStoredUser } from "@/services/userService/userService";

export function useImageManagement() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadImages = useCallback(async () => {
    setLoading(true);
    try {
      const imgs = await getImages();
      setImages(imgs);
    } catch (err) {
      console.error("❌ Erreur de chargement des images :", err);
      setError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadImages();
  }, [loadImages]);

  const handleUpload = useCallback(async (file, title, keywords) => {
    const formData = new FormData();
    formData.append("image", file);
    formData.append("title", title);
    formData.append("keywords", keywords);
    const user = getStoredUser();
    formData.append("uploaded_by", user?.id || "1");

    const newImage = await uploadImage(formData);
    setImages((prev) => [...prev, newImage]);
    return newImage;
  }, []);

  const handleDelete = useCallback(async (id) => {
    await deleteImage(id);
    setImages((prev) => prev.filter((img) => img.id !== id));
  }, []);

  const handleUpdate = useCallback(async (id, updatedData) => {
    const user = getStoredUser();
    const payload = { ...updatedData, uploaded_by: user?.id || "1" };
    const updated = await updateImage(id, payload);
    setImages((prev) =>
      prev.map((img) => (img.id === id ? { ...img, ...updated } : img))
    );
  }, []);

  return {
    images,
    loading,
    error,
    loadImages,
    handleUpload,
    handleDelete,
    handleUpdate,
  };
}
