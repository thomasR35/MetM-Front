// src/pages/Home.jsx
import React from "react";
import { Link } from "react-router-dom";
import "../styles/pages/_Home.scss";
import tshirt from "../assets/images/tshirt.jpg";
import mug from "../assets/images/mug1.jpg";
import pins from "../assets/images/pins1.jpg";

const Home = () => {
  return (
    <>
      <main className="home-container">
        {/* Bannière principale */}
        <header className="home-banner" role="banner">
          <h1>Personnalisez vos objets favoris</h1>
        </header>

        {/* Navigation vers les produits */}
        <nav
          className="product-selection"
          aria-label="Navigation vers pages produits"
        >
          <ul className="product-selection__list">
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
              <li key={p.to} className="product-selection__item">
                <Link
                  to={p.to}
                  className="product-selection__link"
                  aria-label={`Personnaliser ${p.label}`}
                >
                  <img src={p.img} alt={p.alt} />
                  <p>{p.label}</p>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Section descriptive des produits */}
        <section className="product-info" aria-labelledby="product-info-title">
          <h2 id="product-info-title">Pourquoi choisir nos produits&nbsp;?</h2>
          <p>
            Nous nous engageons à vous fournir des produits de haute qualité,
            fabriqués en France à partir de matériaux biosourcés et durables.
            Nos mugs, t-shirts et pins allient esthétisme, performance et
            respect de l’environnement.
          </p>

          <article className="product-info__item">
            <h3>Mugs en céramique de haute qualité</h3>
            <p>
              Nos mugs sont fabriqués en faïence française, réputée pour sa
              robustesse et sa finition soignée. Nous collaborons avec la
              Faïencerie de Gien, fondée en 1821, pour des produits durables et
              esthétiques.
            </p>
          </article>

          <article className="product-info__item">
            <h3>T-shirts en coton biologique français</h3>
            <p>
              Confectionnés intégralement en France à partir de coton biologique
              certifié, nos t-shirts offrent douceur et durabilité, tout en
              limitant l’empreinte carbone.
            </p>
          </article>

          <article className="product-info__item">
            <h3>Pins en aluminium recyclé d'origine française</h3>
            <p>
              Fabriqués en aluminium recyclé, nos pins soutiennent l’économie
              circulaire française et garantissent une qualité irréprochable.
            </p>
          </article>
        </section>
      </main>
    </>
  );
};

export default Home;
