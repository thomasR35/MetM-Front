// src/pages/CartPage.jsx
//=====================================
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { useAuthModal } from "@/context/AuthModalContext";
import MockupProduct from "@/components/MockupProduct";
import { useConfirm } from "@/hooks/components/confirmDialog/useConfirm.jsx";
import "@/styles/pages/_cartpage.scss";

export default function CartPage() {
  const { cartItems, updateQuantity, removeFromCart, total } = useCart();
  const { isAuthenticated } = useAuth();
  const { setShowSignup, setPostLoginRedirect } = useAuthModal();
  const navigate = useNavigate();

  // hook de confirmation
  const { confirm, ConfirmUI } = useConfirm();

  // panier vide
  if (cartItems.length === 0) {
    const last = localStorage.getItem("lastProduct") || "mug";
    return (
      <main id="main-content" role="main" className="cart-page">
        <h1>Votre panier est vide</h1>
        <Link to={`/product/${last}`} className="generic-button">
          Retour au produit
        </Link>
      </main>
    );
  }

  // checkout
  const handleCheckoutClick = () => {
    if (isAuthenticated) {
      navigate("/checkout");
    } else {
      setPostLoginRedirect("/checkout");
      setShowSignup(true);
    }
  };

  // confirmation + suppression
  const askDelete = async (productId, dataUrl, label) => {
    try {
      await confirm({
        title: `Supprimer « ${label} » ?`,
        message: "Cette action est irréversible.",
        confirmLabel: "Oui, supprimer",
        cancelLabel: "Annuler",
      });
      removeFromCart(productId, dataUrl);
    } catch {
      // annulation => rien à faire
    }
  };

  return (
    <>
      <main
        id="main-content"
        role="main"
        className="cart-page"
        aria-labelledby="cart-title"
      >
        <h1 id="cart-title">Votre panier</h1>

        <section
          className="cart-items"
          aria-label="Liste des articles dans le panier"
        >
          <ul>
            {cartItems.map((item, idx) => {
              const itemId = `cart-item-${idx}`;
              const custom = item.customImage ?? null;
              const src = custom?.dataUrl ?? item.product.image;

              return (
                <li
                  key={itemId}
                  id={itemId}
                  role="group"
                  aria-labelledby={`${itemId}-title`}
                  className="cart-item"
                >
                  <div className="cart-mockup">
                    {custom ? (
                      <img
                        src={src}
                        alt={`Création personnalisée sur ${item.product.name}`}
                        className="image-thumbnail"
                      />
                    ) : (
                      <MockupProduct
                        productImage={item.product.image}
                        croppedImageData={null}
                        customText=""
                        textOptions={{
                          fontFamily: "sans-serif",
                          fontSize: 24,
                          color: "#000000",
                          position: { x: 0.5, y: 0.8 },
                        }}
                        cropArea={{ width: 0, height: 0 }}
                      />
                    )}
                  </div>

                  <div className="cart-info">
                    <h2 id={`${itemId}-title`}>{item.product.name}</h2>
                    <p
                      aria-label={`Prix unitaire : ${item.product.price.toFixed(
                        2
                      )} €`}
                    >
                      {item.product.price.toFixed(2)} €
                    </p>

                    <div
                      className="quantity-control"
                      role="group"
                      aria-label={`Quantité pour ${item.product.name}`}
                    >
                      <button
                        aria-label={`Réduire la quantité de ${item.product.name}`}
                        onClick={() => {
                          if (item.quantity > 1) {
                            updateQuantity(
                              item.product.id,
                              custom?.dataUrl ?? null,
                              item.quantity - 1
                            );
                          } else {
                            askDelete(
                              item.product.id,
                              custom?.dataUrl ?? null,
                              item.product.name
                            );
                          }
                        }}
                      >
                        −
                      </button>
                      <span aria-live="polite" aria-atomic="true">
                        {item.quantity}
                      </span>
                      <button
                        aria-label={`Augmenter la quantité de ${item.product.name}`}
                        onClick={() =>
                          updateQuantity(
                            item.product.id,
                            custom?.dataUrl ?? null,
                            item.quantity + 1
                          )
                        }
                      >
                        +
                      </button>
                    </div>

                    <button
                      className="generic-button"
                      aria-label={`Supprimer ${item.product.name} du panier`}
                      onClick={() =>
                        askDelete(
                          item.product.id,
                          custom?.dataUrl ?? null,
                          item.product.name
                        )
                      }
                    >
                      Supprimer
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        </section>

        <section
          className="cart-total"
          aria-labelledby="cart-total-title"
          role="region"
        >
          <h2 id="cart-total-title">Total : {total.toFixed(2)} €</h2>

          <button
            className="generic-button"
            onClick={handleCheckoutClick}
            disabled={!cartItems.length}
          >
            Procéder au paiement
          </button>

          <button
            className="generic-button"
            onClick={() =>
              navigate(
                `/product/${localStorage.getItem("lastProduct") || "mug"}`
              )
            }
          >
            Retour au produit
          </button>

          {!isAuthenticated && (
            <p className="checkout-hint" role="alert">
              🔒 Connectez-vous pour finaliser votre commande.
            </p>
          )}
        </section>
      </main>

      <ConfirmUI />
    </>
  );
}
