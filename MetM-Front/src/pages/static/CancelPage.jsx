import { useNavigate } from "react-router-dom";

export default function CancelPage() {
  const navigate = useNavigate();
  return (
    <main
      id="main-content"
      role="main"
      className="static-page cancel-page"
      aria-labelledby="cancel-title"
    >
      <h1 id="cancel-title">Paiement annulé</h1>
      <p>Votre paiement n’a pas été confirmé.</p>
      <button className="generic-button" onClick={() => navigate("/cart")}>
        Retour au panier
      </button>
    </main>
  );
}
