import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
    });
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Iniciar Sesión</h2>
        <form onSubmit={handleSubmit}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Registro Académico</label>
            <input
              type="text"
              placeholder="000000000"
              value={carnet}
              onChange={(e) => setCarnet(e.target.value)}
              style={styles.input}
              required
            />
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Contraseña</label>
            <input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={styles.input}
              required
            />
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
    marginBottom: '16px'
  },
  label: {
    display: 'block',
    marginBottom: '6px',
    color: '#1b4332',
    fontWeight: '500'
  },
  input: {
    width: '100%',
    padding: '12px',
    border: '1px solid #40916c',
    borderRadius: '6px',
    boxSizing: 'border-box',
    fontSize: '14px'
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