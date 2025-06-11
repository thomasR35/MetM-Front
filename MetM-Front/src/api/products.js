// src/api/products.js
import axios from "./axiosConfig.js";

export async function fetchProducts() {
  const { data } = await api.get("/products");
  const uploadsBase = import.meta.env.VITE_UPLOADS_URL;
  return data.map((p) => ({
    ...p,
    image_url: `${uploadsBase}${p.image_url}`,
  }));
}

export async function fetchProductBySlug(slug) {
  const products = await fetchProducts();
  // on prend tous les produits de la même category
  const variations = products.filter((p) => p.category === slug);
  if (variations.length === 0) return null;

  // on choisit le premier comme "produit principal"
  const [first] = variations;
  // on ajoute un champ images contenant tous les visuels
  return {
    ...first,
    images: variations.map((v) => v.image_url),
  };
}
