// src/hooks/useCartOperations.js
import { useCallback } from "react";
import { useCart } from "@/context/CartContext";

export function useCartOperations() {
  const { updateQuantity, removeFromCart } = useCart();

  const handleDecrement = useCallback(
    (item) => {
      if (item.quantity > 1) {
        updateQuantity(
          item.product.id,
          item.customImage?.dataUrl,
          item.quantity - 1
        );
      } else {
        if (window.confirm(`Supprimer ${item.product.name} du panier ?`)) {
          removeFromCart(item.product.id, item.customImage?.dataUrl);
        }
      }
    },
    [updateQuantity, removeFromCart]
  );

  const handleIncrement = useCallback(
    (item) => {
      updateQuantity(
        item.product.id,
        item.customImage?.dataUrl,
        item.quantity + 1
      );
    },
    [updateQuantity]
  );

  const handleRemove = useCallback(
    (item) => {
      if (window.confirm(`Supprimer ${item.product.name} du panier ?`)) {
        removeFromCart(item.product.id, item.customImage?.dataUrl);
      }
    },
    [removeFromCart]
  );

  return { handleDecrement, handleIncrement, handleRemove };
}
