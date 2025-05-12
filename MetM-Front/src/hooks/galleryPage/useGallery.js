import { useState, useEffect } from "react";
import { fetchGalleryImages } from "@/services/galleryService/galleryService";

export function useGallery(selectedKeywords, currentPage, perPage) {
  const [images, setImages] = useState([]);
  const [totalImages, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    (async () => {
      try {
        const { images: imgs, total } = await fetchGalleryImages(
          selectedKeywords,
          currentPage,
          perPage
        );
        setImages(Array.isArray(imgs) ? imgs : []);
        setTotal(typeof total === "number" ? total : imgs.length);
      } catch (err) {
        console.error("Erreur images :", err);
        setImages([]);
        setTotal(0);
        setError(err);
      } finally {
        setLoading(false);
      }
    })();
  }, [selectedKeywords, currentPage, perPage]);

  return { images, totalImages, loading, error };
}
