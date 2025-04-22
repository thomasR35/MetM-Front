import { useCart } from "@/context/CartContext";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useEffect } from "react";

const CartPage = ({ setShowSignup, setPostLoginRedirect }) => {
  const { cartItems, removeFromCart, updateQuantity, total } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (cartItems.length === 0) {
    return (
      <main className="cart-page">
        <h1>Votre panier est vide.</h1>
        <Link
          className="cart-back-btn"
          to={`/product/${localStorage.getItem("lastProduct") || "mug"}`}
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
        {cartItems.map((item) => (
          <article key={item.product.id} className="cart-item">
            <img src={item.product.image} alt={item.product.name} width="100" />
            <div className="cart-info">
              <h2>{item.product.name}</h2>
              <p>{item.product.price.toFixed(2)} €</p>
              <input
                type="number"
                min="1"
                value={item.quantity}
                onChange={(e) =>
                  updateQuantity(item.product.id, parseInt(e.target.value, 10))
                }
              />
              <article className="quantity-control">
                <button
                  className="minus"
                  onClick={() => {
                    if (item.quantity === 1) {
                      const confirmDelete = window.confirm(
                        "Êtes-vous sûr de vouloir supprimer cet article du panier ?"
                      );
                      if (confirmDelete) {
                        removeFromCart(item.product.id);
                      }
                    } else {
                      updateQuantity(item.product.id, item.quantity - 1);
                    }
                  }}
                >
                  −
                </button>

                <span>{item.quantity}</span>
                <button
                  className="plus"
                  onClick={() =>
                    updateQuantity(item.product.id, item.quantity + 1)
                  }
                >
                  +
                </button>
              </article>

              <button
                className="form-button"
                onClick={() => removeFromCart(item.product.id)}
              >
                Supprimer
              </button>
            </div>
          </article>
        ))}
      </section>

      <div className="cart-total">
        <h2>Total : {total.toFixed(2)} €</h2>
        <button className="form-button" onClick={handleCheckoutClick}>
          Procéder au paiement
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
