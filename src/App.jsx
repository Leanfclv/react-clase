import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

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

import { AuthProvider } from "./context/AuthContext";
import { CarritoProvider } from "./context/CarritoContext";
import { SearchProvider } from "./context/SearchContext";

import "./App.css";

const MotionDiv = motion.create("div");

function App() {
  const [productos, setProductos] = useState([]);
  const location = useLocation();

  // Fetch de productos desde MockAPI
  useEffect(() => {
    fetch("https://69275fed26e7e41498fe04b6.mockapi.io/productos")
      .then((res) => res.json())
      .then((data) => setProductos(data))
      .catch((error) => console.error("Error al cargar productos:", error));
  }, []);

  return (
    <AuthProvider>
      <CarritoProvider>
        <SearchProvider>
          <div className="layout">
            <Navbar />
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
                        <Productos productos={productos} />
                      </MotionDiv>
                    }
                  />

                  {/* 🔎 Página de búsqueda */}
                  <Route
                    path="/busqueda"
                    element={
                      <MotionDiv
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Productos productos={productos} />
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

                  {/* Carrito */}
                  <Route
                    path="/carrito"
                    element={
                      <MotionDiv
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Carrito />
                      </MotionDiv>
                    }
                  />

                  {/* Detalle producto */}
                  <Route
                    path="/producto/:id"
                    element={
                      <MotionDiv
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <DetalleProducto productos={productos} />
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

                  {/* Register */}
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

                  {/* Admin */}
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

                  {/* 404 */}
                  <Route
                    path="*"
                    element={
                      <h2 style={{ textAlign: "center" }}>
                        Página no encontrada
                      </h2>
                    }
                  />
                </Routes>
              </AnimatePresence>
            </main>

            <Footer />
          </div>
        </SearchProvider>
      </CarritoProvider>
    </AuthProvider>
  );
}

export default App;
