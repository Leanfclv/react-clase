import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaShoppingCart,
  FaHome,
  FaEnvelope,
  FaUser,
  FaSignOutAlt,
  FaSearch
} from "react-icons/fa";

import { AuthContext } from "../../context/AuthContext";
import { CarritoContext } from "../../context/CarritoContext";
import { SearchContext } from "../../context/SearchContext";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebaseConfig";

import "./Navbar.css";

function Navbar() {
  const { carrito } = useContext(CarritoContext);
  const { user, logout } = useContext(AuthContext);
  const { query, setQuery } = useContext(SearchContext);

  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);

  const totalItems = carrito.reduce((acc, p) => acc + p.cantidad, 0);

  // 🔎 manejar búsqueda
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (query.trim().length > 0) {
      navigate("/busqueda");
    }
  };

  // 🔹 Traer datos del usuario desde Firestore
  useEffect(() => {
    const fetchUserData = async () => {
      if (user) {
        const ref = doc(db, "usuarios", user.uid);
        const snap = await getDoc(ref);
        if (snap.exists()) {
          setUserData(snap.data());
        }
      } else {
        setUserData(null);
      }
    };
    fetchUserData();
  }, [user]);

  // 🔹 Determinar saludo dinámico
  const saludo = () => {
    if (!user) return "";
    if (userData?.role === "admin") return "Admin";

    // Si tiene displayName, tomamos solo el primer nombre
    if (user.displayName) {
      return user.displayName.split(" ")[0];
    }

    // Si no tiene displayName, usamos el email antes del @
    return user.email.split("@")[0];
  };

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

      {/* 🔎 BARRA DE BÚSQUEDA */}
      <form className="search-bar" onSubmit={handleSearchSubmit}>
        <input
          type="text"
          placeholder="Buscar productos..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit">
          <FaSearch />
        </button>
      </form>

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

            {/* PREVIEW FLOTANTE */}
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
              Hola {saludo()} 👋
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
