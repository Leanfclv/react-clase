import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { GoogleAuthProvider, FacebookAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../firebaseConfig";
import "./Register.css";

function Register() {
  const { register } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [strength, setStrength] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres.");
      return;
    }
    try {
      await register(email, password);
    } catch (err) {
      setError("Error al registrarse: " + err.message);
    }
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    setStrength(checkStrength(value));
  };

  const checkStrength = (pwd) => {
    if (!pwd) return 0; // vacío → sin barra
    let score = 1; // 👈 arranca en rojo apenas hay algo
    if (pwd.length >= 6) score++;
    if (/[A-Z]/.test(pwd)) score++;
    if (/[0-9]/.test(pwd)) score++;
    if (/[^A-Za-z0-9]/.test(pwd)) score++;
    return score; // valores de 0 a 5
  };

  const handleGoogleRegister = async () => {
    try {
      await signInWithPopup(auth, new GoogleAuthProvider());
    } catch (err) {
      setError("Error con Google: " + err.message);
    }
  };

  const handleFacebookRegister = async () => {
    try {
      await signInWithPopup(auth, new FacebookAuthProvider());
    } catch (err) {
      setError("Error con Facebook: " + err.message);
    }
  };

  return (
    <div className="register-container">
      <h2>Creá tu cuenta</h2>
      <p className="register-sub">Y empezá a comprar con envíos gratis</p>

      <form onSubmit={handleSubmit} className="register-form">
        <label htmlFor="email">Correo electrónico</label>
        <input
          id="email"
          type="email"
          placeholder="ejemplo@correo.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label htmlFor="password">Contraseña</label>
        <input
          id="password"
          type="password"
          placeholder="••••••"
          value={password}
          onChange={handlePasswordChange}
          required
        />

        {/* Barra de seguridad */}
        <div className={`password-strength strength-${strength}`}>
          <div></div>
        </div>

        {error && <p className="register-error">{error}</p>}

        <button type="submit" className="register-btn">Crear cuenta</button>
      </form>

      <div className="register-divider">o</div>

      <div className="register-social">
        <button onClick={handleGoogleRegister} className="register-social-btn">
          <img
            src="https://developers.google.com/identity/images/g-logo.png"
            alt="Google"
          />
          Registrarse con Google
        </button>

        <button onClick={handleFacebookRegister} className="register-social-btn">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/0/05/Facebook_Logo_%282019%29.png"
            alt="Facebook"
          />
          Registrarse con Facebook
        </button>
      </div>
    </div>
  );
}

export default Register;
