import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import "../styles/pages/_Home.scss";
import { useDropzone } from "react-dropzone";
import MockupProduct from "../components/MockupProduct";

import tshirt from "../assets/images/tshirt.svg";
import mug from "../assets/images/mug.svg";
import pins from "../assets/images/pins.svg";

const products = [
  { id: 1, name: "T-Shirt", image: tshirt },
  { id: 2, name: "Mug", image: mug },
  { id: 3, name: "Pin's", image: pins },
];

const Home = () => {
  const [selectedProduct, setSelectedProduct] = useState(products[0]);
  const [uploadedImage, setUploadedImage] = useState(null);

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
      };

      reader.readAsDataURL(file);
    },
  });

  return (
    <div className="home-container">
      <header className="home-banner">
        <h1>Personnalisez vos objets favoris</h1>
      </header>

      <div className="content-container">
        {/* 🔹 Slider */}
        <div className="slider-container">
          <Swiper
            navigation={true}
            modules={[Navigation]}
            className="home-slider"
            onSlideChange={(swiper) => {
              const newIndex = swiper.activeIndex % products.length;
              setSelectedProduct(products[newIndex]);
            }}
          >
            {products.map((product) => (
              <SwiperSlide key={product.id}>
                <MockupProduct
                  product={product}
                  uploadedImage={uploadedImage}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* 🔹 Zone d’upload */}
        <div className="upload-container">
          <div {...getRootProps()} className="dropzone">
            <input {...getInputProps()} />
            <p>
              Déposez une image (PNG, JPG, WEBP) ici ou cliquez pour importer
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
