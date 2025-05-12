import { useState, useRef, useLayoutEffect, useCallback } from "react";
import useDragPosition from "@/hooks/imageEditorModal/useDragPosition";
import { Cropper } from "@/services/cropping/Cropper";

/**
 * Hook de gestion de la modale d'édition d'image.
 * @param {string} uploadedImage — dataUrl de l'image à recadrer
 * @param {(crop: {dataUrl:string,width:number,height:number}) => void} onApply
 * @param {() => void} onClose
 */
export function useImageEditor(uploadedImage, onApply, onClose) {
  // zoom et format de cadre
  const [scale, setScale] = useState(1);
  const [selectedFrame, setSelectedFrame] = useState("square");
  // refs pour le DOM
  const imageRef = useRef(null);
  const imgContainerRef = useRef(null);
  const frameRef = useRef(null);
  // position du drag
  const { position, startDragging } = useDragPosition();
  // masque = dimensions & position relative dans le container
  const [mask, setMask] = useState({ width: 0, height: 0, left: 0, top: 0 });

  // dès que l'image ou le type de cadre change, on recalcule le masque
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
  }, [uploadedImage, selectedFrame]);

  // Applique le crop et ferme la modale
  const applyCropping = useCallback(() => {
    const maskRect = frameRef.current.getBoundingClientRect();
    const cropper = new Cropper(imageRef.current, maskRect, selectedFrame);
    const { dataUrl, width, height } = cropper.crop();
    onApply({ dataUrl, width, height });
    onClose();
  }, [onApply, onClose, selectedFrame]);

  return {
    // state + setters
    scale,
    setScale,
    selectedFrame,
    setSelectedFrame,
    mask,

    // refs & drag
    imageRef,
    imgContainerRef,
    frameRef,
    position,
    startDragging,

    // actions
    applyCropping,
    onClose,
  };
}
