// src/hooks/mockupProduct/useMockupProduct.js
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

      // 1) Dessine la mockup
      ctx.drawImage(baseImg, 0, 0, canvas.width, canvas.height);

      const drawText = () => {
        TextOverlay.draw(ctx, customText, textOptions);
      };

      // 2) Si image custom, on la dessine au centre
      if (croppedImageData?.dataUrl) {
        const userImg = new Image();
        userImg.crossOrigin = "anonymous";
        userImg.src = croppedImageData.dataUrl;
        userImg.onload = () => {
          const { width: cw, height: ch } = croppedImageData;
          const dx = (canvas.width - cw) / 2;
          const dy = (canvas.height - ch) / 2;
          ctx.drawImage(userImg, dx, dy, cw, ch);
          // 3) Texte par-dessus
          drawText();
        };
      } else {
        // sans custom image, on dessine directement le texte
        drawText();
      }

      // 4) Styling responsive
      canvas.style.width = "100%";
      canvas.style.height = "auto";
      canvas.style.display = "block";
    };
  }, [productImage, croppedImageData, customText, textOptions]);

  return canvasRef;
}
