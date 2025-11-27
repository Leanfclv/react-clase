import { createContext, useState, useEffect } from "react";

export const CarritoContext = createContext();

export function CarritoProvider({ children }) {
  // 🟦 Cargar carrito desde localStorage
  const [carrito, setCarrito] = useState(() => {
    try {
      const guardado = localStorage.getItem("carrito");
      return guardado ? JSON.parse(guardado) : [];
    } catch (err) {
      console.error("Error cargando carrito desde localStorage:", err);
      return [];
    }
  });

  // 🟦 Guardar carrito en localStorage cuando cambie
  useEffect(() => {
    try {
      localStorage.setItem("carrito", JSON.stringify(carrito));
    } catch (err) {
      console.error("Error guardando carrito:", err);
    }
  }, [carrito]);

  // ➕ Agregar producto (incrementa cantidad si ya existe)
  const agregarAlCarrito = (producto) => {
    setCarrito((prev) => {
      const id = String(producto.id);
      const existe = prev.find((p) => String(p.id) === id);

      if (existe) {
        return prev.map((p) =>
          String(p.id) === id
            ? { ...p, cantidad: Number(p.cantidad || 0) + 1 }
            : p
        );
      }

      return [
        ...prev,
        {
          ...producto,
          id,
          cantidad: 1,
        },
      ];
    });
  };

  // ➖ Quitar producto (de a 1)
  const quitarDelCarrito = (id) => {
    const target = String(id);
    setCarrito((prev) =>
      prev
        .map((p) =>
          String(p.id) === target
            ? { ...p, cantidad: Number(p.cantidad || 1) - 1 }
            : p
        )
        .filter((p) => p.cantidad > 0)
    );
  };

  // 🟥 Eliminar producto COMPLETO (sin importar cantidad)
  const eliminarProducto = (id) => {
    const target = String(id);
    setCarrito((prev) => prev.filter((p) => String(p.id) !== target));
  };

  // 🧹 Vaciar carrito
  const vaciarCarrito = () => setCarrito([]);

  // 💰 Calcular total
  const calcularTotal = () =>
    carrito.reduce(
      (acc, p) => acc + Number(p.price || 0) * Number(p.cantidad || 0),
      0
    );

  return (
    <CarritoContext.Provider
      value={{
        carrito,
        agregarAlCarrito,
        quitarDelCarrito,   // resta de a 1
        eliminarProducto,   // borra todo el producto
        vaciarCarrito,
        calcularTotal,
      }}
    >
      {children}
    </CarritoContext.Provider>
  );
}
