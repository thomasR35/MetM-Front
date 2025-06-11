// src/api/products.js
import api from "./axiosConfig.js";

// On récupère la liste des produits et on préfixe correctement les URLs d'image
const uploadsBase = import.meta.env.VITE_UPLOADS_URL.replace(/\/$/, "");

export async function fetchProducts() {
  const { data } = await api.get("/products");

  return data.map((p) => {
    let raw = p.image_url;

    // Si p.image_url commence par "/uploads/", on l'enlève
    if (raw.startsWith("/uploads/")) {
      raw = raw.replace(/^\/uploads\//, "");
    }

    return {
      ...p,
      image_url: `${uploadsBase}/${raw}`,
    };
  });
}

/**
 * Renvoie un produit « principal » et ses variations via slug (category)
 */
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
