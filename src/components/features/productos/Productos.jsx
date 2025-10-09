import ProductoCard from './ProductoCard';
import './Productos.css';

function Productos({ productos, agregarAlCarrito }) {
  return (
    <main className="productos-container">
      <h1>Catálogo</h1>
      <div className="productos-grid">
        {productos.map((producto, index) => (
        <ProductoCard
          key={producto.id}
          producto={producto}
          agregarAlCarrito={agregarAlCarrito}
          delay={index * 0.1}
        />
        ))}
      </div>
    </main>
  );
}

export default Productos;
