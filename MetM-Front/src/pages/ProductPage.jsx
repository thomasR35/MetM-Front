import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { useDropzone } from "react-dropzone";

import "../styles/pages/_ProductPage.scss";
import MockupProduct from "../components/MockupProduct";
import ImageEditorModal from "../components/ImageEditorModal";
import { useCart } from "@/context/CartContext";

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

// On ne définit plus x/y, juste la taille du crop à centrer
const cropZones = {
  mug: [
    { width: 260, height: 220 },
    { width: 280, height: 240 },
    { width: 240, height: 200 },
  ],
  tshirt: [{ width: 260, height: 300 }],
  pins: [
    { width: 100, height: 100 },
    { width: 110, height: 110 },
    { width: 90, height: 90 },
  ],
};

const ProductPage = () => {
  const { productType } = useParams();
  const product = productData[productType] || productData.mug;

  const [uploadedImage, setUploadedImage] = useState(null);
  const [croppedImageData, setCroppedImageData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [customText, setCustomText] = useState("");
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/png": [".png"],
      "image/jpeg": [".jpg", ".jpeg"],
      "image/webp": [".webp"],
    },
    onDrop: (files) => {
      const file = files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = () => {
        setUploadedImage(reader.result);
        setIsModalOpen(true);
      };
      reader.readAsDataURL(file);
    },
  });

  const handleApplyCroppedImage = ({ dataUrl, width, height }) => {
    setCroppedImageData({ dataUrl, width, height });
  };

  useEffect(() => {
    if (productType) localStorage.setItem("lastProduct", productType);
  }, [productType]);

  return (
    <main className="product-page">
      <h1 className="product-banner">Personnalisation du {product.name}</h1>
      <p className="price">Prix : {product.price}</p>

      <section className="product-sections">
        <section className="product-slider">
          <Swiper
            navigation
            modules={[Navigation]}
            slidesPerView={1}
            centeredSlides
            centeredSlidesBounds
          >
            {product.images.map((img, idx) => (
              <SwiperSlide key={idx}>
                <MockupProduct
                  productImage={img}
                  croppedImageData={croppedImageData}
                  customText={customText}
                  cropArea={cropZones[productType][idx]}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </section>

        <aside className="product-aside">
          <article className="customization-options">
            <h2>Personnalisation</h2>
            <label htmlFor="customText">Texte personnalisé :</label>
            <input
              id="customText"
              type="text"
              placeholder="Entrez votre texte…"
              value={customText}
              onChange={(e) => setCustomText(e.target.value)}
            />
          </article>

          <section className="upload-container">
            <article {...getRootProps()} className="dropzone">
              <input {...getInputProps()} />
              <p>Déposez une image ici ou cliquez pour importer</p>
            </article>
          </section>
        </aside>
      </section>

      {isModalOpen && (
        <ImageEditorModal
          uploadedImage={uploadedImage}
          onClose={() => setIsModalOpen(false)}
          onApply={handleApplyCroppedImage}
        />
      )}

      <div className="quantity-selector">
        <button onClick={() => setQuantity((q) => Math.max(1, q - 1))}>
          −
        </button>
        <span>{quantity}</span>
        <button onClick={() => setQuantity((q) => q + 1)}>+</button>
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
            croppedImageData,
            quantity
          )
        }
      >
        Ajouter au panier
      </button>

      <section className="product-navigation">
        <h2>Changer de produit</h2>
        <div className="product-switch-links">
          {Object.keys(productData)
            .filter((key) => key !== productType)
            .map((key) => (
              <Link
                key={key}
                to={`/product/${key}`}
                className="product-switch-link"
              >
                {productData[key].name}
              </Link>
            ))}
        </div>
      </section>

      <Link to="/panier">
        <button className="form-button">Accéder au panier</button>
      </Link>
    </main>
  );
};

export default ProductPage;
