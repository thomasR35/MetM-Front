import React, { useState, useEffect } from "react";
import GalleryItem from "@/components/GalleryItem";
import { fetchImages } from "@/api/images";
import "../styles/pages/_gallery.scss";

const Gallery = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const loadImages = async () => {
      try {
        const data = await fetchImages();
        setImages(data);
      } catch (error) {
        console.error("❌ Erreur lors du chargement des images :", error);
      }
    };

    loadImages();
  }, []);

  return (
    <div className="gallery-container">
      <h2>Galerie d'images</h2>
      <div className="gallery-grid">
        {images.length > 0 ? (
          images.map((image) => <GalleryItem key={image.id} image={image} />)
        ) : (
          <p>Aucune image disponible.</p>
        )}
      </div>
    </div>
  );
};

export default Gallery;
