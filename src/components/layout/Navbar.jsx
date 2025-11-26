import { useContext } from "react";
import { Link } from "react-router-dom";
import {
  FaShoppingCart,
  FaHome,
  FaEnvelope,
  FaUser,
  FaSignOutAlt
} from "react-icons/fa";

import { AuthContext } from "../../context/AuthContext";
import { CarritoContext } from "../../context/CarritoContext";
import "./Navbar.css";

function Navbar() {
  const { carrito } = useContext(CarritoContext);
  const { user, logout } = useContext(AuthContext);

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
        {/* Carrito protegido */}
        {user && (
          <Link to="/carrito" className="cart-icon">
            <FaShoppingCart />
            {carrito.length > 0 && (
              <span className="cart-count">{carrito.length}</span>
            )}
          </Link>
        )}

        {user ? (
          <>
            <span className="nav-user">
              <FaUser style={{ marginRight: "6px" }} />
              {user.email}
            </span>
            <button className="nav-btn" onClick={logout}>
              <FaSignOutAlt style={{ marginRight: "6px" }} />
              Cerrar sesión
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="nav-btn">
              Iniciar sesión
            </Link>
            <Link to="/register" className="nav-btn">
              Registrarse
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
