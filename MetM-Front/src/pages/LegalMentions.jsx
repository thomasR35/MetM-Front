import React from "react";

const LegalMentions = () => {
  return (
    <main className="legal-mentions">
      <h1>Mentions légales</h1>

      <section>
        <h2>Éditeur du site</h2>
        <p>
          Ce site est édité par : <strong>Sronnok</strong>
          <br />
          Propriétaire : John Doe <br />
          Adresse : 13 Wisteria Lane <br />
          Email : contact@marcelleetmauriceshop.fr
        </p>
      </section>

      <section>
        <h2>Hébergement</h2>
        <p>
          Hébergeur : L'hébergeur <br />
          Adresse : cloud:somewhere//over.the.rainbow <br />
          Téléphone : 06 00 00 00 00 <br />
          Email : lhebergeur@cloud.com
        </p>
      </section>

      <section>
        <h2>Propriété intellectuelle</h2>
        <p>
          Le contenu du site (textes, images, logos, etc.) est la propriété
          exclusive de Marcelle & Maurice Shop, sauf mention contraire. Toute
          reproduction ou utilisation sans autorisation est interdite.
        </p>
      </section>

      <section>
        <h2>Protection des données personnelles</h2>
        <p>
          Conformément au RGPD, les utilisateurs disposent d’un droit d’accès,
          de rectification et de suppression de leurs données personnelles. Pour
          toute demande, veuillez nous contacter à l’adresse email indiquée
          ci-dessus.
        </p>
      </section>

      <section>
        <h2>Cookies</h2>
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
