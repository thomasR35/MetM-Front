import React, { useState, useRef } from "react";
import "../styles/components/_imageEditorModal.scss";
import useDragPosition from "../hooks/useDragPosition";

const ImageEditorModal = ({ uploadedImage, onClose, onApply }) => {
  const [scale, setScale] = useState(1);
  const [selectedFrame, setSelectedFrame] = useState("square");
  const imageRef = useRef(null);

  const { position, startDragging } = useDragPosition();

  const applyCropping = () => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    canvas.width = 100;
    canvas.height = 100;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();

    const offsetX = -position.x * (1 / scale);
    const offsetY = -position.y * (1 / scale);

    ctx.translate(offsetX, offsetY);
    if (selectedFrame === "circle") {
      ctx.arc(50, 50, 50, 0, Math.PI * 2);
      ctx.clip();
    } else {
      ctx.rect(0, 0, 100, 100);
      ctx.clip();
    }

    ctx.drawImage(
      imageRef.current,
      offsetX * scale,
      offsetY * scale,
      imageRef.current.width * (1 / scale),
      imageRef.current.height * (1 / scale),
      0,
      0,
      canvas.width,
      canvas.height
    );

    ctx.restore();

    const croppedImage = canvas.toDataURL("image/png");

    onApply({ croppedImage, offsetX, offsetY, scale });
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <button className="close-btn" onClick={onClose}>
          ✖
        </button>
        <h3>Ajuster l'image</h3>

        <div className="frame-options">
          <button onClick={() => setSelectedFrame("square")}>Carré</button>
          <button onClick={() => setSelectedFrame("circle")}>Rond</button>
          <button onClick={() => setSelectedFrame("heart")}>Cœur</button>
        </div>

        <label>Zoom</label>
        <input
          type="range"
          min="0.1"
          max="2"
          step="0.1"
          value={scale}
          onChange={(e) => setScale(parseFloat(e.target.value))}
        />

        <div className="image-container">
          <div className={`crop-frame ${selectedFrame}`}>
            <img
              ref={imageRef}
              src={uploadedImage}
              alt="Image à modifier"
              onMouseDown={startDragging}
              style={{
                transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
              }}
            />
          </div>
        </div>

        <button onClick={applyCropping} className="apply-btn">
          Appliquer
        </button>
      </div>
    </div>
  );
};

export default ImageEditorModal;
