// src/components/CheckoutForm.jsx
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { useState } from "react";
import axios from "axios";

export default function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);

    // 1) Créez le PaymentIntent côté backend
    const {
      data: { clientSecret },
    } = await axios.post("/api/create-payment-intent", {
      // montant, devise…
    });

    // 2) Confirmez le paiement
    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: { card: elements.getElement(CardElement) },
    });

    if (result.error) {
      setError(result.error.message);
      setProcessing(false);
    } else if (result.paymentIntent.status === "succeeded") {
      // succès → redirection ou message
    }
  };

  return (
    <form onSubmit={handleSubmit} className="checkout-form">
      <CardElement options={{ hidePostalCode: true }} />
      {error && <div role="alert">{error}</div>}
      <button type="submit" disabled={!stripe || processing}>
        {processing ? "Traitement…" : "Payer"}
      </button>
    </form>
  );
}
