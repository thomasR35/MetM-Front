//src/hooks/productPage/useAddToCart.js
//=====================================
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

  async function handleAddToCart(quantity) {
    const prix = product.price;
    // sans modification
    if (!customization.croppedImageData) {
      addToCart(
        {
          id: productType,
          name: product.name,
          price: prix,
          image: product.images[currentSlide],
        },
        null,
        quantity
      );
      toast.success("Article ajouté au panier !");
      return;
    }

    if (!user) {
      setPostLoginRedirect(window.location.pathname);
      setShowSignup(true);
      return;
    }

    try {
      const composite = await CompositeImage.create({
        productImageUrl: product.images[currentSlide],
        croppedData: customization.croppedImageData,
        customText: customization.customText,
        textOptions: customization.textOptions,
        cropArea: cropZones[productType][currentSlide],
      });
      const blob = await (await fetch(composite.dataUrl)).blob();
      const uploadResult = await uploadImage(
        blob,
        `${productType}-${Date.now()}`,
        "",
        user.id
      );
      const finalUrl = uploadResult?.url || composite.dataUrl;
      const customData = uploadResult
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

      addToCart(
        { id: productType, name: product.name, price: prix, image: finalUrl },
        customData,
        quantity
      );
      toast.success("Article ajouté au panier !");
    } catch (err) {
      console.error(err);
      toast.error("Échec de l'ajout au panier.");
    }
  }

  return { handleAddToCart };
}
