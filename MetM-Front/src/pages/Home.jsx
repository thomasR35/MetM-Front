import React from "react";
import { Link } from "react-router-dom";
import "../styles/pages/_Home.scss";
import tshirt from "../assets/images/tshirt.svg";
import mug from "../assets/images/mug.svg";
import pins from "../assets/images/pins.svg";

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
          En offrant votre image, vous pouvez personnaliser vos objets favoris
          et les rendre uniques.
        </p>
      </section>
    </main>
  );
};

export default Home;
