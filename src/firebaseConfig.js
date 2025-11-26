// src/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; // 👈 para login/registro

// Configuración de tu proyecto Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDSk2EyFxl3qyHRNduaZAjU_6fS6EGoEjE",
  authDomain: "ecommerce-react-54538.firebaseapp.com",
  projectId: "ecommerce-react-54538",
  storageBucket: "ecommerce-react-54538.appspot.com", // 👈 ojo: debería terminar en .appspot.com
  messagingSenderId: "1018636373260",
  appId: "1:1018636373260:web:f4ada55c89f432de5c0d29",
  measurementId: "G-Y96S1YJ0YC"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Exportar auth para usar en tu AuthContext
export const auth = getAuth(app);
