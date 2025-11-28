import { useEffect, useState } from "react";
import "./AdminPanel.css"; // Asegurate de tener este archivo

function AdminPanel() {
  const [productos, setProductos] = useState([]);
  const [nuevoProducto, setNuevoProducto] = useState({
    title: "",
    price: "",
    image: "",
    description: ""
  });

  const API_URL = "https://69275fed26e7e41498fe04b6.mockapi.io/productos";

  const fetchProductos = async () => {
    const res = await fetch(API_URL);
    const data = await res.json();
    setProductos(data);
  };

  useEffect(() => {
    fetchProductos();
  }, []);

  const agregarProducto = async () => {
    const { title, price, image, description } = nuevoProducto;
    if (!title || !price || !image || !description) return;

    await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(nuevoProducto),
    });

    setNuevoProducto({ title: "", price: "", image: "", description: "" });
    fetchProductos();
  };

  const eliminarProducto = async (id) => {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    fetchProductos();
  };

  const editarProducto = async (id, campo, valor) => {
    const productoActualizado = productos.find((p) => p.id === id);
    if (!productoActualizado) return;

    await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...productoActualizado, [campo]: valor }),
    });

    fetchProductos();
  };

  return (
    <div className="admin-panel">
      <h2>Panel de Administración 👑</h2>

      {/* Formulario para agregar */}
      <div className="admin-form">
        <input
          type="text"
          placeholder="Título"
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
          placeholder="URL de imagen"
          value={nuevoProducto.image}
          onChange={(e) => setNuevoProducto({ ...nuevoProducto, image: e.target.value })}
        />
        <textarea
          placeholder="Descripción"
          value={nuevoProducto.description}
          onChange={(e) => setNuevoProducto({ ...nuevoProducto, description: e.target.value })}
        />
        {nuevoProducto.image && (
          <img
            src={nuevoProducto.image}
            alt="Preview"
            className="preview-img"
            onError={(e) => (e.target.style.display = "none")}
          />
        )}
        <button onClick={agregarProducto}>Agregar producto</button>
      </div>

      {/* Lista de productos */}
      {productos.map((prod) => (
        <div key={prod.id} className="product-row">
          <input
            type="text"
            value={prod.title}
            onChange={(e) => editarProducto(prod.id, "title", e.target.value)}
          />
          <input
            type="number"
            value={prod.price}
            onChange={(e) => editarProducto(prod.id, "price", e.target.value)}
          />
          <input
            type="text"
            value={prod.image}
            onChange={(e) => editarProducto(prod.id, "image", e.target.value)}
          />
          <textarea
            value={prod.description}
            onChange={(e) => editarProducto(prod.id, "description", e.target.value)}
          />
          <button onClick={() => eliminarProducto(prod.id)}>Eliminar</button>
        </div>
      ))}
    </div>
  );
}

export default AdminPanel;
