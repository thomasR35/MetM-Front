// src/hooks/pages/productPage/useAddToCart.js
// ======================================

import { useAuthModal } from "@/context/AuthModalContext";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import { CompositeImage } from "@/services/composite/CompositeImage";
import { uploadImage } from "@/api/images";
import { toast } from "react-toastify";

export function useAddToCart({
  productType,
  product,
  currentSlide,
  cropZones,
  customization: { customText, textOptions, customImageData },
}) {
  const { user } = useAuth();
  const { addToCart } = useCart();
  const { setPostLoginRedirect, setShowSignup } = useAuthModal();

  async function handleAddToCart(quantity) {
    // 1) Prix en float
    let prixFloat =
      typeof product.price === "number"
        ? product.price
        : parseFloat(
            product.price.toString().replace(",", ".").replace("€", "")
          ) || 0;

    // 2) Aucun custom => standard
    if (!customImageData && !customText.trim()) {
      addToCart(
        {
          id: product.id,
          name: product.name,
          price: prixFloat,
          image_url: product.images[currentSlide],
          slug: product.slug,
        },
        null,
        quantity
      );
      toast.success("Article ajouté au panier !");
      return;
    }

    // 3) Pas connecté => modale d'authent
    if (!user) {
      setPostLoginRedirect(window.location.pathname);
      setShowSignup(true);
      return;
    }

    // 4) Composer et téléverser si custom
    let finalImageUrl = product.images[currentSlide];
    let customData = null;

    if (customImageData) {
      // extraire dataUrl & dimensions de customImageData
      const {
        dataUrl: croppedDataUrl,
        width: cw,
        height: ch,
      } = customImageData;
      const croppedData = { dataUrl: croppedDataUrl, width: cw, height: ch };

      // créer le composite
      const composite = await CompositeImage.create({
        productImageUrl: product.images[currentSlide],
        croppedData,
        customText,
        textOptions,
        cropArea: cropZones[productType],
      });

      // récupérer le blob et téléverser
      const blob = await (await fetch(composite.dataUrl)).blob();
      const uploadResult = await uploadImage(
        blob,
        `${productType}-${Date.now()}`,
        user.id,
        []
      );

      finalImageUrl = uploadResult.url || composite.dataUrl;
      customData = {
        id: uploadResult.id,
        dataUrl: finalImageUrl,
        width: composite.width,
        height: composite.height,
      };
    }

    // 5) Ajouter au panier
    try {
      addToCart(
        {
          id: product.id,
          slug: product.slug,
          name: product.name,
          price: prixFloat,
          image_url: finalImageUrl,
          slug: product.slug,
        },
        customData,
        quantity
      );
      toast.success("Article ajouté au panier !");
    } catch (err) {
      console.error("Erreur handleAddToCart :", err);
      toast.error(err.message || "Échec de l'ajout au panier.");
    }
  }

  return { handleAddToCart };
}
