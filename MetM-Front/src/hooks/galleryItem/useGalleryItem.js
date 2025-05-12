import { useCallback, useMemo } from "react";

// On part de VITE_API_URL = "http://metm-back.local/api"
// et on enlève le "/api" final pour retomber sur la racine du backend.
const API_BASE = import.meta.env.VITE_API_URL.replace(/\/api\/?$/i, "");

export function useGalleryItem({ url, title }) {
  // 1) Résolution de l’URL absolue de l’image
  const imageUrl = useMemo(() => {
    return url.startsWith("/uploads/") ? `${API_BASE}${url}` : url;
  }, [url]);

  // 2) Handler de téléchargement
  const handleDownload = useCallback(async () => {
    try {
      const resp = await fetch(imageUrl, { mode: "cors" });
      const blob = await resp.blob();
      const blobUrl = URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = blobUrl;
      a.download = title || "image.jpg";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(blobUrl);
    } catch (err) {
      console.error("❌ Erreur lors du téléchargement :", err);
    }
  }, [imageUrl, title]);

  return { imageUrl, handleDownload };
}
