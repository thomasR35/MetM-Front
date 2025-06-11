// src/api/products.js
import api from "./axiosConfig.js";

const uploadsBase = import.meta.env.VITE_UPLOADS_URL;

export async function fetchProducts() {
  const { data } = await api.get("/products");
  return data.map((p) => ({
    ...p,
    // si image_url vaut "/uploads/foo.webp", on construit :
    image_url: p.image_url.startsWith("http")
      ? p.image_url
      : `${uploadsBase}${p.image_url}`,
  }));
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
