import React, { useState } from "react";
import "../styles/components/_imageEditorModal.scss";

const ImageEditorModal = ({ uploadedImage, onClose }) => {
  const [position, setPosition] = useState({ x: 50, y: 50 });
  const [scale, setScale] = useState(1);

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h3>Ajuster l'image</h3>
        <div className="image-preview">
          <img
            src={uploadedImage}
            alt="Image à modifier"
            style={{
              transform: `translate(${position.x}%, ${position.y}%) scale(${scale})`,
            }}
          />
        </div>
        <label>Zoom</label>
        <input
          type="range"
          min="0.5"
          max="2"
          step="0.1"
          value={scale}
          onChange={(e) => setScale(e.target.value)}
        />
        <button onClick={onClose} className="btn">
          Appliquer
        </button>
      </div>
    </div>
  );
};

export default ImageEditorModal;
