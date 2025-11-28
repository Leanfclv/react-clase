# 🛍️ MiTienda - Proyecto React
MiTienda es una aplicación web desarrollada con React que simula una tienda online completa. Incluye catálogo de productos, carrito de compras dinámico, panel de administración protegido, formulario de contacto y búsqueda global, todo con una experiencia profesional inspirada en plataformas reales de e‑commerce.

## 🚀 Tecnologías utilizadas
- React

- Vite

- React Router (ruteo)

- Firebase (autenticación y Firestore)

- MockAPI (gestión de productos)

- SweetAlert2 (alertas y modales)

- CSS tradicional y modular

- Íconos con react-icons

## 📦 Funcionalidades
- Catálogo de productos con tarjetas responsivas

- Búsqueda global de productos

- Vista de detalle con descripción, precio e imagen

- Carrito de compras con control de cantidades (+ y –)

- Panel de administración con CRUD de productos (title, price, image, description)

- Preview de imagen en vivo al agregar productos

- Autenticación de usuarios con Firebase (login, registro, social login)

- Navbar fija con saludo dinámico y contador de carrito

- Footer con enlaces y estilo profesional

## 🧑‍💻 Instalación local
### Clonar el proyecto
git clone https://github.com/Leanfclv/react-clase.git
cd react-clase

### Instalar dependencias de Node.js
npm install

### Instalar librería de alertas
npm install sweetalert2

### Instalar dependencia de Python para Firebase
pip install firebase

### Ejecutar en modo desarrollo
npm run dev

## 🔐 Acceso al panel de administración
- El panel de administración está protegido por roles en Firebase.

- Solo los usuarios con rol admin pueden acceder a /admin.

- Desde allí se pueden agregar productos con title, price, image y description, que se reflejan automáticamente en el catálogo principal.

## 📦 Dependencias instaladas
🔹 Python
- firebase Usada para la conexión con Firebase desde Python.
pip install firebase

🔹 JavaScript (Node.js)
- sweetalert2 Librería para mostrar alertas y modales modernos en la interfaz.
npm install sweetalert2

Este proyecto demuestra cómo integrar React + Firebase + MockAPI para construir un e‑commerce completo con autenticación, carrito dinámico y panel de administración profesional.