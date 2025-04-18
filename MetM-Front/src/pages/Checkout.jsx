import { useCart } from "@/context/CartContext";
import { Link, useNavigate } from "react-router-dom";

const Checkout = () => {
  const { cartItems, total, clearCart } = useCart();
  const navigate = useNavigate();

  const handlePayment = () => {
    const confirmed = window.confirm("Voulez-vous confirmer votre commande ?");
    if (confirmed) {
      clearCart();
      alert("🎉 Paiement confirmé ! Merci pour votre commande.");
      navigate("/");
    }
  };

  if (cartItems.length === 0) {
    return (
      <main className="checkout-page">
        <h1>Panier vide</h1>
        <Link to="/">Retour à la boutique</Link>
      </main>
    );
  }

  return (
    <main className="checkout-page">
      <h1>Récapitulatif de la commande</h1>

      <ul className="checkout-list">
        {cartItems.map((item) => (
          <li key={item.product.id}>
            {item.quantity} × {item.product.name} —{" "}
            {(item.product.price * item.quantity).toFixed(2)} €
          </li>
        ))}
      </ul>

      <h2>Total à régler : {total.toFixed(2)} €</h2>

      <button className="form-button" onClick={handlePayment}>
        Payer maintenant
      </button>
    </main>
  );
};

export default Checkout;
