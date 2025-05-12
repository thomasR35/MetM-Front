// src/hooks/productPage/useAddToCart.js
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
  customization,
}) {
  const { user } = useAuth();
  const { addToCart } = useCart();
  const { setPostLoginRedirect, setShowSignup } = useAuthModal();
  const { croppedImageData, customText, textOptions } = customization;

  async function handleAddToCart(quantity) {
    const price =
      typeof product.price === "string"
        ? parseFloat(product.price.replace(",", "."))
        : product.price;

    // 1) Cas « sans custom » : on ajoute directement
    const noCustom = !croppedImageData && !customText.trim();
    if (noCustom) {
      addToCart(
        {
          id: productType,
          name: product.name,
          price,
          image: product.images[currentSlide],
        },
        null,
        quantity
      );
      toast.success("Article ajouté au panier !");
      return;
    }

    // 2) Si pas loggé, on redirige vers l’inscription
    if (!user) {
      setPostLoginRedirect(window.location.pathname);
      setShowSignup(true);
      return;
    }

    try {
      // 3) Génération de l’image composite en local
      const composite = await CompositeImage.create({
        productImageUrl: product.images[currentSlide],
        croppedData: croppedImageData,
        customText,
        textOptions,
        cropArea: cropZones[productType][currentSlide],
      });

      // 4) Transformation du dataUrl en Blob
      const blob = await (await fetch(composite.dataUrl)).blob();

      // 5) Upload vers le serveur (on ne passe plus uploaded_by)
      const uploadResult = await uploadImage(
        blob,
        `${productType}-${Date.now()}`,
        user.id,
        []
      );

      // 6) Détermination de l’URL finale
      const finalUrl = (uploadResult && uploadResult.url) || composite.dataUrl;

      // 7) Préparation des données « custom » pour le panier
      const customData =
        uploadResult && uploadResult.id
          ? {
              id: uploadResult.id,
              dataUrl: finalUrl,
              width: composite.width,
              height: composite.height,
            }
          : {
              dataUrl: finalUrl,
              width: composite.width,
              height: composite.height,
            };

      // 8) On ajoute au panier
      addToCart(
        {
          id: productType,
          name: product.name,
          price,
          image: finalUrl,
        },
        customData,
        quantity
      );

      toast.success("Article ajouté au panier !");
    } catch (err) {
      console.error("Erreur handleAddToCart :", err);
      toast.error("Échec de l'ajout au panier.");
    }
  }

  return { handleAddToCart };
}
