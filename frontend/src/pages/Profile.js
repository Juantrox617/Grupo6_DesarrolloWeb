// src/pages/Profile.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Profile() {
  const navigate = useNavigate();
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    nombres: 'Ana María',
    apellidos: 'López González',
    correo: 'ana@usac.edu.gt'
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    setEditMode(false);
    alert('Perfil actualizado (simulado)');
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Perfil de Usuario</h2>
        <div style={styles.info}>
          <strong>Registro Académico:</strong> 202400023
        </div>
        {editMode ? (
          <>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Nombres</label>
              <input
                name="nombres"
                value={formData.nombres}
                onChange={handleChange}
                style={styles.input}
              />
            </div>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Apellidos</label>
              <input
                name="apellidos"
                value={formData.apellidos}
                onChange={handleChange}
                style={styles.input}
              />
            </div>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Correo</label>
              <input
                name="correo"
                value={formData.correo}
                onChange={handleChange}
                style={styles.input}
              />
            </div>
            <button onClick={handleSave} style={styles.button}>Guardar</button>
            <button
              onClick={() => setEditMode(false)}
              style={{ ...styles.button, backgroundColor: '#95d5b2', marginLeft: '10px' }}
            >
              Cancelar
            </button>
          </>
        ) : (
          <>
            <div style={styles.info}><strong>Nombres:</strong> {formData.nombres}</div>
            <div style={styles.info}><strong>Apellidos:</strong> {formData.apellidos}</div>
            <div style={styles.info}><strong>Correo:</strong> {formData.correo}</div>
            <button onClick={() => setEditMode(true)} style={styles.button}>
              Editar Perfil
            </button>
          </>
        )}
        <button
          onClick={() => navigate('/homepage')}
          style={{ ...styles.button, backgroundColor: '#2d6a4f', marginTop: '20px' }}
        >
          ← Volver
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#d8f3dc', // Fondo claro verde (mismo que HomePage)
    padding: '20px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 0,
  },
  card: {
    backgroundColor: 'white',
    padding: '40px',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    width: '100%',
    maxWidth: '500px',
    border: '1px solid #95d5b2',
  },
  title: {
    textAlign: 'center',
    color: '#2d6a4f',
    fontSize: '24px',
    fontWeight: '600',
    marginBottom: '20px',
  },
  info: {
    fontSize: '16px',
    color: '#2d6a4f',
    marginBottom: '15px',
  },
  inputGroup: {
    marginBottom: '16px',
  },
  label: {
    display: 'block',
    color: '#40916c',
    fontSize: '15px',
    fontWeight: '500',
    marginBottom: '6px',
  },
  input: {
    width: '100%',
    padding: '10px',
    border: '1px solid #74c69d',
    borderRadius: '6px',
    boxSizing: 'border-box',
    fontSize: '14px',
    backgroundColor: 'white',
    color: '#2d6a4f',
  },
  button: {
    backgroundColor: '#40916c',
    color: 'white',
    border: 'none',
    padding: '10px 16px',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '500',
    transition: 'background-color 0.3s',
  },
};

export default Profile;