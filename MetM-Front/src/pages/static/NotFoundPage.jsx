import React from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/pages/_notfound.scss";

export default function NotFoundPage() {
  const navigate = useNavigate();
  return (
    <main
      id="main-content"
      role="main"
      className="notfound-page"
      aria-labelledby="notfound-title"
    >
      <h1 id="notfound-title">404</h1>
      <p>Oups… la page que vous recherchez n'existe pas.</p>
      <button onClick={() => navigate("/")}>Retour à l’accueil</button>
    </main>
  );
}
