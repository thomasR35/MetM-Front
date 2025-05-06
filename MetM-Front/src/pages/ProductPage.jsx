// src/pages/ProductPage.jsx
// ========================
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { useDropzone } from "react-dropzone";
import { useAuth } from "@/context/AuthContext";
import { useAuthModal } from "@/context/AuthModalContext";

import "../styles/pages/_ProductPage.scss";
import MockupProduct from "@/components/MockupProduct";
import ImageEditorModal from "@/components/ImageEditorModal";
import SaveCreationModal from "@/components/SaveCreationModal";
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

function ProductPage() {
  const { user } = useAuth();
  const { productType } = useParams();
  const product = productData[productType] || productData.mug;

  const [currentSlide, setCurrentSlide] = useState(0);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [croppedImageData, setCroppedImageData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { setShowSignup, setPostLoginRedirect } = useAuthModal();
  const [customText, setCustomText] = useState("");
  const [textOptions, setTextOptions] = useState({
    fontFamily: "sans-serif",
    fontSize: 24,
    color: "#000000",
    position: { x: 0.5, y: 0.8 },
  });
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);

  // Persistance du dernier produit visité
  useEffect(() => {
    if (productType) {
      localStorage.setItem("lastProduct", productType);
    }
  }, [productType]);

  // Configuration de la dropzone
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

  const handleSaveClick = () => {
    // si aucune modif (ni image custom, ni texte)
    if (!croppedImageData && !customText.trim()) {
      toast.info("Aucune modification détectée.");
      return;
    }

    if (!user) {
      setPostLoginRedirect(window.location.pathname);
      setShowSignup(true);
    } else {
      setIsSaveModalOpen(true);
    }
  };

  const handleApplyCroppedImage = (data) => {
    setCroppedImageData(data);
    setIsModalOpen(false);
  };

  const handleAddToCart = async () => {
    const prixFloat = parseFloat(
      product.price.replace(",", ".").replace("€", "")
    );
    // Sans custom image
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
      toast.success("Article ajouté au panier !");
      return;
    }
    // Avec custom image
    try {
      const composite = await CompositeImage.create({
        productImageUrl: product.images[currentSlide],
        croppedData: croppedImageData,
        customText,
        textOptions,
        cropArea: cropZones[productType][currentSlide],
      });
      const blob = await (await fetch(composite.dataUrl)).blob();
      const uploadResult = await uploadImage(
        blob,
        `${productType}-${Date.now()}`,
        "",
        "user123"
      );
      const finalImageUrl = uploadResult?.url || composite.dataUrl;
      const finalCustomData = uploadResult
        ? {
            id: uploadResult.id,
            dataUrl: uploadResult.url,
            width: composite.width,
            height: composite.height,
          }
        : {
            dataUrl: composite.dataUrl,
            width: composite.width,
            height: composite.height,
          };

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
      toast.success("Article ajouté au panier !");
    } catch (err) {
      console.error(err);
      toast.error("Échec de l'ajout au panier.");
    }
  };

  return (
    <main
      id="main-content"
      role="main"
      aria-labelledby="product-title"
      className="product-page"
    >
      <h1 id="product-title" className="product-banner">
        Personnalisation du {product.name}
      </h1>

      <p className="price" aria-label={`Prix : ${product.price}`}>
        Prix : {product.price}
      </p>

      {/* ↕ Le wrapper d’origine pour aligner slider + aside */}
      <section
        className="product-sections"
        role="region"
        aria-labelledby="customization-section"
      >
        <h2 id="customization-section" className="sr-only">
          Personnalisation et aperçu
        </h2>

        {/* Slider */}
        <section
          className="product-slider"
          role="region"
          aria-labelledby="slider-title"
        >
          <h3 id="slider-title" className="sr-only">
            Galerie d’images {product.name}
          </h3>
          <Swiper
            modules={[Navigation]}
            navigation
            slidesPerView={1}
            centeredSlides
            onSlideChange={(s) => setCurrentSlide(s.activeIndex)}
            aria-live="polite"
            aria-roledescription="carousel"
          >
            {product.images.map((img, idx) => (
              <SwiperSlide
                key={idx}
                aria-roledescription="slide"
                aria-label={`${product.name}, vue ${idx + 1}`}
              >
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

        {/* Options de personnalisation */}
        <aside
          className="product-aside"
          role="region"
          aria-labelledby="options-title"
        >
          <h3 id="options-title" className="sr-only">
            Options de personnalisation
          </h3>

          <form
            className="customization-options"
            onSubmit={(e) => e.preventDefault()}
          >
            <fieldset>
              <legend>Texte personnalisé</legend>
              <label htmlFor="customText">Texte :</label>
              <input
                id="customText"
                type="text"
                placeholder="Entrez votre texte…"
                value={customText}
                onChange={(e) => setCustomText(e.target.value)}
              />
            </fieldset>

            <fieldset>
              <legend>Taille du texte</legend>
              <label htmlFor="fontSizeRange">
                Taille : {textOptions.fontSize}px
              </label>
              <input
                id="fontSizeRange"
                type="range"
                min={12}
                max={72}
                step={2}
                value={textOptions.fontSize}
                onChange={(e) =>
                  setTextOptions((o) => ({ ...o, fontSize: +e.target.value }))
                }
              />
            </fieldset>

            <fieldset>
              <legend>Position verticale</legend>
              <label htmlFor="positionRange">
                Position Y : {Math.round(textOptions.position.y * 100)}%
              </label>
              <input
                id="positionRange"
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
            </fieldset>

            <fieldset>
              <legend>Police</legend>
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
            </fieldset>

            <fieldset>
              <legend>Couleur du texte</legend>
              <label htmlFor="fontColor">Couleur :</label>
              <input
                id="fontColor"
                type="color"
                value={textOptions.color}
                onChange={(e) =>
                  setTextOptions((o) => ({ ...o, color: e.target.value }))
                }
              />
            </fieldset>
          </form>

          {/* Import d’image */}
          <section
            className="upload-container"
            role="region"
            aria-labelledby="upload-title"
          >
            <h3 id="upload-title" className="sr-only">
              Importer une image
            </h3>
            <div
              {...getRootProps()}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ")
                  getRootProps().onClick(e);
              }}
              aria-label="Importer une image pour personnaliser le produit"
              className="dropzone"
            >
              <input {...getInputProps()} />
              <p>Déposez votre image ou cliquez pour importer</p>
            </div>
          </section>
        </aside>
      </section>

      {/* Modal de recadrage */}
      {isModalOpen && (
        <ImageEditorModal
          uploadedImage={uploadedImage}
          onClose={() => setIsModalOpen(false)}
          onApply={handleApplyCroppedImage}
        />
      )}

      {/* Modale d’enregistrement */}
      {isSaveModalOpen && (
        <SaveCreationModal
          isOpen={isSaveModalOpen}
          onClose={() => setIsSaveModalOpen(false)}
          productType={productType}
          productImages={product.images}
          currentSlide={currentSlide}
          croppedImageData={croppedImageData}
          customText={customText}
          textOptions={textOptions}
          cropArea={cropZones[productType][currentSlide]}
        />
      )}

      {/* Quantité */}
      <section
        role="group"
        aria-label="Choix de la quantité"
        className="quantity-selector"
      >
        <button
          aria-label={`Réduire la quantité (actuellement ${quantity})`}
          onClick={() => setQuantity((q) => Math.max(1, q - 1))}
        >
          −
        </button>
        <span aria-live="polite" aria-atomic="true">
          {quantity}
        </span>
        <button
          aria-label={`Augmenter la quantité (actuellement ${quantity})`}
          onClick={() => setQuantity((q) => q + 1)}
        >
          +
        </button>
      </section>

      {/* Ajouter au panier */}
      <button
        className="generic-button"
        onClick={handleAddToCart}
        aria-label={`Ajouter ${quantity} ${product.name} au panier`}
      >
        Ajouter au panier
      </button>

      {/* Changer de produit */}
      <nav
        role="navigation"
        aria-labelledby="switch-product-title"
        className="product-navigation"
      >
        <h2 id="switch-product-title">Changer de produit</h2>
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
      </nav>

      {/* Lien vers le panier */}
      <Link to="/panier">
        <button className="generic-button" aria-label="Accéder au panier">
          Accéder au panier
        </button>
      </Link>

      <button
        className="generic-button"
        onClick={handleSaveClick}
        aria-label="Enregistrer la création"
      >
        Enregistrer la création
      </button>
    </main>
  );
}

export default ProductPage;
