import { createContext, useEffect, useState } from "react";
import {
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  signOut,
  createUserWithEmailAndPassword
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import Swal from "sweetalert2";
import { auth, db } from "../firebaseConfig";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // =========================================================
  // REGISTER EMAIL / PASSWORD
  // =========================================================
  const register = async (email, password) => {
    const res = await createUserWithEmailAndPassword(auth, email, password);

    // Guardar documento en Firestore con rol por defecto "user"
    await setDoc(doc(db, "usuarios", res.user.uid), {
      uid: res.user.uid,
      email: res.user.email,
      role: "user"
    });

    setUser(res.user);
    return res.user;
  };

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
        // Si no existe, lo creamos con rol "user"
        await setDoc(ref, {
          uid: googleUser.uid,
          email: googleUser.email,
          role: "user"
        });
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
  // AUTH STATE LISTENER
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
      value={{ user, loading, register, login, loginGoogle, logout, setUser }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};
