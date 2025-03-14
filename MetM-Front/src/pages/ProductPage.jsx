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

const productData = {
  mug: {
    name: "Mug",
    price: "14,99€",
    images: [
      `${import.meta.env.BASE_URL}src/assets/images/mug1.jpg`,
      `${import.meta.env.BASE_URL}src/assets/images/mug2.jpg`,
      `${import.meta.env.BASE_URL}src/assets/images/mug3.jpg`,
    ],
    customOptions: ["Fond coloré", "Texte personnalisé", "Motif spécial"],
  },
  tshirt: {
    name: "T-Shirt",
    price: "19,99€",
    images: [`${import.meta.env.BASE_URL}src/assets/images/tshirt.jpg`],
    customOptions: [
      "Couleur du T-Shirt",
      "Ajout d'image",
      "Texte personnalisé",
    ],
  },
  pins: {
    name: "Pin’s",
    price: "9,99€",
    images: [
      `${import.meta.env.BASE_URL}src/assets/images/pins1.jpg`,
      `${import.meta.env.BASE_URL}src/assets/images/pins2.jpg`,
      `${import.meta.env.BASE_URL}src/assets/images/pins3.jpg`,
    ],
    customOptions: ["Forme du Pin’s", "Effet brillant", "Gravure spéciale"],
  },
};

const ProductPage = () => {
  const { productType } = useParams();
  const product = productData[productType] ?? productData.mug;

  if (
    !product ||
    !Array.isArray(product.images) ||
    product.images.length === 0
  ) {
    console.error("❌ Produit introuvable ou sans images :", productType);
    return <p>❌ Produit introuvable ou sans images</p>;
  }

  const [uploadedImage, setUploadedImage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
    <main className="product-page">
      <h1 className="product-banner">Personnalisation - {product.name}</h1>
      <p className="price"> Prix : {product.price}</p>

      <section className="product-content">
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

        {Array.isArray(product.customOptions) &&
          product.customOptions.length > 0 && (
            <article className="customization-options">
              <h2>Options de personnalisation</h2>
              <div className="option-buttons">
                {product.customOptions.map((option, index) => (
                  <button key={index}>{option}</button>
                ))}
              </div>
            </article>
          )}
      </section>

      <section className="upload-container">
        <article {...getRootProps()} className="dropzone">
          <input {...getInputProps()} />
          <p>Déposez une image (PNG, JPG, WEBP) ici ou cliquez pour importer</p>
        </article>
      </section>

      {isModalOpen && (
        <ImageEditorModal
          uploadedImage={uploadedImage}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </main>
  );
};

export default ProductPage;
