import React, { useEffect, useRef } from "react";
import * as fabric from "fabric";

const MockupProduct = ({ product, uploadedImage }) => {
  const canvasRef = useRef(null);
  const fabricCanvas = useRef(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    // 🔹 Initialisation du Canvas
    const canvas = new fabric.Canvas(canvasRef.current, {
      width: 400,
      height: 500,
      backgroundColor: "transparent",
    });

    fabricCanvas.current = canvas;

    // 🔹 Charger l’image du produit (Mockup) en arrière-plan
    fabric.Image.fromURL(product.image, (img) => {
      img.set({
        left: 0,
        top: 0,
        selectable: false,
        evented: false,
        scaleX: canvas.width / img.width,
        scaleY: canvas.height / img.height,
      });

      canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas));
    });

    return () => {
      canvas.dispose(); // Nettoyage du canvas à la destruction du composant
    };
  }, [product]);

  useEffect(() => {
    if (!uploadedImage || !fabricCanvas.current) return;

    // 🔹 Ajouter l’image uploadée sur le produit
    fabric.Image.fromURL(uploadedImage, (img) => {
      img.set({
        left: 100,
        top: 100,
        scaleX: 0.5,
        scaleY: 0.5,
        cornerSize: 10,
        hasRotatingPoint: true,
      });

      fabricCanvas.current.add(img);
      fabricCanvas.current.setActiveObject(img);
      fabricCanvas.current.renderAll();
    });
  }, [uploadedImage]);

  return (
    <div className="mockup-wrapper">
      <canvas ref={canvasRef} />
    </div>
  );
};

export default MockupProduct;
