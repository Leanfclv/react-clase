import { useParams } from 'react-router-dom';
import './DetalleProducto.css';

function DetalleProducto({ productos }) {
  const { id } = useParams();
  const producto = productos.find(p => p.id === parseInt(id));

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
      </div>
    </div>
  );
}

export default DetalleProducto;
