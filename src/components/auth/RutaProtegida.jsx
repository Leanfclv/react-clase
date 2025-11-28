import { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebaseConfig";

function RutaProtegida({ children, role }) {
  const { user } = useContext(AuthContext);
  const [allowed, setAllowed] = useState(null);

  useEffect(() => {
    const checkRole = async () => {
      if (user) {
        const ref = doc(db, "usuarios", user.uid);
        const snap = await getDoc(ref);
        if (snap.exists()) {
          const data = snap.data();
          // Si no se pide rol específico → cualquier usuario autenticado entra
          if (!role) {
            setAllowed(true);
          } else {
            setAllowed(data.role === role);
          }
        } else {
          setAllowed(false);
        }
      }
    };
    checkRole();
  }, [user, role]);

  // 🔹 Si no hay usuario → login
  if (!user) return <Navigate to="/login" replace />;

  // 🔹 Mientras se consulta Firestore → loading
  if (allowed === null) return <p>Cargando permisos...</p>;

  // 🔹 Si no tiene el rol → home
  if (!allowed) return <Navigate to="/" replace />;

  // 🔹 Si todo ok → renderiza children
  return children;
}

export default RutaProtegida;
