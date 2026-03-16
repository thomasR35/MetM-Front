// src/pages/ProductPage.jsx
// ========================
import { useState, useEffect } from "react";
import { useParams, Link, useLocation } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { toast } from "react-toastify";

import { fetchProductBySlug } from "@/api/products";
import { cropZones } from "@/services/cropping/cropZones";
import { useLastVisitedProduct } from "@/hooks/pages/productPage/useLastVisitedProduct";
import { useImageUpload } from "@/hooks/pages/productPage/useImageUpload";
import { useCustomization } from "@/hooks/pages/productPage/useCustomization";
import { useQuantity } from "@/hooks/pages/productPage/useQuantity";
import { useAddToCart } from "@/hooks/pages/productPage/useAddToCart";

import { useAuth } from "@/context/AuthContext";
import { useAuthModal } from "@/context/AuthModalContext";

import MockupProduct from "@/components/MockupProduct";
import ImageEditorModal from "@/components/ImageEditorModal";
import SaveCreationModal from "@/components/SaveCreationModal";

import "@/styles/pages/_product-page.scss";

const PRODUCTS = [
  { slug: "mug", label: "Mug" },
  { slug: "tshirt", label: "T-Shirt" },
  { slug: "pins", label: "Pin's" },
];

export default function ProductPage() {
  const { productType } = useParams();
  const location = useLocation();

  const [product, setProduct] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  const {
    uploadedImage,
    isModalOpen,
    getRootProps,
    getInputProps,
    onApply: onImageApply,
    closeModal,
  } = useImageUpload();

  const {
    customText,
    setCustomText,
    textOptions,
    setTextOptions,
    croppedImageData: customImageData,
    setCroppedImageData,
  } = useCustomization();

  const { quantity, increment, decrement } = useQuantity();
  const { user } = useAuth();
  const { setShowSignup, setPostLoginRedirect } = useAuthModal();
  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);

  const { handleAddToCart } = useAddToCart({
    productType,
    product,
    currentSlide,
    cropZones,
    customization: { customText, textOptions, customImageData },
  });

  useLastVisitedProduct(productType);

  useEffect(() => {
    fetchProductBySlug(productType)
      .then((p) => {
        if (!p) {
          toast.error("Produit introuvable");
          return;
        }
        setProduct(p);
      })
      .catch(() => toast.error("Erreur de chargement du produit"));
  }, [productType]);

  if (!product) {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "60vh",
          fontFamily: "'Cormorant Garamond', serif",
          fontStyle: "italic",
          fontSize: "1.4rem",
          color: "rgba(42,31,26,0.4)",
        }}
      >
        Chargement…
      </div>
    );
  }

  const handleSaveClick = () => {
    if (!customImageData && !customText.trim()) {
      toast.info("Aucune modification détectée.");
      return;
    }
    if (!user) {
      setPostLoginRedirect(window.location.pathname);
      setShowSignup(true);
      return;
    }
    setIsSaveModalOpen(true);
  };

  const handleApplyCroppedImage = (data) => {
    const result = onImageApply(data);
    setCroppedImageData(result);
  };

  return (
    <main
      id="main-content"
      role="main"
      aria-labelledby="product-title"
      className="product-page"
    >
      {/* Hero banner */}
      <h1 id="product-title" className="product-banner">
        Personnalisation du {product.name}
      </h1>

      {/* Prix */}
      <p className="price" aria-label={`Prix: ${product.price}`}>
        Prix unitaire — {product.price} €
      </p>

      {/* Navigation inter-produits */}
      <nav
        role="navigation"
        aria-labelledby="switch-product-title"
        className="product-navigation"
      >
        <h2 id="switch-product-title">Changer de produit</h2>
        <div className="product-switch-links">
          {PRODUCTS.map((p) => (
            <Link
              key={p.slug}
              to={`/product/${p.slug}`}
              className={`product-switch-link${productType === p.slug ? " active" : ""}`}
            >
              {p.label}
            </Link>
          ))}
        </div>
      </nav>

      {/* Grid principal */}
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
            Galerie d'images {product.name}
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
              <SwiperSlide key={idx} aria-roledescription="slide">
                <MockupProduct
                  productImage={img}
                  croppedImageData={customImageData}
                  customText={customText}
                  textOptions={textOptions}
                  cropArea={cropZones[productType]}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </section>

        {/* Aside droite : options + upload */}
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
            <p className="options-title">Personnalisation</p>

            {/* Texte */}
            <fieldset>
              <label htmlFor="customText">Texte personnalisé</label>
              <input
                id="customText"
                type="text"
                placeholder="Entrez votre texte…"
                value={customText}
                onChange={(e) => setCustomText(e.target.value)}
              />
            </fieldset>

            {/* Taille */}
            <fieldset>
              <label htmlFor="fontSizeRange">
                Taille du texte — {textOptions.fontSize}px
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

            {/* Position Y */}
            <fieldset>
              <label htmlFor="positionYRange">
                Position verticale — {Math.round(textOptions.position.y * 100)}%
              </label>
              <input
                id="positionYRange"
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

            {/* Position X */}
            <fieldset>
              <label htmlFor="positionXRange">
                Position horizontale —{" "}
                {Math.round(textOptions.position.x * 100)}%
              </label>
              <input
                id="positionXRange"
                type="range"
                min={0}
                max={1}
                step={0.01}
                value={textOptions.position.x}
                onChange={(e) =>
                  setTextOptions((o) => ({
                    ...o,
                    position: { ...o.position, x: +e.target.value },
                  }))
                }
              />
            </fieldset>

            {/* Police */}
            <fieldset>
              <label htmlFor="fontFamily">Police</label>
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

            {/* Couleur */}
            <fieldset>
              <label htmlFor="fontColor">Couleur du texte</label>
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

          {/* Dropzone */}
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
              onKeyDown={(e) =>
                (e.key === "Enter" || e.key === " ") &&
                getRootProps().onClick(e)
              }
              className="dropzone"
              aria-label="Importer une image pour personnaliser le produit"
            >
              <input {...getInputProps()} />
              <p>Déposez ou cliquez pour importer</p>
            </div>
          </section>
        </aside>
      </section>

      {/* Actions bas de page */}
      <div className="product-actions">
        <button className="generic-button" onClick={handleSaveClick}>
          Enregistrer la création
        </button>

        <section
          role="group"
          aria-label="Choix de la quantité"
          className="quantity-selector"
        >
          <button onClick={decrement} aria-label="Réduire la quantité">
            −
          </button>
          <span aria-live="polite" aria-atomic="true">
            {quantity}
          </span>
          <button onClick={increment} aria-label="Augmenter la quantité">
            +
          </button>
        </section>

        <button
          className="generic-button"
          onClick={() => handleAddToCart(quantity)}
        >
          Ajouter au panier
        </button>

        <Link
          to="/panier"
          style={{
            width: "100%",
            maxWidth: "480px",
            display: "block",
            margin: "0 auto",
          }}
        >
          <button
            className="generic-button"
            aria-label="Accéder au panier"
            style={{ width: "100%" }}
          >
            Accéder au panier
          </button>
        </Link>
      </div>

      {/* Modales */}
      {isModalOpen && (
        <ImageEditorModal
          uploadedImage={uploadedImage}
          onClose={closeModal}
          onApply={handleApplyCroppedImage}
        />
      )}
      {isSaveModalOpen && (
        <SaveCreationModal
          isOpen={isSaveModalOpen}
          onClose={() => setIsSaveModalOpen(false)}
          productType={productType}
          productImages={product.images}
          currentSlide={currentSlide}
          croppedImageData={customImageData}
          customText={customText}
          textOptions={textOptions}
          cropArea={cropZones[productType]}
        />
      )}
    </main>
  );
}
