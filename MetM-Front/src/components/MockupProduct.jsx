import React, { useEffect, useRef } from "react";

const MockupProduct = ({
  productImage,
  croppedImageData,
  customText,
  cropArea,
}) => {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const base = new Image();
    base.src = productImage;
    base.onload = () => {
      // 1) init canvas à la taille naturelle
      canvas.width = base.width;
      canvas.height = base.height;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      // 2) dessin de la mockup
      ctx.drawImage(base, 0, 0);
      // 3) si crop, on le centre
      if (croppedImageData?.dataUrl) {
        const { dataUrl, width: cw, height: ch } = croppedImageData;
        const userImg = new Image();
        userImg.src = dataUrl;
        userImg.onload = () => {
          const dx = (canvas.width - cw) / 2;
          const dy = (canvas.height - ch) / 2;
          ctx.drawImage(userImg, dx, dy, cw, ch);
        };
      }
      // 4) texte perso
      if (customText) {
        ctx.font = "24px sans-serif";
        ctx.fillStyle = "#000";
        ctx.textAlign = "center";
        ctx.fillText(customText, canvas.width / 2, canvas.height - 30);
      }
      // 5) responsive
      canvas.style.width = "100%";
      canvas.style.height = "auto";
      canvas.style.display = "block";
    };
  }, [productImage, croppedImageData, customText]);

  return <canvas ref={canvasRef} />;
};

export default MockupProduct;
