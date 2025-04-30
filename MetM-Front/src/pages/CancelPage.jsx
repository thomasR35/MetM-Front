import { useNavigate } from "react-router-dom";

export default function CancelPage() {
  const navigate = useNavigate();
  return (
    <main className="cancel-page">
      <h1>Paiement annulé</h1>
      <p>Votre paiement n’a pas été confirmé.</p>
      <button className="generic-button" onClick={() => navigate("/cart")}>
        Retour au panier
      </button>
    </main>
  );
}
