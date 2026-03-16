// src/pages/Home.jsx
// ========================
import { Link } from "react-router-dom";
import "../styles/pages/_home.scss";
import tshirt from "../assets/images/demoshirt.png";
import mug from "../assets/images/demomug.png";
import pins from "../assets/images/demopins.png";

const Home = () => {
  return (
    <main
      id="main-content"
      role="main"
      className="home-container"
      aria-labelledby="home-title"
    >
      {/* Bannière hero */}
      <header className="home-banner" role="banner">
        <p className="home-banner__label">Collection personnalisée</p>
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
              sub: "Céramique française, finition mate",
              alt: "Exemple de mug personnalisable",
            },
            {
              to: "/product/tshirt",
              img: tshirt,
              label: "T-Shirt",
              sub: "Coton biologique, coupe unisexe",
              alt: "Exemple de t-shirt personnalisable",
            },
            {
              to: "/product/pins",
              img: pins,
              label: "Pin's",
              sub: "Aluminium recyclé, finition brillante",
              alt: "Exemple de pin's personnalisable",
            },
          ].map((p) => (
            <li key={p.to} className="product-selection__item" role="listitem">
              <Link
                to={p.to}
                className="product-selection__link"
                aria-label={`Personnaliser ${p.label}`}
              >
                <div className="product-img-wrapper">
                  <img src={p.img} alt={p.alt} loading="lazy" />
                </div>
                <div className="product-label">
                  <span>{p.label}</span>
                  <span className="product-cta-hint">Personnaliser →</span>
                </div>
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
        <span className="product-info__label">Notre engagement</span>
        <h2 id="product-info-title">Pourquoi choisir nos produits ?</h2>
        <p>
          Nous vous proposons des articles de haute qualité, fabriqués en France
          à partir de matériaux biosourcés et durables. Mugs, t-shirts et pins
          allient esthétisme, performance et respect de l'environnement.
        </p>

        <ul className="product-info__list" role="list">
          <li className="product-info__item" role="listitem">
            <h3>Mugs en céramique</h3>
            <p>
              Nos mugs sont fabriqués en faïence française, une céramique
              réputée pour sa robustesse et son esthétisme garantissant une
              finition soignée et une durabilité appréciable. Nous collaborons
              avec des manufactures françaises renommées, telles que la
              Faïencerie de Gien, fondée en 1821.
            </p>
          </li>

          <li className="product-info__item" role="listitem">
            <h3>T-shirts en coton bio</h3>
            <p>
              Nos t-shirts sont confectionnés à partir de coton biologique
              cultivé en France, assurant une empreinte écologique réduite et
              une traçabilité complète. Nous collaborons avec des marques
              engagées dans le développement durable, telles que 1083.
            </p>
          </li>

          <li className="product-info__item" role="listitem">
            <h3>Pins en aluminium recyclé</h3>
            <p>
              Nos pins sont fabriqués à partir d'aluminium recyclé, provenant de
              circuits de recyclage français. Cette approche permet de réduire
              l'impact environnemental tout en assurant une qualité et une
              finition irréprochables.
            </p>
          </li>
        </ul>
      </section>
    </main>
  );
};

export default Home;
