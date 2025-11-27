import { createContext, useState, useEffect } from "react";

export const CarritoContext = createContext();

export function CarritoProvider({ children }) {
  const [carrito, setCarrito] = useState(() => {
    const guardado = localStorage.getItem("carrito");
    return guardado ? JSON.parse(guardado) : [];
  });

  useEffect(() => {
    localStorage.setItem("carrito", JSON.stringify(carrito));
  }, [carrito]);

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

      return [...prev, { ...producto, id, cantidad: 1 }];
    });
  };

  const disminuirCantidad = (id) => {
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

  const eliminarProducto = (id) => {
    const target = String(id);
    setCarrito((prev) => prev.filter((p) => String(p.id) !== target));
  };

  const vaciarCarrito = () => setCarrito([]);

  const calcularTotal = () =>
    carrito.reduce((acc, p) => acc + Number(p.price) * Number(p.cantidad), 0);

  return (
    <CarritoContext.Provider
      value={{
        carrito,
        agregarAlCarrito,
        disminuirCantidad,
        eliminarProducto,
        vaciarCarrito,
        calcularTotal,
      }}
    >
      {children}
    </CarritoContext.Provider>
  );
}
