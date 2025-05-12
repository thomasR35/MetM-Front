// src/pages/ProductPage.jsx
import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import {
  productData,
  cropZones,
} from "@/services/productService/productService";
import { useLastVisitedProduct } from "@/hooks/useLastVisitedProduct";
import { useImageUpload } from "@/hooks/useImageUpload";
import { useCustomization } from "@/hooks/useCustomization";
import { useQuantity } from "@/hooks/useQuantity";
import { useAddToCart } from "@/hooks/useAddToCart";
import { useSaveCreation } from "@/hooks/useSaveCreation";
import { toast } from "react-toastify";

import MockupProduct from "@/components/MockupProduct";
import ImageEditorModal from "@/components/ImageEditorModal";
import SaveCreationModal from "@/components/SaveCreationModal";

export default function ProductPage() {
  const { productType } = useParams();
  const product = productData[productType] || productData.mug;

  // Garder en mémoire le dernier produit visité
  useLastVisitedProduct(productType);

  // État pour le slide actif
  const [currentSlide, setCurrentSlide] = useState(0);

  // Gestion du drag & drop et de la modale d'édition
  const {
    uploadedImage,
    isModalOpen,
    getRootProps,
    getInputProps,
    onApply: onImageApply,
    closeModal,
  } = useImageUpload();

  // États de personnalisation (texte, options, image recadrée)
  const {
    customText,
    setCustomText,
    textOptions,
    setTextOptions,
    croppedImageData,
    setCroppedImageData,
  } = useCustomization();

  // Quantité
  const { quantity, increment, decrement } = useQuantity();

  // Ajout au panier
  const { handleAddToCart } = useAddToCart({
    productType,
    product,
    currentSlide,
    cropZones,
    customization: { customText, textOptions, croppedImageData },
  });

  // Sauvegarde de la création
  const { handleSaveClick, isSaveModalOpen, closeSaveModal } =
    useSaveCreation();

  // Wrapper pour la sauvegarde (toast si aucune modif)
  const handleSave = () => {
    const hasModification = !!croppedImageData || !!customText.trim();
    const ok = handleSaveClick({ hasModification });
    if (!ok) {
      toast.info("Aucune modification détectée.");
    }
  };

  // Appliquer l'image recadrée
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
      <h1 id="product-title" className="product-banner">
        Personnalisation du {product.name}
      </h1>

      <p className="price" aria-label={`Prix : ${product.price.toFixed(2)}€`}>
        Prix : {product.price.toFixed(2)}€
      </p>

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
              aria-label="Importer une image pour personnaliser le produit"
              className="dropzone"
            >
              <input {...getInputProps()} />
              <p>Déposez votre image ou cliquez pour importer</p>
            </div>
          </section>
        </aside>
      </section>

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
          croppedImageData={croppedImageData}
          customText={customText}
          textOptions={textOptions}
          cropArea={cropZones[productType][currentSlide]}
        />
      )}

      <section
        role="group"
        aria-label="Choix de la quantité"
        className="quantity-selector"
      >
        <button
          onClick={decrement}
          aria-label={`Réduire la quantité (actuellement ${quantity})`}
        >
          −
        </button>
        <span aria-live="polite" aria-atomic="true">
          {quantity}
        </span>
        <button
          onClick={increment}
          aria-label={`Augmenter la quantité (actuellement ${quantity})`}
        >
          +
        </button>
      </section>

      <button
        className="generic-button"
        onClick={() => handleAddToCart(quantity)}
        aria-label={`Ajouter ${quantity} ${product.name} au panier`}
      >
        Ajouter au panier
      </button>

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

      <Link to="/panier">
        <button className="generic-button" aria-label="Accéder au panier">
          Accéder au panier
        </button>
      </Link>

      <button
        className="generic-button"
        onClick={handleSave}
        aria-label="Enregistrer la création"
      >
        Enregistrer la création
      </button>
    </main>
  );
}
