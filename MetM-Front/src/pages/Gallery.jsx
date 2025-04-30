// src/pages/Gallery.jsx
import React, { useState, useEffect } from "react";
import GalleryItem from "@/components/GalleryItem";
import { fetchImages } from "@/api/images";
import axios from "@/api/axiosConfig";

export default function Gallery() {
  const [images, setImages] = useState([]);
  const [keywords, setKeywords] = useState([]);
  const [selectedKeywords, setSelectedKeywords] = useState([]);
  const [totalImages, setTotalImages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const imagesPerPage = 20;

  // Charger les mots-clés
  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get("/keywords");
        setKeywords(data.filter((kw) => kw.name.trim() !== ""));
      } catch (err) {
        console.error("Erreur mots-clés :", err);
      }
    })();
  }, []);

  // Charger les images
  useEffect(() => {
    (async () => {
      try {
        const { images: imgs } = await fetchImages(
          selectedKeywords,
          currentPage,
          imagesPerPage
        );
        setImages(Array.isArray(imgs) ? imgs : []);
        setTotalImages(Array.isArray(imgs) ? imgs.length : 0);
      } catch (err) {
        console.error("Erreur images :", err);
        setImages([]);
        setTotalImages(0);
      }
    })();
  }, [selectedKeywords, currentPage]);

  const handleKeywordClick = (kw) => {
    setSelectedKeywords((prev) =>
      prev.includes(kw) ? prev.filter((k) => k !== kw) : [...prev, kw]
    );
    setCurrentPage(1);
  };

  const totalPages =
    totalImages > 0 ? Math.ceil(totalImages / imagesPerPage) : 1;

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <main
      id="main-content"
      role="main"
      className="gallery-container"
      aria-labelledby="gallery-title"
    >
      <h1 id="gallery-title">Galerie d’images</h1>

      {/* Nuage de mots-clés */}
      <section
        role="region"
        aria-labelledby="keywords-title"
        className="keyword-cloud"
      >
        <h2 id="keywords-title" className="sr-only">
          Filtrer par mot‐clé
        </h2>
        {keywords.length > 0 ? (
          keywords.map((kw) => (
            <button
              key={kw.id}
              type="button"
              className={`keyword-btn ${
                selectedKeywords.includes(kw.name) ? "selected" : ""
              }`}
              aria-pressed={selectedKeywords.includes(kw.name)}
              onClick={() => handleKeywordClick(kw.name)}
            >
              {kw.name}
            </button>
          ))
        ) : (
          <p role="status" aria-live="polite">
            Chargement des mots‐clés…
          </p>
        )}
      </section>

      {/* Indicateur du nombre d’images */}
      <div role="status" aria-live="polite" className="gallery-count">
        {totalImages > 0
          ? `${totalImages} image${totalImages > 1 ? "s" : ""} trouvée${
              totalImages > 1 ? "s" : ""
            }`
          : "Aucune image trouvée"}
      </div>

      {/* Grille d’images */}
      <section
        role="region"
        aria-labelledby="grid-title"
        className="gallery-grid"
      >
        <h2 id="grid-title" className="sr-only">
          Résultats de la galerie
        </h2>
        {images.length > 0 ? (
          <ul role="list" className="gallery-list">
            {images.map((image) => (
              <li key={image.id} role="listitem" className="gallery-item">
                <GalleryItem image={image} />
              </li>
            ))}
          </ul>
        ) : (
          <p role="alert">Aucune image disponible.</p>
        )}
      </section>

      {/* Pagination */}
      {totalPages > 1 && (
        <nav
          role="navigation"
          aria-label="Pagination de la galerie"
          className="pagination"
        >
          <button
            type="button"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            aria-label="Page précédente"
          >
            ⬅️ Précédent
          </button>
          <span aria-live="polite" aria-atomic="true">
            Page {currentPage} / {totalPages}
          </span>
          <button
            type="button"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            aria-label="Page suivante"
          >
            Suivant ➡️
          </button>
        </nav>
      )}
    </main>
  );
}
