// src/components/MockupProduct.jsx
// ========================
import React from "react";
import { useMockupProduct } from "@/hooks/components/mockupProduct/useMockupProduct";

export default function MockupProduct(props) {
  // le hook encapsule tout l'useEffect et le ref
  const canvasRef = useMockupProduct(props);

  return <canvas ref={canvasRef} />;
}
