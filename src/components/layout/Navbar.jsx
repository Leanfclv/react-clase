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

  const totalItems = carrito.reduce((acc, p) => acc + p.cantidad, 0);
  const nombreUsuario = user?.displayName
    ? user.displayName.split(" ")[0]
    : "Leandro";

  return (
    <nav className="navbar">
      {/* Izquierda */}
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

      {/* Derecha */}
      <div className="nav-right">
        {user && (
          <div className="cart-icon-container">
            {/* ICONO DEL CARRITO */}
            <Link to="/carrito" className="cart-icon">
              <FaShoppingCart />
              {totalItems > 0 && (
                <span className="cart-count">{totalItems}</span>
              )}
            </Link>

            {/* PREVISUALIZACIÓN */}
            <div className="cart-preview">
              {carrito.length === 0 ? (
                <p className="empty-cart">Tu carrito está vacío</p>
              ) : (
                <ul className="cart-items">
                  {carrito.map((item) => (
                    <li key={item.id} className="cart-item">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="cart-item-img"
                      />
                      <div className="cart-item-info">
                        <span className="cart-item-name">{item.title}</span>
                        <span className="cart-item-qty">x{item.cantidad}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              )}

              <Link to="/carrito" className="view-cart-btn">
                Ver carrito
              </Link>
            </div>
          </div>
        )}

        {user ? (
          <>
            <span className="nav-user">
              <FaUser style={{ marginRight: "6px" }} />
              Hola {nombreUsuario} 👋
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
