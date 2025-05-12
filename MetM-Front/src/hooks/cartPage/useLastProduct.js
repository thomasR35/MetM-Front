// src/hooks/useLastProduct.js
import { useMemo } from "react";

export function useLastProduct(defaultType = "mug") {
  return useMemo(
    () => localStorage.getItem("lastProduct") || defaultType,
    [defaultType]
  );
}
