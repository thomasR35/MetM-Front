// src/pages/ProductPage.jsx
// ========================
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { toast } from "react-toastify";
import "@/styles/utils/_toastOverrides.scss";

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

export default function ProductPage() {
  const { productType } = useParams();

  // ─── Hooks appelés en-tête ─────────────────────────────────────────
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

  // Préparer la fonction d'ajout au panier
  const { handleAddToCart } = useAddToCart({
    productType,
    product,
    currentSlide,
    cropZones,
    customization: { customText, textOptions, customImageData },
  });
  // Mémoriser le dernier produit visité
  useLastVisitedProduct(productType);

  // Charger le produit depuis l’API
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

  // Tant que le produit n'est pas chargé, on affiche un loader
  if (!product) {
    return <p>Chargement…</p>;
  }

  // Handlers
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
  const closeSaveModal = () => setIsSaveModalOpen(false);
  const handleApplyCroppedImage = (data) => {
    const result = onImageApply(data);
    setCroppedImageData(result);
  };

  // ─── JSX principal ─────────────────────────────────────────────────────
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

      <p className="price" aria-label={`Prix: ${product.price}`}>
        Prix Unitaire: {product.price}€
      </p>

      {/* Navigation produit */}
      <nav
        role="navigation"
        aria-labelledby="switch-product-title"
        className="product-navigation"
      >
        <h2 id="switch-product-title">Changer de produit</h2>
        <div className="product-switch-links">
          <Link to="/product/mug" className="product-switch-link">
            Mug
          </Link>
          <Link to="/product/tshirt" className="product-switch-link">
            T-Shirt
          </Link>
          <Link to="/product/pins" className="product-switch-link">
            Pin’s
          </Link>
        </div>
      </nav>

      {/* Slider + Aperçu */}
      <section
        className="product-sections"
        role="region"
        aria-labelledby="customization-section"
      >
        <h2 id="customization-section" className="sr-only">
          Personnalisation et aperçu
        </h2>
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
            {/* Texte */}
            <fieldset>
              <label htmlFor="customText">Texte personnalisé:</label>
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
                Taille du texte: {textOptions.fontSize}px
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
              <label htmlFor="positionRange">
                Position verticale du texte:{" "}
                {Math.round(textOptions.position.y * 100)}%
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

            {/* Position X */}
            <fieldset>
              <label htmlFor="positionRange">
                Position horizontale du texte:{" "}
                {Math.round(textOptions.position.x * 100)}%
              </label>
              <input
                id="positionRange"
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

            {/* Couleur */}
            <fieldset>
              <label htmlFor="fontColor">Couleur du texte :</label>
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
        </aside>

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
              (e.key === "Enter" || e.key === " ") && getRootProps().onClick(e)
            }
            className="dropzone"
            aria-label="Importer une image pour personnaliser le produit"
          >
            <input {...getInputProps()} />
            <p>Déposez votre image ou cliquez pour importer</p>
          </div>
        </section>
      </section>

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
          onClose={closeSaveModal}
          productType={productType}
          productImages={product.images}
          currentSlide={currentSlide}
          croppedImageData={customImageData}
          customText={customText}
          textOptions={textOptions}
          cropArea={cropZones[productType]}
        />
      )}

      <button className="generic-button" onClick={handleSaveClick}>
        Enregistrer la création
      </button>
      {/* Sélecteur de quantité */}
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

      {/* Actions */}
      <button
        className="generic-button"
        onClick={() => handleAddToCart(quantity)}
      >
        Ajouter au panier
      </button>

      {/* Lien vers le panier */}
      <Link to="/panier">
        <button className="generic-button" aria-label="Accéder au panier">
          Accéder au panier
        </button>
      </Link>
    </main>
  );
}
