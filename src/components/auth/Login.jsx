import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

import { auth } from "../../firebaseConfig";
import { sendPasswordResetEmail } from "firebase/auth";

import Swal from "sweetalert2";
import "./Login.css";

function Login() {
  const { login, loginGoogle } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate("/");
    } catch (error) {
      Swal.fire("Error", "Email o contraseña incorrectos", "error");
    }
  };

  const handleGoogleLogin = async () => {
    const res = await loginGoogle();
    if (res.ok) {
      navigate("/");
    }
  };

  const handleForgotPassword = async () => {
    if (!email) {
      Swal.fire("Atención", "Por favor ingresa tu email primero", "warning");
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      Swal.fire(
        "Correo enviado",
        "Revisa tu bandeja de entrada para cambiar la contraseña",
        "success"
      );
    } catch (error) {
      console.error("Error al enviar reset:", error);
      Swal.fire("Error", "No se pudo enviar el correo", "error");
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2 className="login-title">Iniciar sesión</h2>

        <label className="login-label">Email</label>
        <input
          type="email"
          className="login-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label className="login-label">Contraseña</label>
        <input
          type="password"
          className="login-input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit" className="login-btn">Entrar</button>

        <div className="forgot-password">
          <button type="button" onClick={handleForgotPassword} className="forgot-btn">
            Olvidé mi contraseña
          </button>
        </div>

        {/* 🔹 Separador visual */}
        <div className="separator">
          <span className="line" />
          <span className="or-text">o</span>
          <span className="line" />
        </div>

        {/* 🔹 Botón de Google */}
        <div className="social-login">
          <button
            type="button"
            onClick={handleGoogleLogin}
            className="social-btn google"
          >
            <img src="https://developers.google.com/identity/images/g-logo.png" alt="Google" className="social-icon" />
            Iniciar con Google
          </button>
        </div>

        {/* 🔹 Botón de registro */}
        <div className="register-link">
          <span>¿No tienes cuenta?</span>
          <button
            type="button"
            className="register-btn"
            onClick={() => navigate("/register")}
          >
            Registrarse
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;
