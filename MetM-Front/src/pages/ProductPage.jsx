// src/pages/ProductPage.jsx
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { useDropzone } from "react-dropzone";

import "../styles/pages/_ProductPage.scss";
import MockupProduct from "@/components/MockupProduct";
import ImageEditorModal from "@/components/ImageEditorModal";
import { useCart } from "@/context/CartContext";
import { uploadImage } from "@/api/images";
import { CompositeImage } from "@/services/composite/CompositeImage";
import { toast } from "react-toastify";

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

  //États pour le slider et la modale
  const [currentSlide, setCurrentSlide] = useState(0);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [croppedImageData, setCroppedImageData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [customText, setCustomText] = useState("");
  const [textOptions, setTextOptions] = useState({
    fontFamily: "sans-serif",
    fontSize: 24,
    color: "#000000",
    position: { x: 0.5, y: 0.8 },
  });

  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  // Sauvegarde du dernier produit visité
  useEffect(() => {
    if (productType) {
      try {
        localStorage.setItem("lastProduct", productType);
      } catch (e) {
        console.warn("Impossible de persister lastProduct :", e);
      }
    }
  }, [productType]);

  // Dropzone pour importer l'image
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

  // Callback après crop dans la modale
  const handleApplyCroppedImage = (data) => {
    setCroppedImageData(data);
    setIsModalOpen(false);
  };

  // Fonction pour générer l'image composite et l'ajouter au panier
  const handleAddToCart = async () => {
    try {
      const prixFloat = parseFloat(
        product.price.replace(",", ".").replace("€", "")
      );

      // Cas sans cropping
      if (!croppedImageData) {
        addToCart(
          {
            id: productType,
            name: product.name,
            price: prixFloat,
            image: product.images[currentSlide],
          },
          null,
          quantity
        );
        toast.success("Cet item a bien été ajouté au panier !");
        return;
      }

      // Génération du composite
      const composite = await CompositeImage.create({
        productImageUrl: product.images[currentSlide],
        croppedData: croppedImageData,
        customText,
        textOptions,
        cropArea: cropZones[productType][currentSlide],
      });

      // Préparation du blob pour l'upload
      const blob = await (await fetch(composite.dataUrl)).blob();

      // Upload via votre service
      const uploadResult = await uploadImage(
        blob,
        `${productType}-${Date.now()}`,
        "",
        "user123"
      );

      let finalImageUrl = composite.dataUrl;
      let finalCustomData = {
        dataUrl: composite.dataUrl,
        width: composite.width,
        height: composite.height,
      };

      if (uploadResult) {
        finalImageUrl = uploadResult.url;
        finalCustomData = {
          id: uploadResult.id,
          dataUrl: uploadResult.url,
          width: composite.width,
          height: composite.height,
        };
      } else {
        toast.warn("Échec de l’upload, l’image sera stockée localement.");
      }

      // Ajout au panier
      addToCart(
        {
          id: productType,
          name: product.name,
          price: prixFloat,
          image: finalImageUrl,
        },
        finalCustomData,
        quantity
      );
      toast.success("Cet item a bien été ajouté au panier !");
    } catch (err) {
      console.error("Erreur lors de l'ajout au panier :", err);
      toast.error("Impossible d’ajouter ce produit au panier.");
    }
  };

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
            onSlideChange={(swiper) => setCurrentSlide(swiper.activeIndex)}
          >
            {product.images.map((img, idx) => (
              <SwiperSlide key={idx}>
                <MockupProduct
                  productImage={img}
                  croppedImageData={croppedImageData}
                  customText={customText}
                  textOptions={textOptions}
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

            <label>Taille : {textOptions.fontSize}px</label>
            <input
              type="range"
              min={12}
              max={72}
              step={2}
              value={textOptions.fontSize}
              onChange={(e) =>
                setTextOptions((o) => ({ ...o, fontSize: +e.target.value }))
              }
            />

            <label>
              Position Y : {(textOptions.position.y * 100).toFixed(0)}%
            </label>
            <input
              type="range"
              min={0}
              max={1}
              step={0.01}
              value={textOptions.position.y}
              onChange={(e) =>
                setTextOptions((o) => ({
                  ...o,
                  position: { ...o.position, y: +e.target.value },
                }))
              }
            />

            <label htmlFor="fontFamily">Police :</label>
            <select
              id="fontFamily"
              value={textOptions.fontFamily}
              onChange={(e) =>
                setTextOptions((o) => ({ ...o, fontFamily: e.target.value }))
              }
            >
              <option value="sans-serif">Sans-serif</option>
              <option value="serif">Serif</option>
              <option value="cursive">Cursive</option>
              <option value="monospace">Monospace</option>
            </select>

            <label htmlFor="fontColor">Couleur :</label>
            <input
              id="fontColor"
              type="color"
              value={textOptions.color}
              onChange={(e) =>
                setTextOptions((o) => ({ ...o, color: e.target.value }))
              }
            />
          </article>

          <section className="upload-container">
            <article {...getRootProps()} className="dropzone">
              <input {...getInputProps()} />
              <p>Déposez votre image ou cliquez pour importer</p>
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

      <button className="generic-button" onClick={handleAddToCart}>
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
        <button className="generic-button">Accéder au panier</button>
      </Link>
    </main>
  );
};

export default ProductPage;
