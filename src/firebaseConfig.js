import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "TU_API_KEY",
  authDomain: "ecommerce-react-54538.firebaseapp.com",
  projectId: "ecommerce-react-54538",
  storageBucket: "ecommerce-react-54538.appspot.com",
  messagingSenderId: "1018636373260",
  appId: "1:1018636373260:web:f4ada55c89f432de5c0d29",
  measurementId: "G-Y96S1YJ0YC"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);