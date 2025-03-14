import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { useDropzone } from "react-dropzone";
import "../styles/pages/_ProductPage.scss";
import MockupProduct from "../components/MockupProduct";
import ImageEditorModal from "../components/ImageEditorModal";

// 🔹 Définition des produits
const productData = {
  mug: {
    name: "Mug",
    price: "14,99€",
    images: [
      "/assets/images/mug1.png",
      "/assets/images/mug2.png",
      "/assets/images/mug3.png",
    ],
  },
  tshirt: {
    name: "T-Shirt",
    price: "19,99€",
    images: [
      "/assets/images/tshirt1.png",
      "/assets/images/tshirt2.png",
      "/assets/images/tshirt3.png",
    ],
  },
  pins: {
    name: "Pin’s",
    price: "9,99€",
    images: [
      "/assets/images/pins1.png",
      "/assets/images/pins2.png",
      "/assets/images/pins3.png",
    ],
  },
};

const ProductPage = () => {
  const { productType } = useParams();
  const product = productData[productType] || productData.mug;

  const [uploadedImage, setUploadedImage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 🔹 Gestion de l'upload
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/png": [".png"],
      "image/jpeg": [".jpg", ".jpeg"],
      "image/webp": [".webp"],
    },
    onDrop: (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (!file) return;

      console.log("📸 Image uploadée :", file.name);

      const reader = new FileReader();
      reader.onload = () => {
        setUploadedImage(reader.result);
        setIsModalOpen(true);
      };

      reader.readAsDataURL(file);
    },
  });

  return (
    <div className="product-page">
      <h1>Personnalisation - {product.name}</h1>
      <p className="price">Prix : {product.price}</p>

      {/* 🔹 Slider du produit */}
      <Swiper
        navigation={true}
        modules={[Navigation]}
        className="product-slider"
      >
        {product.images.map((img, index) => (
          <SwiperSlide key={index}>
            <MockupProduct productImage={img} uploadedImage={uploadedImage} />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* 🔹 Zone d'upload */}
      <div className="upload-container">
        <div {...getRootProps()} className="dropzone">
          <input {...getInputProps()} />
          <p>Déposez une image (PNG, JPG, WEBP) ici ou cliquez pour importer</p>
        </div>
      </div>

      {/* 🔹 Modale d'édition */}
      {isModalOpen && (
        <ImageEditorModal
          uploadedImage={uploadedImage}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};

export default ProductPage;
