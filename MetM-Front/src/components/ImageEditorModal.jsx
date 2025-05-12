// src/components/ImageEditorModal.jsx
// ========================
import React from "react";
import "@/styles/components/_imageEditorModal.scss";
import { createPortal } from "react-dom";
import { useImageEditor } from "@/hooks/components/imageEditorModal/useImageEditor";

export default function ImageEditorModal({ uploadedImage, onClose, onApply }) {
  const {
    scale,
    setScale,
    selectedFrame,
    setSelectedFrame,
    imageRef,
    imgContainerRef,
    frameRef,
    position,
    startDragging,
    applyCropping,
  } = useImageEditor(uploadedImage, onApply, onClose);

  return createPortal(
    <div className="modal-overlay">
      <div className="modal" role="dialog" aria-modal="true">
        <button className="close-btn" onClick={onClose} aria-label="Fermer">
          ✖
        </button>
        <h3>Ajuster l'image</h3>

        <div className="frame-options">
          <button
            className={selectedFrame === "square" ? "active" : ""}
            onClick={() => setSelectedFrame("square")}
          >
            Carré
          </button>
          <button
            className={selectedFrame === "circle" ? "active" : ""}
            onClick={() => setSelectedFrame("circle")}
          >
            Rond
          </button>
        </div>

        <label htmlFor="zoom-range">Zoom</label>
        <input
          id="zoom-range"
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
    </div>,
    document.body
  );
}
