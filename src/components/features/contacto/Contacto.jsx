import './Contacto.css';

function Contacto() {
  return (
    <div className="page-content contacto-form">
      <h1>Contacto</h1>
      <p>¿En qué podemos ayudarte?</p>
      <form className="formulario">
        <label htmlFor="nombre">Nombre</label>
        <input type="text" id="nombre" name="nombre" placeholder="Tu nombre" required />

        <label htmlFor="email">Email</label>
        <input type="email" id="email" name="email" placeholder="tu@email.com" required />

        <label htmlFor="mensaje">Mensaje</label>
        <textarea id="mensaje" name="mensaje" rows="5" placeholder="Escribí tu consulta..." required />

        <button type="submit">Enviar consulta</button>
      </form>
    </div>
  );
}

export default Contacto;
