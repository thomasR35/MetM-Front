import React from "react";
import { Link } from "react-router-dom";
import "../styles/pages/_Home.scss";
import tshirt from "../assets/images/tshirt.jpg";
import mug from "../assets/images/mug1.jpg";
import pins from "../assets/images/pins1.jpg";

const Home = () => {
  return (
    <main className="home-container">
      <section className="home-banner">
        <h1>Personnalisez vos objets favoris</h1>
      </section>

      <section className="product-selection">
        <Link to="/product/mug" className="product-card">
          <img src={mug} alt="Mug" />
          <p>Mug</p>
        </Link>
        <Link to="/product/tshirt" className="product-card">
          <img src={tshirt} alt="T-Shirt" />
          <p>T-Shirt</p>
        </Link>
        <Link to="/product/pins" className="product-card">
          <img src={pins} alt="Pin’s" />
          <p>Pin’s</p>
        </Link>
      </section>
      <section className="product-info">
        <p>
          Nous nous engageons à vous fournir des produits de haute qualité,
          fabriqués en France à partir de matériaux biosourcés et durables. Nous
          assurons l'excellence de nos mugs, t-shirts et pins :
        </p>
        <h4>Mugs en céramique de haute qualité</h4>
        <p>
          Nos mugs sont fabriqués en faïence française, une céramique réputée
          pour sa robustesse et son esthétisme garantissant une finition soignée
          et une durabilité appréciable. Nous collaborons avec des manufactures
          françaises renommées, telles que la Faïencerie de Gien, fondée en 1821
          et située dans le Loiret, qui perpétue un savoir-faire d'exception
          dans la production de faïence fine. Leur expertise garantit des
          produits à la fois esthétiques et résistants, adaptés à un usage
          quotidien.
        </p>
        <h4>T-shirts en coton biologique français</h4>
        <p>
          Nos t-shirts sont confectionnés à partir de coton biologique cultivé
          en France, assurant une empreinte écologique réduite et une
          traçabilité complète. Nous collaborons avec des marques engagées dans
          le développement durable, telles que 1083, qui propose des t-shirts en
          coton bio certifié, fabriqués intégralement en France. Cette démarche
          garantit des textiles de qualité supérieure, doux au toucher et
          résistants au temps.
        </p>
        <h4>Pins en aluminium recyclé d'origine française</h4>
        <p>
          Nos pins sont fabriqués à partir d'aluminium recyclé, provenant de
          circuits de recyclage français. Cette approche permet de réduire
          l'impact environnemental tout en assurant une qualité et une finition
          irréprochables. Nous veillons à ce que chaque étape de production
          respecte des normes strictes, garantissant des produits durables et
          esthétiques.​ En choisissant nos produits, vous soutenez l'artisanat
          français et optez pour des articles écoresponsables, alliant qualité,
          durabilité et respect de l'environnement.​
        </p>
      </section>
    </main>
  );
};

export default Home;
