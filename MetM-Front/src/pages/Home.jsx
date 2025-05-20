// src/pages/Home.jsx
// ========================
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
                <img src={p.img} alt={p.alt} loading="lazy" />
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
              Nos mugs sont fabriqués en faïence française, une céramique
              réputée pour sa robustesse et son esthétisme garantissant une
              finition soignée et une durabilité appréciable. Nous collaborons
              avec des manufactures françaises renommées, telles que la
              Faïencerie de Gien, fondée en 1821 et située dans le Loiret, qui
              perpétue un savoir-faire d'exception dans la production de faïence
              fine. Leur expertise garantit des produits à la fois esthétiques
              et résistants, adaptés à un usage quotidien.
            </p>
          </li>

          <li className="product-info__item" role="listitem">
            <h3>T-shirts en coton biologique français</h3>
            <p>
              Nos t-shirts sont confectionnés à partir de coton biologique
              cultivé en France, assurant une empreinte écologique réduite et
              une traçabilité complète. Nous collaborons avec des marques
              engagées dans le développement durable, telles que 1083, qui
              propose des t-shirts en coton bio certifié, fabriqués
              intégralement en France. Cette démarche garantit des textiles de
              qualité supérieure, doux au toucher et résistants au temps.
            </p>
          </li>

          <li className="product-info__item" role="listitem">
            <h3>Pins en aluminium recyclé</h3>
            <p>
              Nos pins sont fabriqués à partir d'aluminium recyclé, provenant de
              circuits de recyclage français. Cette approche permet de réduire
              l'impact environnemental tout en assurant une qualité et une
              finition irréprochables. Nous veillons à ce que chaque étape de
              production respecte des normes strictes, garantissant des produits
              durables et esthétiques.​ En choisissant nos produits, vous
              soutenez l'artisanat français et optez pour des articles
              écoresponsables, alliant qualité, durabilité et respect de
              l'environnement.​
            </p>
          </li>
        </ul>
      </section>
    </main>
  );
};

export default Home;
