// src/pages/Home.jsx
import React from "react";
import { Link } from "react-router-dom";
import "../styles/pages/_Home.scss";
import tshirt from "../assets/images/tshirt.jpg";
import mug from "../assets/images/mug1.jpg";
import pins from "../assets/images/pins1.jpg";

const Home = () => {
  return (
    <main
      id="main-content"
      role="main"
      className="home-container"
      aria-labelledby="home-title"
    >
      {/* Bannière principale */}
      <header className="home-banner" role="banner">
        <h1 id="home-title">Personnalisez vos objets favoris</h1>
      </header>

      {/* Navigation vers les produits */}
      <nav
        className="product-selection"
        role="navigation"
        aria-label="Sélection de produits à personnaliser"
      >
        <h2 className="sr-only">Choix de produits</h2>
        <ul className="product-selection__list" role="list">
          {[
            {
              to: "/product/mug",
              img: mug,
              label: "Mug",
              alt: "Exemple de mug blanc",
            },
            {
              to: "/product/tshirt",
              img: tshirt,
              label: "T-Shirt",
              alt: "Exemple de t-shirt blanc",
            },
            {
              to: "/product/pins",
              img: pins,
              label: "Pin’s",
              alt: "Exemple de pin’s en métal",
            },
          ].map((p) => (
            <li key={p.to} className="product-selection__item" role="listitem">
              <Link
                to={p.to}
                className="product-selection__link"
                aria-label={`Personnaliser ${p.label}`}
              >
                <img src={p.img} alt={p.alt} />
                <span>{p.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Section descriptive des produits */}
      <section
        className="product-info"
        role="region"
        aria-labelledby="product-info-title"
      >
        <h2 id="product-info-title">Pourquoi choisir nos produits ?</h2>
        <p>
          Nous vous proposons des articles de haute qualité, fabriqués en France
          à partir de matériaux biosourcés et durables. Mugs, t-shirts et pins
          allient esthétisme, performance et respect de l’environnement.
        </p>

        <ul className="product-info__list" role="list">
          <li className="product-info__item" role="listitem">
            <h3>Mugs en céramique de haute qualité</h3>
            <p>
              Fabriqués en faïence française, ils sont robustes et durables.
              Nous collaborons avec la Faïencerie de Gien, fondée en 1821, pour
              garantir une finition irréprochable.
            </p>
          </li>

          <li className="product-info__item" role="listitem">
            <h3>T-shirts en coton biologique français</h3>
            <p>
              Confectionnés en France à partir de coton bio certifié, ils
              offrent douceur et résistance tout en limitant l’empreinte
              carbone.
            </p>
          </li>

          <li className="product-info__item" role="listitem">
            <h3>Pins en aluminium recyclé</h3>
            <p>
              Nos pins recyclés soutiennent l’économie circulaire française et
              garantissent une qualité et une finition irréprochables.
            </p>
          </li>
        </ul>
      </section>
    </main>
  );
};

export default Home;
