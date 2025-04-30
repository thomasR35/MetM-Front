// src/pages/Checkout.jsx
import React, { useState } from "react";
import { useCart } from "@/context/CartContext";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import CheckoutButton from "@/components/CheckoutButton";
import "../styles/pages/_checkout.scss";

export default function CheckoutPage() {
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

  // Note : ici on ne soumet pas la form classique, le paiement se fait via Stripe
  if (cartItems.length === 0) {
    return (
      <main
        id="main-content"
        role="main"
        aria-labelledby="empty-cart-title"
        className="checkout-page"
      >
        <h1 id="empty-cart-title">Panier vide</h1>
        <button
          className="generic-button"
          onClick={() => navigate("/product/mug")}
        >
          Retour au produit
        </button>
      </main>
    );
  }

  return (
    <main
      id="main-content"
      role="main"
      aria-labelledby="checkout-title"
      className="checkout-page"
    >
      <h1 id="checkout-title">Finaliser la commande</h1>

      {/* Récapitulatif */}
      <section
        role="region"
        aria-labelledby="items-list-title"
        className="checkout-summary"
      >
        <h2 id="items-list-title" className="sr-only">
          Récapitulatif des articles
        </h2>
        <ul className="checkout-list">
          {cartItems.map((item, i) => (
            <li
              key={i}
              role="group"
              aria-label={`${item.quantity} × ${item.product.name}, ${(
                item.product.price * item.quantity
              ).toFixed(2)} euros`}
            >
              {item.quantity} × {item.product.name} —{" "}
              {(item.product.price * item.quantity).toFixed(2)} €
            </li>
          ))}
        </ul>
      </section>

      {/* Total */}
      <div
        role="region"
        aria-labelledby="total-label"
        className="checkout-total"
      >
        <h2 id="total-label">Total : {total.toFixed(2)} €</h2>
      </div>

      {/* Formulaire d’adresse */}
      <form className="checkout-form" aria-labelledby="form-title" noValidate>
        <h2 id="form-title" className="sr-only">
          Vos coordonnées
        </h2>

        <fieldset>
          <legend>Coordonnées</legend>

          <div className="form-group">
            <label htmlFor="checkout-name">Nom et prénom</label>
            <input
              id="checkout-name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="checkout-email">Email</label>
            <input
              id="checkout-email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="checkout-address">Adresse de livraison</label>
            <textarea
              id="checkout-address"
              name="address"
              rows={4}
              value={formData.address}
              onChange={handleChange}
              required
            />
          </div>
        </fieldset>
      </form>

      {/* Bouton Stripe */}
      <section
        role="region"
        aria-labelledby="payment-section-title"
        className="payment-section"
      >
        <h2 id="payment-section-title" className="sr-only">
          Paiement
        </h2>
        <CheckoutButton
          aria-label={`Payer ${total.toFixed(2)} euros via Stripe`}
          className="checkout-button"
          items={cartItems}
          total={total}
        />
      </section>

      {/* Info légales */}
      <section
        className="checkout-info"
        role="note"
        aria-labelledby="terms-title"
      >
        <p id="terms-title">
          En validant, vous acceptez nos{" "}
          <a href="/terms" target="_blank" rel="noopener noreferrer">
            Conditions Générales de Vente
          </a>
          .
        </p>
        <p>
          Vos données sont traitées selon notre{" "}
          <a href="/privacy" target="_blank" rel="noopener noreferrer">
            Politique de confidentialité
          </a>
          .
        </p>
      </section>
    </main>
  );
}
