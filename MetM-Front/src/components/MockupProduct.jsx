import React, { useEffect, useRef } from "react";
import * as fabric from "fabric";

const MockupProduct = ({ product, uploadedImage }) => {
  const canvasRef = useRef(null);
  const fabricCanvas = useRef(null);

  useEffect(() => {
    if (!canvasRef.current || !product?.image) return;

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
      canvas.dispose();
    };
  }, [product]);

  useEffect(() => {
    if (!uploadedImage || !fabricCanvas.current) return;

    const canvas = fabricCanvas.current;

    // 🔹 Supprimer toutes les images uploadées précédentes
    canvas.getObjects().forEach((obj) => {
      if (obj.type === "image") {
        canvas.remove(obj);
      }
    });

    // 🔹 Ajouter l’image uploadée sur le produit
    fabric.Image.fromURL(uploadedImage, (img) => {
      img.set({
        left: canvas.width / 4,
        top: canvas.height / 4,
        scaleX: 0.5,
        scaleY: 0.5,
        cornerSize: 10,
        hasRotatingPoint: true,
        selectable: true,
      });

      canvas.add(img);
      canvas.setActiveObject(img);
      canvas.renderAll();
    });
  }, [uploadedImage]);

  return (
    <div className="mockup-wrapper">
      <canvas ref={canvasRef} />
    </div>
  );
};

export default MockupProduct;
