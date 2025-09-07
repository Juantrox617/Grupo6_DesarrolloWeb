// src/pages/ForgotPassword.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

function ForgotPassword() {
  const [registro, setRegistro] = useState('');
  const [correo, setCorreo] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [step, setStep] = useState(1);
  const navigate = useNavigate();

  const handleVerify = async (e) => {
    e.preventDefault();
    try {
      await api.post('/auth/forgot-password', { registro_academico: registro, correo });
      setStep(2);
    } catch (error) {
      alert('Registro o correo incorrectos');
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    try {
      await api.put('/auth/reset-password', { registro_academico: registro, new_password: newPassword });
      alert('Contraseña actualizada');
      navigate('/');
    } catch (error) {
      alert('Error al actualizar la contraseña');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Recuperar Contraseña</h2>
        {step === 1 ? (
          <form onSubmit={handleVerify}>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Registro Académico</label>
              <div className="textInputWrapper">
                <input
                  type="text"
                  placeholder="000000000"
                  value={registro}
                  onChange={(e) => setRegistro(e.target.value)}
                  className="textInput"
                  required
                />
              </div>
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>Correo Electrónico</label>
              <div className="textInputWrapper">
                <input
                  type="email"
                  placeholder="correo@ingenieria.usac.edu.gt"
                  value={correo}
                  onChange={(e) => setCorreo(e.target.value)}
                  className="textInput"
                  required
                />
              </div>
            </div>

            <button type="submit" style={styles.button}>Verificar</button>
          </form>
        ) : (
          <form onSubmit={handleChangePassword}>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Nueva Contraseña</label>
              <div className="textInputWrapper">
                <input
                  type="password"
                  placeholder="Nueva contraseña"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="textInput"
                  required
                />
              </div>
            </div>
            <button type="submit" style={styles.button}>Reestablecer</button>
          </form>
        )}
        <p style={styles.text}>
          <a href="/" style={styles.link}>← Volver al inicio</a>
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

export default ForgotPassword;