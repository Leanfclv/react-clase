import { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Productos from './components/features/productos/Productos';
import Contacto from './components/features/contacto/Contacto';
import Carrito from './components/features/carrito/Carrito';
import DetalleProducto from './components/features/detalle/DetalleProducto';

import { CarritoProvider } from './context/CarritoContext'; // 👈 Importamos el provider
import './App.css';

const MotionDiv = motion.create('div');

function App() {
  const [productos, setProductos] = useState([]);
  const location = useLocation();

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then(res => res.json())
      .then(data => setProductos(data))
      .catch(error => console.error('Error al cargar productos:', error));
  }, []);

  return (
    <CarritoProvider>
      <div className="layout">
        <Navbar /> {/* 👈 Ya no recibe carrito por props */}
        <main className="main-content">
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route
                path="/"
                element={
                  <MotionDiv
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Productos productos={productos} /> {/* 👈 Usa contexto para agregar al carrito */}
                  </MotionDiv>
                }
              />
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
              <Route
                path="/carrito"
                element={
                  <MotionDiv
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Carrito /> {/* 👈 Usa contexto */}
                  </MotionDiv>
                }
              />
              <Route
                path="/producto/:id"
                element={
                  <MotionDiv
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <DetalleProducto productos={productos} /> {/* 👈 Usa contexto para agregar */}
                  </MotionDiv>
                }
              />
              {/* Página 404 */}
              <Route
                path="*"
                element={<h2 style={{ textAlign: 'center' }}>Página no encontrada</h2>}
              />
            </Routes>
          </AnimatePresence>
        </main>
        <Footer />
      </div>
    </CarritoProvider>
  );
}

export default App;
