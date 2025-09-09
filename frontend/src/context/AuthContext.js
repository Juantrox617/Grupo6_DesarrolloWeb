// src/context/AuthContext.js
import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [usuarioLogueado, setUsuarioLogueado] = useState(null);

  const iniciarSesion = (usuario) => {
    setUsuarioLogueado(usuario);
    // Opcional: Guardar en localStorage para persistencia entre recargas
    localStorage.setItem('usuarioLogueado', JSON.stringify(usuario));
  };

  const cerrarSesion = () => {
    setUsuarioLogueado(null);
    localStorage.removeItem('usuarioLogueado');
  };

  // Cargar desde localStorage al iniciar la app (opcional, para persistencia)
  React.useEffect(() => {
    const usuarioGuardado = localStorage.getItem('usuarioLogueado');
    if (usuarioGuardado) {
      setUsuarioLogueado(JSON.parse(usuarioGuardado));
    }
  }, []);

  return (
    <AuthContext.Provider value={{ usuarioLogueado, iniciarSesion, cerrarSesion }}>
      {children}
    </AuthContext.Provider>
  );
};