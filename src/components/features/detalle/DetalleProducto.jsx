import { useContext } from "react";
import { useParams, Link } from "react-router-dom";
import "./DetalleProducto.css";
import { CarritoContext } from "../../../context/CarritoContext";
import { AuthContext } from "../../../context/AuthContext";

function DetalleProducto({ productos }) {
  const { id } = useParams();
  const { agregarAlCarrito } = useContext(CarritoContext);
  const { user } = useContext(AuthContext);

  // MockAPI devuelve id como string, así evitamos problemas
  const producto = productos.find((p) => String(p.id) === String(id));

  if (!producto) {
    return <p>Producto no encontrado.</p>;
  }

  return (
    <div className="detalle-container">
      <img src={producto.image} alt={producto.title} className="detalle-img" />
      <div className="detalle-info">
        <h2>{producto.title}</h2>
        <p className="detalle-price">${producto.price}</p>
        <p className="detalle-description">{producto.description}</p>

        {user ? (
          <button
            className="detalle-btn"
            onClick={() => agregarAlCarrito(producto)}
          >
            Agregar al carrito
          </button>
        ) : (
          <p className="detalle-warning">
            Debes iniciar sesión para agregar al carrito.
            <br />
            <Link to="/login" className="detalle-link">Iniciar sesión</Link> |{" "}
            <Link to="/register" className="detalle-link">Registrarse</Link>
          </p>
        )}
      </div>
    </div>
  );
}

export default DetalleProducto;
