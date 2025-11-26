import { useState } from "react";

function AdminCrud() {
  const [articulos, setArticulos] = useState([]);
  const [nuevo, setNuevo] = useState("");

  const agregar = () => {
    if (nuevo.trim() === "") return;
    setArticulos([...articulos, { id: Date.now(), nombre: nuevo }]);
    setNuevo("");
  };

  const eliminar = (id) => {
    setArticulos(articulos.filter((a) => a.id !== id));
  };

  const editar = (id, nombre) => {
    setArticulos(
      articulos.map((a) => (a.id === id ? { ...a, nombre } : a))
    );
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Panel Admin - CRUD Artículos</h2>

      <div style={{ marginBottom: "10px" }}>
        <input
          value={nuevo}
          onChange={(e) => setNuevo(e.target.value)}
          placeholder="Nuevo artículo"
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
