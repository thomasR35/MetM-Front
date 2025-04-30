// src/pages/SuccessPage.jsx
import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { useCart } from "@/context/CartContext";
import "../../styles/pages/_success.scss";

export default function SuccessPage() {
  const navigate = useNavigate();
  const loc = useLocation();
  const { clearCart } = useCart();
  const params = new URLSearchParams(loc.search);
  const sessionId = params.get("session_id");

  useEffect(() => {
    if (sessionId) {
      clearCart();
      toast.success("🎉 Paiement réussi ! Merci pour votre commande.", {
        position: "top-center",
        autoClose: 5000,
      });
    }
  }, [sessionId]);

  return (
    <main
      id="main-content"
      role="main"
      className="static-page success-page"
      aria-labelledby="success-title"
    >
      <h1 id="success-title">Merci pour votre commande !</h1>
      <p>
        <span aria-label="Identifiant de session Stripe">Session Stripe :</span>{" "}
        <code>{sessionId}</code>
      </p>
      <p>
        Session Stripe : <code>{sessionId}</code>
      </p>
      <button className="generic-button" onClick={() => navigate("/")}>
        Retour à l’accueil
      </button>
    </main>
  );
}
