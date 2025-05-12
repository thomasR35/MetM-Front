// src/pages/CartPage.jsx
//=====================================
import React from "react";
import { Link } from "react-router-dom";
import MockupProduct from "@/components/MockupProduct";
import { useCart } from "@/context/CartContext";
import { useLastProduct } from "@/hooks/cartPage/useLastProduct";
import { useCartOperations } from "@/hooks/cartPage/useCartOperations";
import { useCheckoutNavigation } from "@/hooks/cartPage/useCheckoutNavigation";

import "../styles/pages/_cartpage.scss";

export default function CartPage() {
  const { cartItems, total } = useCart();
  const lastProduct = useLastProduct();
  const { handleDecrement, handleIncrement, handleRemove } =
    useCartOperations();
  const { isAuthenticated, handleCheckoutClick } = useCheckoutNavigation();

  // Panier vide
  if (cartItems.length === 0) {
    return (
      <main
        id="main-content"
        role="main"
        className="cart-page"
        aria-labelledby="empty-cart-title"
      >
        <h1 id="empty-cart-title">Votre panier est vide</h1>
        <Link to={`/product/${lastProduct}`} className="generic-button">
          Retour au produit
        </Link>
      </main>
    );
  }

  return (
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
            return (
              <li
                key={itemId}
                id={itemId}
                role="group"
                aria-labelledby={`${itemId}-title`}
                className="cart-item"
              >
                <div className="cart-mockup">
                  <MockupProduct
                    productImage={item.product.image}
                    croppedImageData={item.customImage}
                    customText=""
                    cropArea={{
                      width: item.customImage?.width || 0,
                      height: item.customImage?.height || 0,
                    }}
                  />
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
                      onClick={() => handleDecrement(item)}
                    >
                      −
                    </button>
                    <span aria-live="polite" aria-atomic="true">
                      {item.quantity}
                    </span>
                    <button
                      aria-label={`Augmenter la quantité de ${item.product.name}`}
                      onClick={() => handleIncrement(item)}
                    >
                      +
                    </button>
                  </div>

                  <button
                    className="generic-button"
                    aria-label={`Supprimer ${item.product.name} du panier`}
                    onClick={() => handleRemove(item)}
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
          aria-disabled={!cartItems.length}
        >
          Procéder au paiement
        </button>

        <Link to={`/product/${lastProduct}`} className="generic-button">
          Retour au produit
        </Link>

        {!isAuthenticated && (
          <p className="checkout-hint" role="alert">
            🔒 Connectez-vous pour finaliser votre commande.
          </p>
        )}
      </section>
    </main>
  );
}
