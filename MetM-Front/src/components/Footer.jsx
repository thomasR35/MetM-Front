import { Link } from "react-router-dom";
import "../styles/components/_footer.scss";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <Link to="/mentions-legales" className="footer-link">
          Mentions légales
        </Link>
        <span className="footer-text">© 2025 Marcelle & Maurice Shop</span>
        <Link to="/contact" className="footer-link">
          Contact
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
