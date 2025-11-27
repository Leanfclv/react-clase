import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDSk2EyFxl3qyHRNduaZAjU_6fS6EGoEjE",
  authDomain: "ecommerce-react-54538.firebaseapp.com",
  projectId: "ecommerce-react-54538",
  storageBucket: "ecommerce-react-54538.firebasestorage.app",
  messagingSenderId: "1018636373260",
  appId: "1:1018636373260:web:f4ada55c89f432de5c0d29",
  measurementId: "G-Y96S1YJ0YC"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);