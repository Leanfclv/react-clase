import { useState, useEffect } from "react";
import axios from "axios";

function AdminPanel() {
  const [productos, setProductos] = useState([]);
  const [nuevoProducto, setNuevoProducto] = useState({ title: "", price: "", image: "" });

  // Cargar productos desde MockAPI
  useEffect(() => {
    axios.get("https://mockapi.io/api/v1/productos")
      .then(res => setProductos(res.data));
  }, []);

  // Agregar producto
  const agregarProducto = async () => {
    await axios.post("https://mockapi.io/api/v1/productos", nuevoProducto);
    setProductos([...productos, nuevoProducto]);
    setNuevoProducto({ title: "", price: "", image: "" });
  };

  // Eliminar producto
  const eliminarProducto = async (id) => {
    await axios.delete(`https://mockapi.io/api/v1/productos/${id}`);
    setProductos(productos.filter(p => p.id !== id));
  };

  return (
    <div className="admin-panel">
      <h2>Panel de administración</h2>

      {/* Formulario para agregar */}
      <input 
        type="text" 
        placeholder="Nombre" 
        value={nuevoProducto.title} 
        onChange={(e) => setNuevoProducto({ ...nuevoProducto, title: e.target.value })}
      />
      <input 
        type="number" 
        placeholder="Precio" 
        value={nuevoProducto.price} 
        onChange={(e) => setNuevoProducto({ ...nuevoProducto, price: e.target.value })}
      />
      <input 
        type="text" 
        placeholder="Imagen URL" 
        value={nuevoProducto.image} 
        onChange={(e) => setNuevoProducto({ ...nuevoProducto, image: e.target.value })}
      />
      <button onClick={agregarProducto}>Agregar producto</button>

      {/* Lista de productos */}
      <ul>
        {productos.map(p => (
          <li key={p.id}>
            {p.title} - ${p.price}
            <button onClick={() => eliminarProducto(p.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AdminPanel;
