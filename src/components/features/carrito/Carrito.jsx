import { FaTrashAlt, FaShoppingBag } from 'react-icons/fa';
import './Carrito.css';

function Carrito({ carrito, setCarrito }) {
  const eliminarProducto = (id) => {
    const index = carrito.findIndex(p => p.id === id);
    if (index !== -1) {
      const nuevoCarrito = [...carrito];
      nuevoCarrito.splice(index, 1); 
      setCarrito(nuevoCarrito);
  }
};
  const vaciarCarrito = () => {
    setCarrito([]);
  };

  const total = carrito.reduce((sum, p) => sum + p.price, 0);

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
                  <p>${producto.price}</p>
                  <button onClick={() => eliminarProducto(producto.id)}>
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
