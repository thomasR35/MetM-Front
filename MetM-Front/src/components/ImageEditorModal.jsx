// src/components/ImageEditorModal.jsx
// ========================
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
    <div
      className="editor-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="editor-title"
      aria-describedby="editor-desc"
    >
      <div className="editor-modal" role="document">
        <button
          className="editor-close"
          onClick={onClose}
          aria-label="Fermer l'éditeur d'image"
        >
          ✕
        </button>

        <h3 id="editor-title">Ajuster l'image</h3>
        <p id="editor-desc" className="sr-only">
          Utilisez les options de forme, le curseur de zoom et glissez l'image
          pour la recadrer. Appuyez sur Appliquer lorsque vous avez terminé.
        </p>

        <div
          className="frame-options"
          role="group"
          aria-label="Options de forme de recadrage"
        >
          <button
            type="button"
            aria-pressed={selectedFrame === "square"}
            onClick={() => setSelectedFrame("square")}
          >
            Carré
          </button>
          <button
            type="button"
            aria-pressed={selectedFrame === "circle"}
            onClick={() => setSelectedFrame("circle")}
          >
            Rond
          </button>
        </div>

        <div className="zoom-control" role="group" aria-labelledby="zoom-label">
          <label id="zoom-label" htmlFor="zoom-range">
            Zoom
          </label>
          <input
            id="zoom-range"
            type="range"
            min="0.1"
            max="3"
            step="0.1"
            value={scale}
            onChange={(e) => setScale(+e.target.value)}
            aria-valuemin="0.1"
            aria-valuemax="3"
            aria-valuenow={scale}
            aria-label={`Zoom ${scale}`}
          />
        </div>

        <div
          className="image-container"
          ref={imgContainerRef}
          role="region"
          aria-labelledby="editor-title"
        >
          <div
            className={`crop-frame ${selectedFrame}`}
            ref={frameRef}
            aria-label={`Cadre de recadrage ${selectedFrame}`}
          >
            <img
              ref={imageRef}
              src={uploadedImage}
              alt="Image à recadrer"
              loading="lazy"
              onMouseDown={startDragging}
              style={{
                transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
                cursor: "grab",
              }}
            />
          </div>
        </div>

        <button
          type="button"
          className="apply-btn"
          onClick={applyCropping}
          aria-label="Appliquer le recadrage"
        >
          Appliquer
        </button>
      </div>
    </div>,
    document.body,
  );
}
