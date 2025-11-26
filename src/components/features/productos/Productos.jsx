import { useContext } from "react";
import { CarritoContext } from "../../../context/CarritoContext";
import { AuthContext } from "../../../context/AuthContext";
import { Link } from "react-router-dom";
import "./Productos.css";

function Productos({ productos }) {
  const { agregarAlCarrito } = useContext(CarritoContext);
  const { user } = useContext(AuthContext);

  return (
    <div className="productos-grid">
      {productos.map((prod) => (
        <div key={prod.id} className="producto-card">
          <img src={prod.image} alt={prod.title} className="producto-img" />
          <h3>{prod.title}</h3>
          <p className="producto-price">${prod.price}</p>

          {user ? (
            <button onClick={() => agregarAlCarrito(prod)}>Agregar al carrito</button>
          ) : (
            <p className="producto-warning">Inicia sesión para agregar al carrito</p>
          )}

          <Link to={`/producto/${prod.id}`} className="producto-link">
            Ver detalle
          </Link>
        </div>
      ))}
    </div>
  );
}

export default Productos;
