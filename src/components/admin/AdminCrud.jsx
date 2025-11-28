import { useState, useEffect } from "react";

function AdminCrud() {
  const [articulos, setArticulos] = useState([]);
  const [nuevo, setNuevo] = useState("");

  const API_URL = "https://69275fed26e7e41498fe04b6.mockapi.io/productos";

  // 🔹 Leer productos al montar
  useEffect(() => {
    fetchProductos();
  }, []);

  const fetchProductos = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setArticulos(data);
    } catch (error) {
      console.error("Error al cargar productos:", error);
    }
  };

  // 🔹 Crear producto
  const agregar = async () => {
    if (nuevo.trim() === "") return;
    try {
      await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre: nuevo }),
      });
      setNuevo("");
      fetchProductos(); // refrescar lista
    } catch (error) {
      console.error("Error al agregar producto:", error);
    }
  };

  // 🔹 Eliminar producto
  const eliminar = async (id) => {
    try {
      await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      fetchProductos();
    } catch (error) {
      console.error("Error al eliminar producto:", error);
    }
  };

  // 🔹 Editar producto
  const editar = async (id, nombre) => {
    try {
      await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre }),
      });
      fetchProductos();
    } catch (error) {
      console.error("Error al editar producto:", error);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Panel Admin - CRUD Productos (MockAPI)</h2>

      <div style={{ marginBottom: "10px" }}>
        <input
          value={nuevo}
          onChange={(e) => setNuevo(e.target.value)}
          placeholder="Nuevo producto"
        />
        <button onClick={agregar}>Agregar</button>
      </div>

      <ul>
        {articulos.map((a) => (
          <li key={a.id} style={{ marginBottom: "8px" }}>
            <input
              value={a.nombre}
              onChange={(e) => editar(a.id, e.target.value)}
            />
            <button onClick={() => eliminar(a.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AdminCrud;

