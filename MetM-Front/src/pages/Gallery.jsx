// src/pages/Gallery.jsx
// =====================================
import { useState } from "react";
import GalleryItem from "@/components/GalleryItem";
import { useKeywords } from "@/hooks/pages/galleryPage/useKeywords";
import { useGallery } from "@/hooks/pages/galleryPage/useGallery";
import { usePagination } from "@/hooks/pages/galleryPage/usePagination";
import "../styles/pages/_gallery.scss";

export default function Gallery() {
  const [selectedKeywords, setSelectedKeywords] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const imagesPerPage = 20;

  const { keywords, loading: kwLoading } = useKeywords();
  const {
    images,
    totalImages,
    loading: imgLoading,
  } = useGallery(selectedKeywords, currentPage, imagesPerPage);
  const { totalPages, canPrev, canNext, prev, next } = usePagination(
    currentPage,
    totalImages,
    imagesPerPage
  );

  const handleKeywordClick = (kw) => {
    setSelectedKeywords((prev) =>
      prev.includes(kw) ? prev.filter((k) => k !== kw) : [...prev, kw]
    );
    setCurrentPage(1);
  };

  return (
    <main
      id="main-content"
      role="main"
      className="gallery-container"
      aria-labelledby="gallery-title"
    >
      <h1 id="gallery-title">Galerie d'images</h1>

      {/* Nuage de mots-clés */}
      <section
        className="keyword-cloud"
        role="region"
        aria-labelledby="keywords-title"
      >
        <h2 id="keywords-title" className="sr-only">
          Filtrer par mot-clé
        </h2>
        {kwLoading ? (
          <p role="status" aria-live="polite">Chargement des filtres…</p>
        ) : (
          keywords.map(({ id, name }) => (
            <button
              key={id}
              type="button"
              className={`keyword-btn${selectedKeywords.includes(name) ? " selected" : ""}`}
              aria-pressed={selectedKeywords.includes(name)}
              onClick={() => handleKeywordClick(name)}
            >
              {name}
            </button>
          ))
        )}
      </section>

      {/* Compteur */}
      <p className="gallery-count" role="status" aria-live="polite">
        {imgLoading
          ? "Chargement…"
          : totalImages > 0
          ? `${totalImages} image${totalImages > 1 ? "s" : ""} trouvée${totalImages > 1 ? "s" : ""}`
          : "Aucune image trouvée"}
      </p>

      {/* Grille */}
      <section
        className="gallery-grid"
        role="region"
        aria-labelledby="grid-title"
      >
        <h2 id="grid-title" className="sr-only">Résultats de la galerie</h2>
        {imgLoading ? (
          <p role="status" aria-live="polite">Chargement…</p>
        ) : images.length > 0 ? (
          images.map((image) => <GalleryItem key={image.id} image={image} />)
        ) : (
          <p role="alert">Aucune image disponible.</p>
        )}
      </section>

      {/* Pagination */}
      {totalPages > 1 && (
        <nav className="pagination" role="navigation" aria-label="Pagination">
          <button
            type="button"
            onClick={() => prev(setCurrentPage)}
            disabled={!canPrev}
            aria-label="Page précédente"
          >
            ← Précédent
          </button>
          <span aria-live="polite" aria-atomic="true">
            Page {currentPage} / {totalPages}
          </span>
          <button
            type="button"
            onClick={() => next(setCurrentPage)}
            disabled={!canNext}
            aria-label="Page suivante"
          >
            Suivant →
          </button>
        </nav>
      )}
    </main>
  );
}
