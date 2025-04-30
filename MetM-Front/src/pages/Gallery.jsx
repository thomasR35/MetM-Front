// src/pages/Gallery.jsx
import React, { useState, useEffect } from "react";
import GalleryItem from "@/components/GalleryItem";
import { fetchImages } from "@/api/images";
import axios from "@/api/axiosConfig";
import "../styles/pages/_gallery.scss";

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
      {/* Ton `<h2>` d’origine devient `<h1>` pour le main */}
      <h1 id="gallery-title">Galerie d’images</h1>

      {/* Nuage de mots-clés */}
      <div
        className="keyword-cloud"
        role="region"
        aria-labelledby="keywords-title"
      >
        <h2 id="keywords-title" className="sr-only">
          Filtrer par mot‐clé
        </h2>

        {keywords.length > 0 ? (
          keywords.map((keyword) => (
            <button
              key={keyword.id}
              type="button"
              className={`keyword-btn ${
                selectedKeywords.includes(keyword.name) ? "selected" : ""
              }`}
              aria-pressed={selectedKeywords.includes(keyword.name)}
              onClick={() => handleKeywordClick(keyword.name)}
            >
              {keyword.name}
            </button>
          ))
        ) : (
          <p role="status" aria-live="polite">
            Chargement des mots‐clés…
          </p>
        )}
      </div>

      {/* Indicateur du nombre d’images */}
      <p className="gallery-count" role="status" aria-live="polite">
        {totalImages > 0
          ? `${totalImages} image${totalImages > 1 ? "s" : ""} trouvée${
              totalImages > 1 ? "s" : ""
            }`
          : "Aucune image trouvée"}
      </p>

      {/* Grille d’images */}
      <div className="gallery-grid" role="region" aria-labelledby="grid-title">
        <h2 id="grid-title" className="sr-only">
          Résultats de la galerie
        </h2>

        {images.length > 0 ? (
          images.map((image) => <GalleryItem key={image.id} image={image} />)
        ) : (
          <p role="alert">Aucune image disponible.</p>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="pagination" role="navigation" aria-label="Pagination">
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
        </div>
      )}
    </main>
  );
}
