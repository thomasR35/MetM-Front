import { useState } from "react";

export function useCustomization(
  initialOptions = {
    fontFamily: "sans-serif",
    fontSize: 24,
    color: "#000000",
    position: { x: 0.5, y: 0.8 },
  }
) {
  const [customText, setCustomText] = useState("");
  const [textOptions, setTextOptions] = useState(initialOptions);
  const [croppedImageData, setCroppedImageData] = useState(null);

  return {
    customText,
    setCustomText,
    textOptions,
    setTextOptions,
    croppedImageData,
    setCroppedImageData,
  };
}
