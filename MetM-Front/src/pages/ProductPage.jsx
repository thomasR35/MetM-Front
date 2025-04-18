import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { useDropzone } from "react-dropzone";
import "../styles/pages/_ProductPage.scss";
import MockupProduct from "../components/MockupProduct";
import ImageEditorModal from "../components/ImageEditorModal";
import { useCart } from "@/context/CartContext";
import { Link } from "react-router-dom";

import mug1 from "../assets/images/mug1.jpg";
import mug2 from "../assets/images/mug2.jpg";
import mug3 from "../assets/images/mug3.jpg";
import tshirt from "../assets/images/tshirt.jpg";
import pins1 from "../assets/images/pins1.jpg";
import pins2 from "../assets/images/pins2.jpg";
import pins3 from "../assets/images/pins3.jpg";

const productData = {
  mug: { name: "Mug", price: "14,99€", images: [mug1, mug2, mug3] },
  tshirt: { name: "T-Shirt", price: "19,99€", images: [tshirt] },
  pins: { name: "Pin’s", price: "9,99€", images: [pins1, pins2, pins3] },
};

const ProductPage = () => {
  const { productType } = useParams();
  const product = productData[productType] ?? productData.mug;

  if (!product || !product.images) {
    return <p>❌ Produit introuvable</p>;
  }

  const [uploadedImage, setUploadedImage] = useState(null);
  const [croppedImageDetails, setCroppedImageDetails] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tshirtColor, setTshirtColor] = useState("#ffffff");
  const [customText, setCustomText] = useState("");
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/png": [".png"],
      "image/jpeg": [".jpg", ".jpeg"],
      "image/webp": [".webp"],
    },
    onDrop: (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = () => {
        setUploadedImage(reader.result);
        setIsModalOpen(true);
      };
      reader.readAsDataURL(file);
    },
  });

  const handleApplyCroppedImage = (imageData) => {
    if (!imageData) return;
    setCroppedImageDetails(imageData);
  };

  const { addToCart } = useCart();

  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (productType) {
      localStorage.setItem("lastProduct", productType);
    }
  }, [productType]);

  return (
    <main className="product-page">
      <h1 className="product-banner">Personnalisation du {product.name}</h1>
      <p className="price">Prix : {product.price}</p>

      <section className="product-content">
        <Swiper
          navigation={true}
          modules={[Navigation]}
          className="product-slider"
        >
          {product.images.map((img, index) => (
            <SwiperSlide key={index}>
              <MockupProduct
                productImage={img}
                croppedImageData={croppedImageDetails}
                tshirtColor={productType === "tshirt" ? tshirtColor : null}
                customText={productType === "tshirt" ? customText : null}
              />
            </SwiperSlide>
          ))}
        </Swiper>

        {productType === "tshirt" && (
          <article className="customization-options">
            <h2>Personnalisation</h2>
            <label htmlFor="tshirtColor">Choisissez la couleur :</label>
            <input
              type="color"
              id="tshirtColor"
              value={tshirtColor}
              onChange={(e) => setTshirtColor(e.target.value)}
            />
            <label htmlFor="customText">Texte personnalisé :</label>
            <input
              type="text"
              id="customText"
              placeholder="Entrez votre texte..."
              value={customText}
              onChange={(e) => setCustomText(e.target.value)}
            />
          </article>
        )}
      </section>

      <section className="upload-container">
        <article {...getRootProps()} className="dropzone">
          <input {...getInputProps()} />
          <p>Déposez une image ici ou cliquez pour importer</p>
        </article>
      </section>

      {isModalOpen && (
        <ImageEditorModal
          uploadedImage={uploadedImage}
          onClose={() => setIsModalOpen(false)}
          onApply={handleApplyCroppedImage}
        />
      )}

      <div className="quantity-selector">
        <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>
          −
        </button>
        <span>{quantity}</span>
        <button onClick={() => setQuantity(quantity + 1)}>+</button>
      </div>

      <button
        className="form-button"
        onClick={() =>
          addToCart(
            {
              id: productType,
              name: product.name,
              price: parseFloat(
                product.price.replace(",", ".").replace("€", "")
              ),
              image: product.images[0],
            },
            croppedImageDetails,
            quantity
          )
        }
      >
        Ajouter au panier
      </button>
      <Link to="/panier">
        <button className="form-button">Accéder au panier</button>
      </Link>
    </main>
  );
};

export default ProductPage;
