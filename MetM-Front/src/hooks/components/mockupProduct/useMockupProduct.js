// src/hooks/components/mockupProduct/useMockupProduct.js
// =========================================
import { useEffect, useRef } from "react";
import { TextOverlay } from "@/services/text/TextOverlay";

/**
 * Hook qui gère tout le dessin du mockup sur un canvas.
 *
 * @param {string} productImage
 *   URL de la mockup du produit (image de fond).
 * @param {Object} [croppedImageData]
 *   Données de l’image recadrée à superposer, si présente.
 * @param {string} croppedImageData.dataUrl
 *   Data-URL de l’image recadrée (base64).
 * @param {number} croppedImageData.width
 *   Largeur en pixels de l’image recadrée.
 * @param {number} croppedImageData.height
 *   Hauteur en pixels de l’image recadrée.
 * @param {string} customText
 *   Texte personnalisé à afficher sur le mockup.
 * @param {Object} textOptions
 *   Options de rendu pour le texte.
 * @param {string} textOptions.fontFamily
 *   Famille de police (ex. `"Arial"`, `"Roboto"`, etc.).
 * @param {number} textOptions.fontSize
 *   Taille de police en pixels.
 * @param {string} textOptions.color
 *   Couleur du texte (CSS color string, ex. `"#000"` ou `"rgba(255,255,255,0.8)"`).
 * @param {{ x: number, y: number }} textOptions.position
 *   Position (en pixels) du point de départ de dessin du texte sur le canvas.
 * @returns {import('react').RefObject<HTMLCanvasElement>}
 *   Référence vers l’élément `<canvas>` utilisé pour le rendu.
 */
export function useMockupProduct({
  productImage,
  croppedImageData,
  customText,
  textOptions,
  cropArea,
}) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const baseImg = new Image();
    baseImg.crossOrigin = "anonymous";
    baseImg.src = productImage;

    baseImg.onload = () => {
      // Ajuste la taille du canvas
      canvas.width = baseImg.width;
      canvas.height = baseImg.height;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // 1) Fond : la mockup
      ctx.drawImage(baseImg, 0, 0, canvas.width, canvas.height);

      // utilitaire pour le texte
      const drawText = () => {
        TextOverlay.draw(ctx, customText, textOptions);
      };

      // 2) Si on a une image util
      if (croppedImageData?.dataUrl) {
        const userImg = new Image();
        userImg.crossOrigin = "anonymous";
        userImg.src = croppedImageData.dataUrl;
        userImg.onload = () => {
          // dimensions réelles du crop
          const cw = croppedImageData.width;
          const ch = croppedImageData.height;

          // si cropArea est bien fourni et valide, on l'utilise,
          // sinon on retombe sur le centrage automatique
          let x, y, wZone, hZone;
          if (
            cropArea &&
            typeof cropArea.width === "number" &&
            typeof cropArea.height === "number"
          ) {
            x = cropArea.x ?? 0;
            y = cropArea.y ?? 0;
            wZone = cropArea.width;
            hZone = cropArea.height;
          } else {
            x = (canvas.width - cw) / 2;
            y = (canvas.height - ch) / 2;
            wZone = cw;
            hZone = ch;
          }

          // enfin on dessine
          ctx.drawImage(userImg, x, y, wZone, hZone);
          drawText();
        };
      } else {
        // 3) sans image util, juste le texte
        drawText();
      }

      // 4) responsive
      canvas.style.width = "100%";
      canvas.style.height = "auto";
      canvas.style.display = "block";
    };
  }, [productImage, croppedImageData, customText, textOptions, cropArea]);

  return canvasRef;
}
