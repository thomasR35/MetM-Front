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
  customization: { customText, textOptions, croppedImageData },
}) {
  const { user } = useAuth();
  const { addToCart } = useCart();
  const { setPostLoginRedirect, setShowSignup } = useAuthModal();

  async function handleAddToCart(quantity) {
    // 1) Calculer le prix en float, que product.price soit string ou number
    let prixFloat;
    if (typeof product.price === "number") {
      prixFloat = product.price;
    } else {
      // ex: "14,99€"
      prixFloat = parseFloat(
        product.price.toString().replace(",", ".").replace("€", "")
      );
      if (isNaN(prixFloat)) prixFloat = 0;
    }

    // 2) Si pas de customisation => article standard
    if (!croppedImageData && !customText.trim()) {
      addToCart(
        {
          id: productType,
          name: product.name,
          price: prixFloat,
          image: product.images[currentSlide],
        },
        null,
        quantity
      );
      toast.success("Article ajouté au panier !");
      return;
    }

    // 3) Si pas connecté => ouvrir modal d'auth
    if (!user) {
      setPostLoginRedirect(window.location.pathname);
      setShowSignup(true);
      return;
    }

    // 4) Sinon, on crée le composite et on téléverse
    try {
      const composite = await CompositeImage.create({
        productImageUrl: product.images[currentSlide],
        croppedData: croppedImageData,
        customText,
        textOptions,
        cropArea: cropZones[productType][currentSlide],
      });

      // récupérer le blob depuis le dataURL
      const blob = await (await fetch(composite.dataUrl)).blob();

      // téléversement
      // uploadImage(file, title, uploaded_by, keywordsArray)
      const uploadResult = await uploadImage(
        blob,
        `${productType}-${Date.now()}`,
        user.id,
        [] // ou un tableau de mots-clés si tu en as
      );

      // déterminer l'URL finale
      const finalImageUrl = uploadResult.url || composite.dataUrl;

      // données custom pour le panier
      const customData = {
        id: uploadResult.id,
        dataUrl: finalImageUrl,
        width: composite.width,
        height: composite.height,
      };

      // ajout au panier
      addToCart(
        {
          id: productType,
          name: product.name,
          price: prixFloat,
          image: finalImageUrl,
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
