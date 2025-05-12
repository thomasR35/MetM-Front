// src/pages/static/SuccessPage.jsx
// ========================
import React from "react";
import { useNavigate } from "react-router-dom";
import { usePaymentSuccess } from "@/hooks/successPage/usePaymentSuccess";
import "../../styles/pages/_success.scss";

export default function SuccessPage() {
  const navigate = useNavigate();
  const sessionId = usePaymentSuccess();

  return (
    <main
      id="main-content"
      role="main"
      className="static-page success-page"
      aria-labelledby="success-title"
    >
      <h1 id="success-title">Merci pour votre commande !</h1>

      {sessionId && (
        <p>
          <span aria-label="Identifiant de session Stripe">
            Session Stripe :
          </span>{" "}
          <code>{sessionId}</code>
        </p>
      )}

      <button className="generic-button" onClick={() => navigate("/")}>
        Retour à l’accueil
      </button>
    </main>
  );
}
