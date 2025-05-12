import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";

export function useImageUpload() {
  const [uploadedImage, setUploadedImage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const onDrop = useCallback((files) => {
    const file = files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setUploadedImage(reader.result);
      setIsModalOpen(true);
    };
    reader.readAsDataURL(file);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/png": [".png"],
      "image/jpeg": [".jpg", ".jpeg"],
      "image/webp": [".webp"],
    },
    onDrop,
  });

  const onApply = (data) => {
    setIsModalOpen(false);
    return data;
  };

  return {
    uploadedImage,
    isModalOpen,
    openModal: () => setIsModalOpen(true),
    closeModal: () => setIsModalOpen(false),
    onApply,
    getRootProps,
    getInputProps,
  };
}
