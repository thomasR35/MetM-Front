import React, { useState, useEffect } from "react";
import GalleryItem from "@/components/GalleryItem";
import { fetchImages } from "@/api/images";
import axios from "@/api/axiosConfig";

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [keywords, setKeywords] = useState([]);
  const [selectedKeywords, setSelectedKeywords] = useState([]); // ✅ Liste de mots-clés sélectionnés
  const [totalImages, setTotalImages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const imagesPerPage = 20;

  // 🔹 Charger les mots-clés au montage
  useEffect(() => {
    const loadKeywords = async () => {
      try {
        const keywordResponse = await axios.get("/keywords");
        if (Array.isArray(keywordResponse.data)) {
          setKeywords(
            keywordResponse.data.filter((kw) => kw.name.trim() !== "")
          );
        }
      } catch (error) {
        console.error("❌ Erreur lors du chargement des mots-clés :", error);
      }
    };

    loadKeywords();
  }, []);

  // 🔹 Charger les images au changement de mot-clé ou de page
  useEffect(() => {
    const loadImages = async () => {
      try {
        const data = await fetchImages(
          selectedKeywords,
          currentPage,
          imagesPerPage
        );

        setImages(Array.isArray(data.images) ? data.images : []);
        setTotalImages(Array.isArray(data.images) ? data.images.length : 0); // ✅ Correction ici
      } catch (error) {
        console.error("❌ Erreur lors du chargement des images :", error);
        setImages([]);
        setTotalImages(0);
      }
    };

    loadImages();
  }, [selectedKeywords, currentPage]);

  // 🔹 Gestion du clic sur un mot-clé (permet la sélection multiple)
  const handleKeywordClick = (keyword) => {
    setSelectedKeywords(
      (prevSelected) =>
        prevSelected.includes(keyword)
          ? prevSelected.filter((kw) => kw !== keyword) // 🔥 Désélectionner un mot-clé si déjà sélectionné
          : [...prevSelected, keyword] // ✅ Ajouter un nouveau mot-clé sélectionné
    );
    setCurrentPage(1);
  };

  // 🔹 Gestion de la pagination
  const totalPages =
    totalImages > 0 ? Math.ceil(totalImages / imagesPerPage) : 1;
  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div className="gallery-container">
      <h2>Galerie d'images</h2>

      {/* ☁️ Nuage de mots-clés */}
      <div className="keyword-cloud">
        {keywords.length > 0 ? (
          keywords.map((keyword) => (
            <button
              key={keyword.id}
              className={`keyword-btn ${
                selectedKeywords.includes(keyword.name) ? "selected" : ""
              }`}
              onClick={() => handleKeywordClick(keyword.name)}
            >
              {keyword.name}
            </button>
          ))
        ) : (
          <p>Chargement des mots-clés...</p>
        )}
      </div>

      {/* 🔢 Affichage du nombre total d'images */}
      <p>
        {totalImages > 0
          ? `${totalImages} image${totalImages > 1 ? "s" : ""} trouvée${
              totalImages > 1 ? "s" : ""
            }`
          : "Aucune image trouvée"}
      </p>

      {/* 🖼️ Affichage des images */}
      <div className="gallery-grid">
        {images.length > 0 ? (
          images.map((image) => <GalleryItem key={image.id} image={image} />)
        ) : (
          <p>Aucune image disponible.</p>
        )}
      </div>

      {/* ⬅️➡️ Pagination */}
      {totalPages > 1 && (
        <div className="pagination">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            ⬅️ Précédent
          </button>
          <span>
            Page {currentPage} / {totalPages}
          </span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Suivant ➡️
          </button>
        </div>
      )}
    </div>
  );
};

export default Gallery;
