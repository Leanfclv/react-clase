import { useContext } from "react";
import { SearchContext } from "../../context/SearchContext";

function Busqueda({ productos }) {
  const { query } = useContext(SearchContext);

  const resultados = productos.filter(p =>
    p.title.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div style={{ padding: "20px" }}>
      <h2>Resultados para: "{query}"</h2>

      {resultados.length === 0 ? (
        <p>No se encontraron productos.</p>
      ) : (
        <div className="productos-grid">
          {resultados.map(prod => (
            <div key={prod.id} className="producto-card">
              <img src={prod.image} alt={prod.title} />
              <h3>{prod.title}</h3>
              <p>${prod.price}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Busqueda;
