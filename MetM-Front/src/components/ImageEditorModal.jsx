// src/components/ImageEditorModal.jsx
// ========================
import React, { useState, useRef, useLayoutEffect } from "react";
import "../styles/components/_imageEditorModal.scss";
import useDragPosition from "../hooks/useDragPosition.js";
import { Cropper } from "../services/cropping/Cropper";

const ImageEditorModal = ({ uploadedImage, onClose, onApply }) => {
  const [scale, setScale] = useState(1);
  const [selectedFrame, setSelectedFrame] = useState("square");
  const imageRef = useRef(null);
  const imgContainerRef = useRef(null);
  const frameRef = useRef(null);
  const { position, startDragging } = useDragPosition();

  // taille et position du masque, mesurées *dans* le conteneur de l'image
  const [mask, setMask] = useState({ width: 0, height: 0, left: 0, top: 0 });

  useLayoutEffect(() => {
    if (!frameRef.current || !imgContainerRef.current) return;
    const f = frameRef.current.getBoundingClientRect();
    const c = imgContainerRef.current.getBoundingClientRect();
    setMask({
      width: f.width,
      height: f.height,
      left: f.left - c.left,
      top: f.top - c.top,
    });
  }, [selectedFrame, uploadedImage]);

  const applyCropping = () => {
    const maskRect = frameRef.current.getBoundingClientRect();
    const cropper = new Cropper(imageRef.current, maskRect, selectedFrame);
    const { dataUrl, width, height } = cropper.crop();
    onApply({ dataUrl, width, height });
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
        </div>

        <label>Zoom</label>
        <input
          type="range"
          min="0.1"
          max="3"
          step="0.1"
          value={scale}
          onChange={(e) => setScale(+e.target.value)}
        />

        <div className="image-container" ref={imgContainerRef}>
          <div className={`crop-frame ${selectedFrame}`} ref={frameRef}>
            <img
              ref={imageRef}
              src={uploadedImage}
              alt="À recadrer"
              onMouseDown={startDragging}
              style={{
                transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
                cursor: "grab",
              }}
            />
          </div>
        </div>

        <button className="apply-btn" onClick={applyCropping}>
          Appliquer
        </button>
      </div>
    </div>
  );
};

export default ImageEditorModal;
