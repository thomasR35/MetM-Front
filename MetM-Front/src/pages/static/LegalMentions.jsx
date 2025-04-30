import React from "react";

const LegalMentions = () => {
  return (
    <main className="legal-mentions" role="main" aria-labelledby="legal-title">
      <h1 id="legal-title">Mentions légales</h1>

      <section aria-labelledby="editor-title">
        <h2 id="editor-title">Éditeur du site</h2>
        <address>
          <p>
            <strong>Sronnok</strong>
            <br />
            Propriétaire : John&nbsp;Doe
            <br />
            Adresse&nbsp;: 13 Wisteria Lane
            <br />
            Email&nbsp;:{" "}
            <a href="mailto:contact@marcelleetmauriceshop.fr">
              contact@marcelleetmauriceshop.fr
            </a>
          </p>
        </address>
      </section>

      <section aria-labelledby="hosting-title">
        <h2 id="hosting-title">Hébergement</h2>
        <address>
          <p>
            Hébergeur : L’hébergeur
            <br />
            Adresse : cloud:somewhere//over.the.rainbow
            <br />
            Téléphone : <a href="tel:+33600000000">06 00 00 00 00</a>
            <br />
            Email :{" "}
            <a href="mailto:lhebergeur@cloud.com">lhebergeur@cloud.com</a>
          </p>
        </address>
      </section>

      <section aria-labelledby="ip-title">
        <h2 id="ip-title">Propriété intellectuelle</h2>
        <p>
          Le contenu du site (textes, images, logos, etc.) est la propriété
          exclusive de Marcelle &amp; Maurice Shop, sauf mention contraire.
          Toute reproduction ou utilisation sans autorisation est interdite.
        </p>
      </section>

      <section aria-labelledby="dataprotection-title">
        <h2 id="dataprotection-title">Protection des données personnelles</h2>
        <p>
          Conformément au RGPD, les utilisateurs disposent d’un droit d’accès,
          de rectification et de suppression de leurs données personnelles. Pour
          exercer ces droits, veuillez nous contacter à l’adresse email indiquée
          ci-dessus.
        </p>
      </section>

      <section aria-labelledby="cookies-title">
        <h2 id="cookies-title">Cookies</h2>
        <p>
          Ce site utilise des cookies pour améliorer l’expérience utilisateur.
          Vous pouvez configurer vos préférences via la bannière de
          consentement.
        </p>
      </section>
    </main>
  );
};

export default LegalMentions;
