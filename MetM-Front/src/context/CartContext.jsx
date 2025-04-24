import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const stored = localStorage.getItem("metm-cart");
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem("metm-cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product, customImage = null, quantity = 1) => {
    setCartItems((prev) => {
      // on cherche un item avec même produit ET même image custom
      const idx = prev.findIndex(
        (item) =>
          item.product.id === product.id &&
          item.customImage?.dataUrl === customImage?.dataUrl
      );

      if (idx !== -1) {
        // si déjà présent, on incrémente seulement la quantité
        const next = [...prev];
        next[idx].quantity += quantity;
        return next;
      }

      // sinon on l'ajoute comme nouvelle ligne
      return [...prev, { product, customImage, quantity }];
    });
  };

  const removeFromCart = (productId, customImageDataUrl = null) => {
    setCartItems((prev) =>
      prev.filter(
        (item) =>
          !(
            item.product.id === productId &&
            item.customImage?.dataUrl === customImageDataUrl
          )
      )
    );
  };

  const updateQuantity = (productId, customImageDataUrl = null, quantity) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.product.id === productId &&
        item.customImage?.dataUrl === customImageDataUrl
          ? { ...item, quantity }
          : item
      )
    );
  };

  const clearCart = () => setCartItems([]);

  const total = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        total,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
