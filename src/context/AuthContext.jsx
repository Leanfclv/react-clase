import { createContext, useEffect, useState } from "react";
import {
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  signOut
} from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import Swal from "sweetalert2";
import { auth, db } from "../firebaseConfig";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // =========================================================
  // LOGIN EMAIL / PASSWORD
  // =========================================================
  const login = async (email, password) => {
    const res = await signInWithEmailAndPassword(auth, email, password);

    const ref = doc(db, "usuarios", res.user.uid);
    const snap = await getDoc(ref);

    if (!snap.exists()) {
      await signOut(auth);
      throw new Error("Usuario no existe en Firestore");
    }

    setUser(res.user);
    return res.user;
  };

  // =========================================================
  // LOGIN GOOGLE
  // =========================================================
  const loginGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);

      const googleUser = result.user;

      const ref = doc(db, "usuarios", googleUser.uid);
      const snap = await getDoc(ref);

      if (!snap.exists()) {
        await signOut(auth);
        Swal.fire(
          "Cuenta no registrada",
          "Este correo no está autorizado",
          "warning"
        );
        return { ok: false };
      }

      setUser(googleUser);
      Swal.fire("Bienvenido", googleUser.displayName, "success");
      return { ok: true };

    } catch (e) {
      Swal.fire("Error", "No se pudo iniciar sesión", "error");
      return { ok: false };
    }
  };

  // =========================================================
  // LOGOUT
  // =========================================================
  const logout = async () => {
    await signOut(auth);
    setUser(null);
  };

  // =========================================================
  // AUTH STATE LISTENER (sin navegación)
  // =========================================================
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setLoading(false);
    });

    return () => unsub();
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, loading, login, loginGoogle, logout, setUser }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};
