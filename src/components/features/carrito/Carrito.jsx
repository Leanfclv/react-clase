import { useContext } from 'react';
import { CarritoContext } from '../../../context/CarritoContext'; 
import { FaTrashAlt, FaShoppingBag } from 'react-icons/fa';
import './Carrito.css';

function Carrito() {
  // 👇 Consumimos el contexto
  const { carrito, agregarAlCarrito, quitarDelCarrito, vaciarCarrito } = useContext(CarritoContext);

  // Calculamos el total considerando cantidad
  const total = carrito.reduce((sum, p) => sum + p.price * (p.cantidad || 1), 0);

  return (
    <div className="carrito-page">
      <h2><FaShoppingBag style={{ marginRight: '8px' }} /> Carrito de compras</h2>

      {carrito.length === 0 ? (
        <p>El carrito está vacío.</p>
      ) : (
        <>
          <ul className="carrito-lista">
            {carrito.map((producto, index) => (
              <li key={index} className="carrito-item">
                <img src={producto.image} alt={producto.title} />
                <div className="carrito-info">
                  <h3>{producto.title}</h3>
                  <p>${producto.price} x {producto.cantidad || 1}</p>

                  {/* 🔹 Controles de cantidad */}
                  <div className="carrito-controls">
                    <button 
                      onClick={() => quitarDelCarrito(producto.id)} 
                      className="qty-btn"
                    >
                      –
                    </button>
                    <span className="carrito-qty">{producto.cantidad}</span>
                    <button 
                      onClick={() => agregarAlCarrito(producto)} 
                      className="qty-btn"
                    >
                      +
                    </button>
                  </div>

                  {/* 🔹 Eliminar todo el producto */}
                  <button 
                    onClick={() => quitarDelCarrito(producto.id)} 
                    className="remove-btn"
                  >
                    <FaTrashAlt style={{ marginRight: '6px' }} />
                    Eliminar
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <div className="carrito-total">
            <p><strong>Total:</strong> ${total.toFixed(2)}</p>
            <button className="vaciar-btn" onClick={vaciarCarrito}>
              <FaTrashAlt style={{ marginRight: '6px' }} />
              Vaciar carrito
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Carrito;
