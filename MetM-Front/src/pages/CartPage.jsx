import React, { useEffect } from "react";
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

  if (cartItems.length === 0) {
    return (
      <main className="cart-page">
        <h1>Votre panier est vide.</h1>
        <Link
          to={`/product/${localStorage.getItem("lastProduct") || "mug"}`}
          className="form-button"
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
    <main className="cart-page">
      <h1>Votre panier</h1>

      <section className="cart-items">
        {cartItems.map((item, idx) => {
          const key = `${item.product.id}__${
            item.customImage?.dataUrl || "std"
          }__${idx}`;

          return (
            <article key={key} className="cart-item">
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
                <h2>{item.product.name}</h2>
                <p>{item.product.price.toFixed(2)} €</p>

                <div className="quantity-control">
                  <button
                    onClick={() => {
                      if (item.quantity > 1) {
                        updateQuantity(
                          item.product.id,
                          item.customImage?.dataUrl,
                          item.quantity - 1
                        );
                      } else {
                        const ok = window.confirm(
                          "Êtes-vous sûr·e de vouloir supprimer cet article du panier ?"
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
                  <span>{item.quantity}</span>
                  <button
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
                  className="form-button"
                  onClick={() => {
                    const ok = window.confirm(
                      "Êtes-vous sûr·e de vouloir supprimer cet article du panier ?"
                    );
                    if (!ok) return;
                    removeFromCart(item.product.id, item.customImage?.dataUrl);
                  }}
                >
                  Supprimer
                </button>
              </div>
            </article>
          );
        })}
      </section>

      <div className="cart-total">
        <h2>Total : {total.toFixed(2)} €</h2>

        <button className="form-button" onClick={handleCheckoutClick}>
          Procéder au paiement
        </button>

        <button
          className="form-button"
          onClick={() =>
            navigate(`/product/${localStorage.getItem("lastProduct") || "mug"}`)
          }
        >
          Retour au produit
        </button>

        {!isAuthenticated && (
          <p className="checkout-hint">
            🔒 Connectez-vous pour finaliser votre commande.
          </p>
        )}
      </div>
    </main>
  );
};

export default CartPage;
