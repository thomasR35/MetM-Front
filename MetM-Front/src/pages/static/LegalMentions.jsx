// src/pages/static/LegalMentions.jsx
// ========================

const LegalMentions = () => {
  return (
    <main className="legal-mentions" role="main" aria-labelledby="legal-title">
      <h1 id="legal-title">Mentions légales</h1>

      {/* 1. Éditeur du site */}
      <section aria-labelledby="editor-title">
        <h2 id="editor-title">Éditeur du site</h2>
        <address>
          <p>
            <strong>Sronnok</strong>
            <br />
            Responsable de la publication : Thomas R.
            <br />
            Adresse : 11 impasse de la coulée, 35800 Saint Briac, France
            <br />
            Email :{" "}
            <a href="mailto:marcelleetmaurice35@gmail.com">
              marcelleetmaurice35@gmail.com
            </a>
          </p>
        </address>
      </section>

      {/* 2. Propriétaire et URLs */}
      <section aria-labelledby="owner-title">
        <h2 id="owner-title">Propriétaire du site</h2>
        <p>
          <strong>Marcelle &amp; Maurice Shop</strong>
          <br />
          Back-end (API) :{" "}
          <a href="https://mauriceetmarcelle.go.yj.fr">
            https://mauriceetmarcelle.go.yj.fr
          </a>
          <br />
          Front-end (SPA React) :{" "}
          <a href="https://thomasR35.github.io/MetM-Front/">
            https://thomasR35.github.io/MetM-Front/
          </a>
        </p>
      </section>

      {/* 3. Hébergement */}
      <section aria-labelledby="hosting-title">
        <h2 id="hosting-title">Hébergement</h2>

        <h3>Back-end</h3>
        <address>
          <p>
            Hébergeur : PlanetHoster (World Lite)
            <br />
            Adresse : 47 avenue d’Innsbruck, 13127 Vilnius, Lituanie
            <br />
            Support technique :{" "}
            <a href="mailto:support@planethoster.com">
              support@planethoster.com
            </a>
          </p>
        </address>

        <h3>Front-end</h3>
        <address>
          <p>
            Hébergeur : GitHub Pages
            <br />
            URL :{" "}
            <a href="https://thomasR35.github.io/MetM-Front/">
              https://thomasR35.github.io/MetM-Front/
            </a>
          </p>
        </address>
      </section>

      {/* 4. Propriété intellectuelle */}
      <section aria-labelledby="ip-title">
        <h2 id="ip-title">Propriété intellectuelle</h2>
        <p>
          L’ensemble des contenus (textes, images, logos, icônes, code source,
          etc.) du site Marcelle &amp; Maurice Shop est protégé par les lois
          françaises et internationales sur la propriété intellectuelle. Toute
          reproduction, distribution, modification, adaptation ou utilisation
          sans autorisation écrite préalable est interdite.
        </p>
      </section>

      {/* 5. Protection des données personnelles */}
      <section aria-labelledby="dataprotection-title">
        <h2 id="dataprotection-title">Protection des données personnelles</h2>
        <p>
          Conformément au RGPD, vous disposez d’un droit d’accès, de
          rectification, de portabilité et de suppression de vos données
          personnelles. Pour exercer ces droits, contactez-nous à :{" "}
          <a href="marcelleetmaurice35@gmail.com">
            marcelleetmaurice35@gmail.com
          </a>
          .
        </p>
        <p>
          Vos données sont hébergées sur les serveurs sécurisés de PlanetHoster.
        </p>
      </section>

      {/* 6. Cookies */}
      <section aria-labelledby="cookies-title">
        <h2 id="cookies-title">Cookies</h2>
        <p>
          Ce site utilise des cookies techniques nécessaires au fonctionnement
          de l’authentification et du panier. Aucuns cookies analytiques ou
          marketing ne sont déposés sans votre consentement. Vous pouvez gérer
          vos préférences à tout moment via le bouton « Gérer mes cookies » en
          bas de page.
        </p>
      </section>
    </main>
  );
};

export default LegalMentions;
