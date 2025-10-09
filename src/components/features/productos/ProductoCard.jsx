import { Link } from 'react-router-dom';
import { FaPlus, FaInfoCircle } from 'react-icons/fa';
import { motion } from 'framer-motion';
import './ProductoCard.css';

const MotionLink = motion(Link);

function ProductoCard({ producto, agregarAlCarrito }) {
  return (
    <motion.div
      className="card"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1 }} // animación uniforme
      whileHover={{ scale: 1.03 }}
    >
      <img src={producto.image} alt={producto.title} className="card-img" />
      <h2 className="card-title">{producto.title}</h2>
      <p className="card-price">${producto.price}</p>
      <div className="card-buttons">
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => agregarAlCarrito(producto)}
          className="card-btn agregar"
        >
          <FaPlus style={{ marginRight: '6px' }} />
          Agregar
        </motion.button>

        <MotionLink
          to={`/producto/${producto.id}`}
          whileTap={{ scale: 0.95 }}
          className="card-btn detalle"
        >
          <FaInfoCircle style={{ marginRight: '6px' }} />
          Ver detalle
        </MotionLink>
      </div>
    </motion.div>
  );
}

export default ProductoCard;
