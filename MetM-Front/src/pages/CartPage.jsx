// src/pages/CartPage.jsx
// ========================
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/hooks/useAuth";
import { useAuthModal } from "@/context/AuthModalContext";
import MockupProduct from "@/components/MockupProduct";

const CartPage = () => {
  const { cartItems, removeFromCart, updateQuantity, total } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { setShowSignup, setPostLoginRedirect } = useAuthModal();

  // Si panier vide
  if (cartItems.length === 0) {
    return (
      <main
        id="main-content"
        role="main"
        className="cart-page"
        aria-labelledby="empty-cart-title"
      >
        <h1 id="empty-cart-title">Votre panier est vide</h1>
        <Link
          to={`/product/${localStorage.getItem("lastProduct") || "mug"}`}
          className="generic-button"
        >
          Retour au produit
        </Link>
      </main>
    );
  }

  const handleCheckoutClick = () => {
    if (isAuthenticated) {
      navigate("/checkout");
    } else {
      setPostLoginRedirect("/checkout");
      setShowSignup(true);
    }
  };

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
                    customText={""}
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
                      onClick={() => {
                        if (item.quantity > 1) {
                          updateQuantity(
                            item.product.id,
                            item.customImage?.dataUrl,
                            item.quantity - 1
                          );
                        } else {
                          const ok = window.confirm(
                            `Supprimer ${item.product.name} du panier ?`
                          );
                          if (!ok) return;
                          removeFromCart(
                            item.product.id,
                            item.customImage?.dataUrl
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
                          item.customImage?.dataUrl,
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
                    onClick={() => {
                      const ok = window.confirm(
                        `Supprimer ${item.product.name} du panier ?`
                      );
                      if (!ok) return;
                      removeFromCart(
                        item.product.id,
                        item.customImage?.dataUrl
                      );
                    }}
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

        <button
          className="generic-button"
          onClick={() =>
            navigate(`/product/${localStorage.getItem("lastProduct") || "mug"}`)
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
  );
};

export default CartPage;
