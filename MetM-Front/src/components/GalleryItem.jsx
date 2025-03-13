import React from "react";

const BASE_URL = "http://metm-back.local"; // ✅ Vérifie que c'est bien l'URL du backend

const GalleryItem = ({ image }) => {
  const imageUrl = image.url.startsWith("/uploads/")
    ? `${BASE_URL}${image.url}`
    : image.url;

  const handleDownload = async () => {
    try {
      const response = await fetch(imageUrl, { mode: "cors" }); // ✅ Récupère l'image en mode sécurisé
      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = blobUrl;
      link.setAttribute("download", image.title || "image.jpg"); // ✅ Force le téléchargement
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      URL.revokeObjectURL(blobUrl); // ✅ Libère la mémoire
    } catch (error) {
      console.error("❌ Erreur lors du téléchargement :", error);
    }
  };

  return (
    <div className="gallery-item">
      <img
        src={imageUrl}
        alt={`Image uploadée par ${image.uploaded_by}`}
        className="gallery-image"
        crossOrigin="anonymous" // ✅ Évite les erreurs CORS
        onError={(e) => {
          console.error("❌ Impossible de charger l'image :", e.target.src);
          e.target.src = "/assets/placeholder.jpg"; // 🔥 Image par défaut
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
};

export default GalleryItem;
