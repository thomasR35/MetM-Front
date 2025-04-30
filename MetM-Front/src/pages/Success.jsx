// src/pages/SuccessPage.jsx
import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";

export default function SuccessPage() {
  const navigate = useNavigate();
  const loc = useLocation();
  const params = new URLSearchParams(loc.search);
  const sessionId = params.get("session_id");

  useEffect(() => {
    if (sessionId) {
      toast.success("🎉 Paiement réussi ! Merci pour votre commande.", {
        position: "top-center",
        autoClose: 5000,
      });
    }
  }, [sessionId]);

  return (
    <main className="success-page">
      <h1>Merci pour votre commande !</h1>
      <p>Votre paiement a bien été pris en compte.</p>
      <p>
        Session Stripe : <code>{sessionId}</code>
      </p>
      <button className="generic-button" onClick={() => navigate("/")}>
        Retour à l’accueil
      </button>
    </main>
  );
}
