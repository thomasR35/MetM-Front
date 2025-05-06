// src/components/Footer.jsx
// ========================
import { Link } from "react-router-dom";
import "../styles/components/_footer.scss";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer" role="contentinfo" aria-label="Pied de page">
      <div className="footer-container">
        <nav role="navigation" aria-label="Liens légaux et contact">
          <Link to="/mentions-legales" className="footer-link">
            Mentions légales
          </Link>
          <span className="footer-text">
            © {currentYear} Marcelle & Maurice Shop
          </span>
          <Link to="/contact" className="footer-link">
            Contact
          </Link>
        </nav>
      </div>
    </footer>
  );
};
export default Footer;
