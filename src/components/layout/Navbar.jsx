import { useContext } from "react";
import { Link } from "react-router-dom";
import { FaShoppingCart, FaHome, FaEnvelope } from "react-icons/fa";
import { CarritoContext } from "../../context/CarritoContext"; // 👈 Importamos el contexto
import "./Navbar.css";

function Navbar() {
  const { carrito } = useContext(CarritoContext); // 👈 Obtenemos carrito del contexto

  return (
    <nav className="navbar">
      <div className="nav-left">
        <Link to="/" className="nav-link">
          <FaHome style={{ marginRight: "6px" }} />
          Inicio
        </Link>
        <Link to="/contacto" className="nav-link">
          <FaEnvelope style={{ marginRight: "6px" }} />
          Contacto
        </Link>
      </div>
      <div className="nav-right">
        <Link to="/carrito" className="cart-icon">
          <FaShoppingCart />
          {carrito.length > 0 && (
            <span className="cart-count">{carrito.length}</span>
          )}
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
