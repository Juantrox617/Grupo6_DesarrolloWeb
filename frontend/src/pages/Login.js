// src/pages/Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/Kursum-Logo-login.png';
import axios from 'axios';

function Login() {
  const [carnet, setCarnet] = useState(''); 
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post('http://localhost:3001/login', {
      carnet: carnet,
      contrasena: password
    })
    .then((response) => {
      console.log('Inicio de sesión exitoso');
      console.log('Respuesta del servidor:', response.data);
      alert('Inicio de sesión exitoso');
      navigate('/homepage');
    })
    .catch((error) => {
      console.error('Error al iniciar sesión:', error);
      alert('Credenciales incorrectas');
    });
  };

  return (
    <div style={styles.container}>
      {/* Logo arriba del cuadro de login, fuera del recuadro */}
      <img src={logo} alt="Logo Kursum" style={styles.logoOutside} />

      {/* Cuadro de login */}
      <div style={styles.card}>
        <h2 style={styles.title}>Iniciar Sesión</h2>
        <form onSubmit={handleSubmit}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Registro Académico</label>
            <div className="textInputWrapper">
              <input
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
            <label style={styles.label}>Contraseña</label>
            <div className="textInputWrapper">
              <input
                type="password"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="textInput"
                required
              />
            </div>
          </div>

          <button type="submit" style={styles.button}>Iniciar Sesión</button>
        </form>

        <p style={styles.text}>
          ¿No tienes cuenta?{' '}
          <a href="/register" style={styles.link}>Regístrate</a>
        </p>
        <p style={styles.text}>
          <a href="/forgot-password" style={styles.link}>¿Olvidaste tu contraseña?</a>
        </p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: '#d8f3dc',
    padding: '40px 20px 20px 20px'
  },
  logoOutside: {
    width: '250px',
    marginBottom: '30px',
    marginTop: '40px'
  },
  card: {
    backgroundColor: 'white',
    padding: '40px',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    width: '100%',
    maxWidth: '400px',
    textAlign: 'center'
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

export default Login;