// src/pages/static/Terms.jsx
// ========================
import "../../styles/pages/_terms.scss";

export default function Terms() {
  return (
    <main
      id="main-content"
      role="main"
      className="static-page terms-page"
      aria-labelledby="terms-title"
    >
      <h1 id="terms-title">Conditions Générales de Vente</h1>

      <section aria-labelledby="terms-objet">
        <h2 id="terms-objet">1. Objet</h2>
        <p>
          Les présentes conditions générales de vente (CGV) régissent la
          relation entre le client et la société Marcelle et Maurice Shop,
          ci-après « le Vendeur », dans le cadre de la vente de produits
          personnalisés en ligne.
        </p>
      </section>

      <section aria-labelledby="terms-produits">
        <h2 id="terms-produits">2. Produits</h2>
        <p>
          Le Vendeur propose des mugs, tee-shirts et autres objets personnalisés
          selon les visuels fournis par l’utilisateur. Les caractéristiques
          détaillées sont présentées sur chaque fiche produit.
        </p>
      </section>

      <section aria-labelledby="terms-prix">
        <h2 id="terms-prix">3. Prix et paiement</h2>
        <p>
          Les prix sont indiqués en euros, toutes taxes comprises. Le paiement
          s’effectue via Stripe Checkout (sécurisé, PCI-DSS), au moment de la
          commande.
        </p>
      </section>

      <section aria-labelledby="terms-livraison">
        <h2 id="terms-livraison">4. Livraison</h2>
        <p>
          Les frais et délais de livraison sont précisés lors du passage de
          commande. Le Vendeur fait ses meilleurs efforts pour respecter les
          délais annoncés.
        </p>
      </section>

      <section aria-labelledby="terms-retractation">
        <h2 id="terms-retractation">5. Droit de rétractation</h2>
        <p>
          Conformément à la loi, vous disposez d’un délai de 14 jours pour
          exercer votre droit de rétractation sans justification.
        </p>
      </section>

      <section aria-labelledby="terms-responsabilite">
        <h2 id="terms-responsabilite">6. Responsabilité</h2>
        <p>
          Le Vendeur n’est pas responsable des dommages indirects liés à l’usage
          des produits vendus. En cas de produit défectueux, se reporter à la
          procédure de retour.
        </p>
      </section>
    </main>
  );
}
