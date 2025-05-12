//src/hooks/productPage/useLastVisitedProduct.js
//=====================================
import { useState, useCallback } from "react";

export function useQuantity(initial = 1) {
  const [quantity, setQuantity] = useState(initial);
  const increment = useCallback(() => setQuantity((q) => q + 1), []);
  const decrement = useCallback(
    () => setQuantity((q) => Math.max(1, q - 1)),
    []
  );
  return { quantity, increment, decrement };
}
