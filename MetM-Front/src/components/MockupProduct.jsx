// src/components/MockupProduct.jsx
// ========================
import React, { useEffect, useRef } from "react";
import { TextOverlay } from "@/services/text/TextOverlay";

const MockupProduct = ({
  productImage,
  croppedImageData,
  customText,
  cropArea,
  textOptions = {
    fontFamily: "sans-serif",
    fontSize: 24,
    color: "#000000",
    position: { x: 0.5, y: 0.8 },
  },
}) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const base = new Image();
    base.crossOrigin = "anonymous";
    base.src = productImage;

    base.onload = () => {
      // 1) taille du canvas = mockup
      canvas.width = base.width;
      canvas.height = base.height;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      // 2) on dessine la mockup
      ctx.drawImage(base, 0, 0, canvas.width, canvas.height);

      // 3) on dessine le crop au centre
      if (croppedImageData?.dataUrl) {
        const user = new Image();
        user.crossOrigin = "anonymous";
        user.src = croppedImageData.dataUrl;
        user.onload = () => {
          const { width: cw, height: ch } = croppedImageData;
          const dx = (canvas.width - cw) / 2;
          const dy = (canvas.height - ch) / 2;
          ctx.drawImage(user, dx, dy, cw, ch);
          // 4) enfin, le texte par-dessus
          TextOverlay.draw(ctx, customText, textOptions);
        };
      } else {
        // sans crop on peut dessiner le texte tout de suite
        TextOverlay.draw(ctx, customText, textOptions);
      }

      // 5) responsive
      canvas.style.width = "100%";
      canvas.style.height = "auto";
      canvas.style.display = "block";
    };
  }, [productImage, croppedImageData, customText, textOptions]);

  return <canvas ref={canvasRef} />;
};

export default MockupProduct;
