import React from "react";

const MockupProduct = ({
  productImage,
  croppedImageData,
  tshirtColor,
  customText,
}) => {
  const croppedImage = croppedImageData?.croppedImage || null;
  const offsetX = croppedImageData?.offsetX || 0;
  const offsetY = croppedImageData?.offsetY || 0;
  const scale = croppedImageData?.scale || 1;

  return (
    <div
      className="mockup-container"
      style={{ backgroundColor: tshirtColor || "white", position: "relative" }}
    >
      <img
        src={productImage}
        alt="Produit personnalisé"
        className="mockup-image"
      />
      {croppedImage && (
        <img
          src={croppedImage}
          alt="Découpe personnalisée"
          className="overlay-image"
          style={{
            position: "absolute",
            top: `calc(50% + ${offsetY}px)`,
            left: `calc(50% + ${offsetX}px)`,
            transform: `translate(-50%, -50%) scale(${scale})`,
            width: "100px",
            height: "100px",
            opacity: 1,
            zIndex: 10,
          }}
        />
      )}
      {customText && <p className="custom-text">{customText}</p>}
    </div>
  );
};

export default MockupProduct;
