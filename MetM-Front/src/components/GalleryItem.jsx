// src/components/GalleryItem.jsx
// ========================
import { useGalleryItem } from "@/hooks/components/galleryItem/useGalleryItem";
import placeholder from "@/assets/images/placeholder.jpg";
import "@/styles/components/_galleryItem.scss";

export default function GalleryItem({ image }) {
  const { imageUrl, handleDownload } = useGalleryItem({
    url: image.url,
    title: image.title,
  });

  return (
    <article className="gallery-item" aria-label={`Image de ${image.uploaded_by}`}>
      <div className="gallery-image-wrapper">
        <img
          src={imageUrl}
          alt={`Image uploadée par ${image.uploaded_by}`}
          className="gallery-image"
          crossOrigin="anonymous"
          loading="lazy"
          onError={(e) => {
            console.error("❌ Impossible de charger l'image :", e.target.src);
            e.target.src = placeholder;
          }}
        />
      </div>

      <div className="gallery-info">
        <h3>{image.uploaded_by}</h3>
        {image.title && (
          <span className="gallery-item-meta">{image.title}</span>
        )}
        <button
          className="download-btn"
          onClick={handleDownload}
          aria-label={`Télécharger l'image de ${image.uploaded_by}`}
        >
          Télécharger →
        </button>
      </div>
    </article>
  );
}
