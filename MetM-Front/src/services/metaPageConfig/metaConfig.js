// src/services/metaConfig.js
//=====================================
import { fetchProductBySlug } from "@/api/products.js";

export const metaConfig = [
  {
    path: "/",
    meta: {
      title: "Accueil – Marcelle et Maurice Shop",
      description:
        "Personnalisez vos mugs, t-shirts et pins avec vos propres visuels. Qualité française écoresponsable.",
      canonical: "https://marcelle-maurice.shop/",
      image: "https://marcelle-maurice.shop/assets/images/og-home.jpg",
    },
  },
  {
    path: "/product/:productType",
    /** getMeta peut retourner une Promise, votre routeur doit la gérer */
    getMeta: async ({ productType }) => {
      try {
        const prod = await fetchProductBySlug(productType);
        if (!prod) {
          // fallback si le produit n'existe pas
          return {
            title: "Produit introuvable – Marcelle et Maurice Shop",
            description: "Le produit que vous recherchez est introuvable.",
            canonical: `https://marcelle-maurice.shop/product/${productType}`,
            image: "https://marcelle-maurice.shop/assets/images/og-home.jpg",
          };
        }
        const name = prod.name;
        const price = parseFloat(prod.price).toFixed(2).replace(".", ",") + "€";
        const img = prod.image_url; // champ renvoyé par l'API
        return {
          title: `Personnalisation ${name} – Marcelle et Maurice Shop`,
          description: `Créez un ${name} unique à ${price} en téléchargeant votre image.`,
          canonical: `https://marcelle-maurice.shop/product/${productType}`,
          image: `https://marcelle-maurice.shop${img}`,
        };
      } catch (err) {
        console.error("Erreur getMeta product:", err);
        return {
          title: "Produit – Marcelle et Maurice Shop",
          description: "Personnalisez votre produit.",
          canonical: `https://marcelle-maurice.shop/product/${productType}`,
        };
      }
    },
  },
  {
    // Page de la galerie
    path: "/gallery",
    meta: {
      title: "Galerie d'images – Marcelle et Maurice Shop",
      description:
        "Découvrez la galerie des créations personnalisées de nos utilisateurs inspirés par Maurice et Marcelle. Filtrez par mot-clé et trouvez l’inspiration !",
      canonical: "https://marcelle-maurice.shop/gallery",
      image: "https://marcelle-maurice.shop/assets/images/og-gallery.jpg",
    },
  },
  {
    // Page du panier
    path: "/cart",
    meta: {
      title: "Votre Panier – Marcelle et Maurice Shop",
      description:
        "Consultez et gérez les articles de votre panier. Connectez-vous pour finaliser votre commande.",
      canonical: "https://marcelle-maurice.shop/cart",
      image: "https://marcelle-maurice.shop/assets/images/og-cart.jpg",
    },
  },
  {
    // Page de paiement
    // Note : le chemin est dynamique pour permettre le paiement via Stripe Checkout
    path: "/checkout",
    meta: {
      title: "Finaliser la Commande – Marcelle et Maurice Shop",
      description:
        "Entrez vos coordonnées et confirmez votre paiement sécurisé via Stripe Checkout.",
      canonical: "https://marcelle-maurice.shop/checkout",
      image: "https://marcelle-maurice.shop/assets/images/og-checkout.jpg",
    },
  },
  {
    // Page de contact
    path: "/contact",
    meta: {
      title: "Contactez-nous – Marcelle et Maurice Shop",
      description:
        "Une question, une suggestion ou besoin d’aide ? Contactez notre service client via ce formulaire.",
      canonical: "https://marcelle-maurice.shop/contact",
      image: "https://marcelle-maurice.shop/assets/images/og-contact.jpg",
    },
  },
  {
    // Page de mentions légales
    path: "/legal-mentions",
    meta: {
      title: "Mentions légales – Marcelle et Maurice Shop",
      description:
        "Consultez les informations légales et mentions obligatoires de Marcelle & Maurice Shop : éditeur, hébergeur, propriété intellectuelle et RGPD.",
      canonical: "https://marcelle-maurice.shop/legal-mentions",
      image: "https://marcelle-maurice.shop/assets/images/og-legal.jpg",
    },
  },

  {
    // Conditions Générales
    path: "/terms",
    meta: {
      title: "Conditions Générales de Vente – Marcelle et Maurice Shop",
      description:
        "Consultez nos conditions générales de vente pour toute commande.",
      canonical: "https://marcelle-maurice.shop/terms",
    },
  },
  {
    // Politique de confidentialité
    path: "/privacy",
    meta: {
      title: "Politique de Confidentialité – Marcelle et Maurice Shop",
      description:
        "Découvrez comment nous protégeons vos données personnelles (RGPD).",
      canonical: "https://marcelle-maurice.shop/privacy",
    },
  },
  {
    // Page de succès
    path: "/success",
    meta: {
      title: "Paiement réussi – Marcelle et Maurice Shop",
      description:
        "Merci pour votre commande ! Votre paiement a bien été pris en compte.",
      canonical: "https://marcelle-maurice.shop/success",
    },
  },
  {
    // Page d’annulation
    path: "/cancel",
    meta: {
      title: "Paiement annulé – Marcelle et Maurice Shop",
      description:
        "Votre paiement a été annulé. Vous pouvez réessayer ou retourner au panier.",
      canonical: "https://marcelle-maurice.shop/cancel",
    },
  },
];
