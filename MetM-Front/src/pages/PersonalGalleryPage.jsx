// src/pages/PersonalGalleryPage.jsx
// ========================
import { useState, useEffect } from "react";
import { fetchMyImages } from "@/api/images";
import GalleryItem from "@/components/GalleryItem";
import "@/styles/pages/_personalGallery.scss";

export default function PersonalGalleryPage() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMyImages()
      .then((imgs) => setImages(imgs))
      .catch((err) => console.error("❌ Erreur fetchMyImages :", err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <main id="main-content" role="main" className="personal-gallery">
      <h1>Mes créations</h1>

      {loading ? (
        <p role="status" aria-live="polite">
          Chargement de votre galerie…
        </p>
      ) : images.length === 0 ? (
        <p role="alert">Vous n'avez encore aucune création.</p>
      ) : (
        <section
          className="gallery-grid"
          role="region"
          aria-labelledby="personal-gallery-title"
        >
          <h2 id="personal-gallery-title" className="sr-only">
            Galerie personnelle
          </h2>
          {images.map((img) => (
            <GalleryItem key={img.id} image={img} />
          ))}
        </section>
      )}
    </main>
  );
}
