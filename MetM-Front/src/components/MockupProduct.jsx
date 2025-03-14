import React from "react";

const MockupProduct = ({ productImage, uploadedImage }) => {
  return (
    <div className="mockup-wrapper">
      <img
        src={uploadedImage || productImage}
        alt="Produit"
        className="mockup-image"
        onError={(e) => {
          console.error("❌ Erreur de chargement de l'image :", e.target.src);
          e.target.src = "../assets/images/placeholder.jpg"; // Image par défaut
        }}
      />
    </div>
  );
};

export default MockupProduct;
