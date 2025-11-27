import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

function RutaProtegida({ children, role }) {
  const { user } = useContext(AuthContext);

  // Si no hay usuario → redirigir al login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Si la ruta requiere rol y el usuario no lo tiene
  if (role) {
    const isAdmin = user.email === "admin@gmail.com"; // 👉 Ajusta esto a tu admin real

    if (role === "admin" && !isAdmin) {
      return <Navigate to="/" replace />;
    }
  }

  return children;
}

export default RutaProtegida;
