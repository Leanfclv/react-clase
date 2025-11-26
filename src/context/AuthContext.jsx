import { createContext, useState } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null); // null = no logueado

  const login = (username, password) => {
    // Simulación: usuario admin
    if (username === "admin" && password === "1234") {
      setUser({ username, role: "admin" });
    } else {
      setUser({ username, role: "user" });
    }
  };

  const logout = () => setUser(null);

  const register = (username, password) => {
    // Simulación de registro (en real sería con backend)
    setUser({ username, role: "user" });
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
}
