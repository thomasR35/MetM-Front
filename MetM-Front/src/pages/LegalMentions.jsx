import React from "react";

const LegalMentions = () => {
  return (
    <main className="legal-mentions">
      <h1>Mentions légales</h1>

      <section>
        <h2>Éditeur du site</h2>
        <p>
          Ce site est édité par : <strong>Marcelle & Maurice Shop</strong>
          <br />
          Propriétaire : [Nom à insérer] <br />
          Adresse : [Adresse complète] <br />
          Email : contact@marcelleetmauriceshop.fr
        </p>
      </section>

      <section>
        <h2>Hébergement</h2>
        <p>
          Hébergeur : [Nom de l’hébergeur] <br />
          Adresse : [Adresse de l’hébergeur] <br />
          Téléphone : [Téléphone de l’hébergeur]
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
