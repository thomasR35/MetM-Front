// src/pages/static/Privacy.jsx
// ========================
import "../../styles/pages/_privacy.scss";

export default function Privacy() {
  return (
    <main
      id="main-content"
      role="main"
      className="static-page privacy-page"
      aria-labelledby="privacy-title"
    >
      <h1 id="privacy-title">Politique de Confidentialité</h1>

      <section aria-labelledby="privacy-collecte">
        <h2 id="privacy-collecte">1. Collecte des données</h2>
        <p>
          Nous recueillons les informations que vous nous fournissez lors de
          votre inscription, de vos commandes ou de vos échanges avec notre
          service client.
        </p>
      </section>

      <section aria-labelledby="privacy-utilisation">
        <h2 id="privacy-utilisation">2. Utilisation des données</h2>
        <p>
          Vos données sont utilisées pour traiter vos commandes, gérer votre
          compte, vous informer des offres et assurer la relation client.
        </p>
      </section>

      <section aria-labelledby="privacy-partage">
        <h2 id="privacy-partage">3. Partage et sécurité</h2>
        <p>
          Nous ne partageons pas vos données personnelles avec des tiers à des
          fins commerciales. Elles sont hébergées sur des serveurs sécurisés.
        </p>
      </section>

      <section aria-labelledby="privacy-droits">
        <h2 id="privacy-droits">4. Droits</h2>
        <p>
          Conformément au RGPD, vous disposez d’un droit d’accès, de
          rectification, d’effacement et de portabilité de vos données. Pour
          exercer ces droits, contactez-nous à{" "}
          <a href="mailto:contact@marcelle-et-maurice.shop">
            contact@marcelle-et-maurice.shop
          </a>
          .
        </p>
      </section>

      <section aria-labelledby="privacy-cookies">
        <h2 id="privacy-cookies">5. Cookies</h2>
        <p>
          Notre site utilise des cookies nécessaires à son fonctionnement et des
          cookies analytiques (Google Analytics). Vous pouvez gérer vos
          préférences via la bannière cookies.
        </p>
      </section>
    </main>
  );
}
