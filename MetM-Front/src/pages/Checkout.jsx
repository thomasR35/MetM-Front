import { useCart } from "@/context/CartContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
import { sendOrder } from "@/api/orders";
import { useAuth } from "@/hooks/useAuth";
import "../styles/pages/_checkout.scss";

const Checkout = () => {
  const { cartItems, total, clearCart } = useCart();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      user_id: user?.id || null,
      customer: formData,
      items: cartItems,
      total,
    };

    try {
      const result = await sendOrder(payload);
      toast.success(result.message || "Commande validée 🎉");
      clearCart();
      navigate("/");
    } catch (error) {
      toast.error(error.message || "Erreur lors de la commande.");
    }
  };

  if (cartItems.length === 0) {
    return (
      <main className="checkout-page">
        <h1>Panier vide</h1>
      </main>
    );
  }

  return (
    <main className="checkout-page">
      <h1>Finaliser la commande</h1>

      <ul className="checkout-list">
        {cartItems.map((item) => (
          <li key={item.product.id}>
            {item.quantity} × {item.product.name} —{" "}
            {(item.product.price * item.quantity).toFixed(2)} €
          </li>
        ))}
      </ul>

      <h2>Total : {total.toFixed(2)} €</h2>

      <form className="checkout-form" onSubmit={handleSubmit}>
        <label>Nom</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          required
          onChange={handleChange}
        />

        <label>Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          required
          onChange={handleChange}
        />

        <label>Adresse</label>
        <textarea
          name="address"
          value={formData.address}
          required
          onChange={handleChange}
        />

        <button type="submit" className="form-button">
          Valider la commande
        </button>
      </form>
    </main>
  );
};

export default Checkout;
