import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({ nombres: '', apellidos: '', correo: '' });

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/');
      return;
    }

    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUser(storedUser);
      setFormData({
        nombres: storedUser.nombres || '',
        apellidos: storedUser.apellidos || '',
        correo: storedUser.correo || ''
      });
    }
  }, [navigate]);

  const handleEdit = () => setEditMode(true);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      const res = await api.put('/auth/profile', formData);
      const updatedUser = { ...user, ...res.data };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
      setEditMode(false);
      alert('Perfil actualizado');
    } catch (error) {
      alert('Error al actualizar perfil');
    }
  };

  if (!user) return <div>Cargando...</div>;

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Perfil de Usuario</h2>
        <div style={styles.info}>
          <strong>Registro Académico:</strong> {user.registro_academico || user.registro}
        </div>
        {editMode ? (
          <>
            <div style={styles.inputGroup}>
              <label>Nombres</label>
              <input
                name="nombres"
                value={formData.nombres}
                onChange={handleChange}
                style={styles.input}
              />
            </div>
            <div style={styles.inputGroup}>
              <label>Apellidos</label>
              <input
                name="apellidos"
                value={formData.apellidos}
                onChange={handleChange}
                style={styles.input}
              />
            </div>
            <div style={styles.inputGroup}>
              <label>Correo</label>
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
              style={{ ...styles.button, backgroundColor: '#40916c', marginLeft: '10px' }}
            >
              Cancelar
            </button>
          </>
        ) : (
          <>
            <div style={styles.info}><strong>Nombres:</strong> {formData.nombres}</div>
            <div style={styles.info}><strong>Apellidos:</strong> {formData.apellidos}</div>
            <div style={styles.info}><strong>Correo:</strong> {formData.correo}</div>
            <button onClick={handleEdit} style={styles.button}>
              Editar Perfil
            </button>
          </>
        )}
        <button
          onClick={() => navigate('/home')}
          style={{ ...styles.button, backgroundColor: '#081c15', marginTop: '20px' }}
        >
          ← Volver
        </button>
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
    maxWidth: '500px'
  },
  title: {
    textAlign: 'center',
    color: '#081c15',
    marginBottom: '20px',
    fontWeight: '600'
  },
  info: {
    marginBottom: '15px',
    fontSize: '16px',
    color: '#081c15'
  },
  inputGroup: {
    marginBottom: '16px'
  },
  input: {
    width: '100%',
    padding: '10px',
    border: '1px solid #40916c',
    borderRadius: '6px',
    fontSize: '14px'
  },
  button: {
    backgroundColor: '#1b4332',
    color: 'white',
    border: 'none',
    padding: '10px 16px',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '14px'
  }
};

export default Profile;