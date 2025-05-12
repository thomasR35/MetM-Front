//src/hooks/productPage/useLastVisitedProduct.js
//=====================================
import { useEffect } from "react";

export function useLastVisitedProduct(productType) {
  useEffect(() => {
    if (productType) {
      localStorage.setItem("lastProduct", productType);
    }
  }, [productType]);
}
