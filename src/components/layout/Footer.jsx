import { FaInstagram, FaFacebookF, FaXTwitter } from 'react-icons/fa6';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <p>© 2025 MiTienda. Todos los derechos reservados.</p>
      <div className="social-icons">
        <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
          <FaInstagram />
        </a>
        <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
          <FaFacebookF />
        </a>
        <a href="https://x.com" target="_blank" rel="noopener noreferrer">
          <FaXTwitter />
        </a>
      </div>
    </footer>
  );
}

export default Footer;
