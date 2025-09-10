// src/pages/ForgotPassword.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/TextInput.css'; // ✅ Usa el diseño común
import api from '../services/api';

function ForgotPassword() {
  const [registro, setRegistro] = useState('');
  const [correo, setCorreo] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [step, setStep] = useState(1);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  /// Verificar registro y correo. 
  const handleVerify = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    
    try {
      await api.post('/auth/forgot-password', { registro_academico: registro, correo });
      setStep(2);
    } catch (error) {
      setError('Registro o correo electronico incorrectos.');
    }
  };

  /// Cambiar contraseña
  const handleChangePassword = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    //validar que las contraseñas coincidan. 
    if (newPassword !== confirmPassword) {
      setError('Las contraseñas no coinciden.');
      return;
    }
    //validar longitud minima
    if (newPassword.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres.');
      return;
    }

    try {
      await api.put('/auth/reset-password', { 
        registro_academico: registro, 
        new_password: newPassword 
      });
      setSuccess('Contraseña actualizada con éxito. Redirigiendo al inicio de sesión...');
      setTimeout(() => {
        navigate('/');
      }, 3000);
    } catch (error) {
      setError('Error al actualizar la contraseña, Intentelo de nuevo.');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>
          {step === 1 ? 'Recuperar Contraseña' : 'Nueva Contraseña'}
        </h2>
        {/*Mostrar mensajes de error o éxito */}
        {error && <div style={styles.errorMessage}>{error}</div>}  
        {success && <div style={styles.succesMessage}>{success}</div>}

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
            {/*confirmar contraseña */}
            <div style={styles.inputGroup}>
              <label style={styles.label}>Confirmar contraseña</label>
              <div className='group'>
                <input
                  type="password"
                  placeholder='confirmar contraseña'
                  value={confirmPassword}
                  onChange={(e)=> setConfirmPassword(e.target.value)}
                  className="input"
                  required
                  />
              </div>
            </div>

            <button type="submit" className="button-login">
              Reestablecer Contraseña
            </button>
          </form>
        )}

        <p style={styles.text}>
          <a href="/" style={styles.link}>← Volver al inicio de sesión</a>
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