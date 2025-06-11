// src/api/products.js
import api from "./axiosConfig.js";

export async function fetchProducts() {
  const { data } = await api.get("/products");
  return data;
}

export async function fetchProductBySlug(slug) {
  const products = await fetchProducts();
  const variations = products.filter((p) => p.category === slug);
  if (variations.length === 0) return null;

  const [first] = variations;
  return {
    ...first,
    images: variations.map((v) => v.image_url),
  };
}
