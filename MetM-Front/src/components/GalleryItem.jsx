// src/components/GalleryItem.jsx
// ========================
import React from "react";
import { useGalleryItem } from "@/hooks/components/galleryItem/useGalleryItem";
import placeholder from "@/assets/images/placeholder.jpg";

export default function GalleryItem({ image }) {
  const { imageUrl, handleDownload } = useGalleryItem({
    url: image.url,
    title: image.title,
  });

  return (
    <div className="gallery-item">
      <img
        src={imageUrl}
        alt={`Image uploadée par ${image.uploaded_by}`}
        className="gallery-image"
        crossOrigin="anonymous"
        onError={(e) => {
          console.error("❌ Impossible de charger l'image :", e.target.src);
          e.target.src = placeholder;
        }}
      />
      <div className="gallery-info">
        <h3>Ajouté par : {image.uploaded_by}</h3>
        <button className="download-btn" onClick={handleDownload}>
          Télécharger
        </button>
      </div>
    </div>
  );
}
