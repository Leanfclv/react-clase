import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";

import "./index.css";

// IMPORTACIONES QUE FALTABAN
import { AuthProvider } from "./context/AuthContext.jsx";
import { CarritoProvider } from "./context/CarritoContext.jsx";
import { SearchProvider } from "./context/SearchContext.jsx";
import Navbar from "./components/layout/Navbar.jsx"; // Ajustá la ruta si es distinta

ReactDOM.createRoot(document.getElementById("root")).render(
<React.StrictMode>
  <BrowserRouter>
    <AuthProvider>
      <CarritoProvider>
        <SearchProvider>
          <App />
        </SearchProvider>
      </CarritoProvider>
    </AuthProvider>
  </BrowserRouter>
</React.StrictMode>

);
