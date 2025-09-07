// src/pages/Register.js
import React, { useState } from 'react';
import Axios from 'axios';

function Register() {
  const [carnet, setCarnet] = useState('');
  const [Nombres, setNombres] = useState('');
  const [Apellidos, setApellidos] = useState('');
  const [Correo, setCorreo] = useState('');
  const [Contrasena, setContrasena] = useState('');

  const add = (e) => {
    e.preventDefault();
    Axios.post('http://localhost:3001/create', {
      carnet: carnet,
      nombres: Nombres,
      apellidos: Apellidos,
      correo: Correo,
      contrasena: Contrasena
    })
    .then(() => {
      alert("Usuario registrado con éxito");
    })
    .catch((error) => {
      alert('Error: ' + (error.response?.data?.message || 'No se pudo registrar'));
      console.error('Error al insertar el usuario:', error);
    });
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Crear Cuenta</h2>
        <form onSubmit={add}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Registro Académico</label>
            <div className="textInputWrapper">
              <input
                name="carnet"
                type="text"
                placeholder="000000000"
                value={carnet}
                onChange={(e) => setCarnet(e.target.value)}
                className="textInput"
                required
              />
            </div>
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Nombres</label>
            <div className="textInputWrapper">
              <input
                name="nombres"
                type="text"
                placeholder="Ana María"
                value={Nombres}
                onChange={(e) => setNombres(e.target.value)}
                className="textInput"
                required
              />
            </div>
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Apellidos</label>
            <div className="textInputWrapper">
              <input
                name="apellidos"
                type="text"
                placeholder="López González"
                value={Apellidos}
                onChange={(e) => setApellidos(e.target.value)}
                className="textInput"
                required
              />
            </div>
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Correo Electrónico</label>
            <div className="textInputWrapper">
              <input
                name="correo"
                type="email"
                placeholder="correo@ingenieria.usac.edu.gt"
                value={Correo}
                onChange={(e) => setCorreo(e.target.value)}
                className="textInput"
                required
              />
            </div>
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Contraseña</label>
            <div className="textInputWrapper">
              <input
                name="contrasena"
                type="password"
                placeholder="Contraseña"
                value={Contrasena}
                onChange={(e) => setContrasena(e.target.value)}
                className="textInput"
                required
              />
            </div>
          </div>

          <button type="submit" style={styles.button}>Crear Cuenta</button>
        </form>

        <p style={styles.text}>
          ¿Ya tienes cuenta?{' '}
          <a href="/" style={styles.link}>Inicia sesión</a>
        </p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: '#d8f3dc',
    padding: '20px'
  },
  card: {
    backgroundColor: 'white',
    padding: '40px',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    width: '100%',
    maxWidth: '400px'
  },
  title: {
    textAlign: 'center',
    color: '#081c15',
    marginBottom: '20px',
    fontWeight: '600'
  },
  inputGroup: {
    marginBottom: '16px',
    textAlign: 'left'
  },
  label: {
    display: 'block',
    marginBottom: '6px',
    color: '#1b4332',
    fontWeight: '500'
  },
  button: {
    backgroundColor: '#1b4332',
    color: 'white',
    border: 'none',
    padding: '12px',
    width: '100%',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: '500',
    marginTop: '10px'
  },
  text: {
    marginTop: '16px',
    textAlign: 'center',
    color: '#081c15',
    fontSize: '14px'
  },
  link: {
    color: '#2d6a4f',
    textDecoration: 'none',
    fontWeight: '500'
  }
};

export default Register;