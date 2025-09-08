// src/pages/ForgotPassword.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/TextInput.css'; // ✅ Usa el diseño común
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
            {/* Registro Académico */}
            <div style={styles.inputGroup}>
              <label style={styles.label}>Registro Académico</label>
              <div className="group">
                <input
                  type="text"
                  placeholder="000000000"
                  value={registro}
                  onChange={(e) => setRegistro(e.target.value)}
                  className="input"
                  required
                />
              </div>
            </div>

            {/* Correo Electrónico */}
            <div style={styles.inputGroup}>
              <label style={styles.label}>Correo Electrónico</label>
              <div className="group">
                <input
                  type="email"
                  placeholder="correo@ingenieria.usac.edu.gt"
                  value={correo}
                  onChange={(e) => setCorreo(e.target.value)}
                  className="input"
                  required
                />
              </div>
            </div>

            <button type="submit" className="button-login">
              Verificar
            </button>
          </form>
        ) : (
          <form onSubmit={handleChangePassword}>
            {/* Nueva Contraseña */}
            <div style={styles.inputGroup}>
              <label style={styles.label}>Nueva Contraseña</label>
              <div className="group">
                <input
                  type="password"
                  placeholder="Nueva contraseña"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="input"
                  required
                />
              </div>
            </div>
            <button type="submit" className="button-login">
              Reestablecer
            </button>
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
    maxWidth: '400px',
    textAlign: 'center'
  },
  title: {
    textAlign: 'center',
    color: '#1b4332',
    fontSize: '28px',
    fontWeight: '700',
    marginBottom: '30px'
  },
  inputGroup: {
    marginBottom: '16px',
    textAlign: 'left'
  },
  label: {
    display: 'block',
    marginBottom: '6px',
    color: '#1b4332',
    fontWeight: '500',
    fontSize: '14px'
  },
  text: {
    marginTop: '20px',
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