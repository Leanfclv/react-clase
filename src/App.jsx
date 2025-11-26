import { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Productos from "./components/features/productos/Productos";
import Contacto from "./components/features/contacto/Contacto";
import Carrito from "./components/features/carrito/Carrito";
import DetalleProducto from "./components/features/detalle/DetalleProducto";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import AdminCrud from "./components/admin/AdminCrud";
import RutaProtegida from "./components/auth/RutaProtegida";

import { CarritoProvider } from "./context/CarritoContext";
import { AuthProvider } from "./context/AuthContext"; // 👈 Importamos el AuthProvider
import "./App.css";

// Usamos la nueva API de Framer Motion
const MotionDiv = motion.create("div");

function App() {
  const [productos, setProductos] = useState([]);
  const location = useLocation();

  useEffect(() => {
  fetch("https://69275fed26e7e41498fe04b6.mockapi.io/productos") // 👈 endpoint de Mokapi
    .then((res) => res.json())
    .then((data) => setProductos(data))
    .catch((error) => console.error("Error al cargar productos:", error));
}, []);


  return (
    <AuthProvider>
      <CarritoProvider>
        <div className="layout">
          <Navbar />{/* 👈 Ya no recibe carrito por props */}
          <main className="main-content">
            <AnimatePresence mode="wait">
              <Routes location={location} key={location.pathname}>
                {/* Catálogo */}
                <Route
                  path="/"
                  element={
                    <MotionDiv
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Productos productos={productos} />{/* 👈 Usa contexto para agregar al carrito */}
                    </MotionDiv>
                  }
                />

                {/* Contacto */}
                <Route
                  path="/contacto"
                  element={
                    <MotionDiv
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Contacto />
                    </MotionDiv>
                  }
                />

                {/* Carrito (ruta protegida: requiere login) */}
                <Route
                  path="/carrito"
                  element={
                    <RutaProtegida>
                      <MotionDiv
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Carrito />{/* 👈 Usa contexto */}
                      </MotionDiv>
                    </RutaProtegida>
                  }
                />

                {/* Detalle de producto */}
                <Route
                  path="/producto/:id"
                  element={
                    <MotionDiv
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <DetalleProducto productos={productos} />{/* 👈 Usa contexto para agregar */}
                    </MotionDiv>
                  }
                />

                {/* Login */}
                <Route
                  path="/login"
                  element={
                    <MotionDiv
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Login />
                    </MotionDiv>
                  }
                />

                {/* Registro */}
                <Route
                  path="/register"
                  element={
                    <MotionDiv
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Register />
                    </MotionDiv>
                  }
                />

                {/* Admin CRUD (solo admin) */}
                <Route
                  path="/admin"
                  element={
                    <RutaProtegida role="admin">
                      <MotionDiv
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <AdminCrud />
                      </MotionDiv>
                    </RutaProtegida>
                  }
                />

                {/* Página 404 */}
                <Route
                  path="*"
                  element={
                    <h2 style={{ textAlign: "center" }}>Página no encontrada</h2>
                  }
                />
              </Routes>
            </AnimatePresence>
          </main>
          <Footer />
        </div>
      </CarritoProvider>
    </AuthProvider>
  );
}

export default App;
