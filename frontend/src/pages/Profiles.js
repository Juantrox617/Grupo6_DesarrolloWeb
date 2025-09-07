// src/pages/Profiles.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import api from '../services/api';

function Profiles() {
  const navigate = useNavigate();
  const [searchId, setSearchId] = useState('');
  const [profile, setProfile] = useState(null);
  const [cursosAprobados, setCursosAprobados] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    if (!searchId.trim()) {
      setError('Por favor ingresa un número de registro académico.');
      return;
    }

    setLoading(true);
    setError('');
    setProfile(null);
    setCursosAprobados([]);

    try {
      // Buscar usuario por registro académico
      const userRes = await api.get(`/usuarios/${searchId}`);
      setProfile(userRes.data);

      // Obtener cursos aprobados del usuario
      const cursosRes = await api.get(`/usuarios/${searchId}/cursos-aprobados`);
      setCursosAprobados(cursosRes.data);
    } catch (error) {
      console.error('Error al buscar perfil:', error);
      if (error.response?.status === 404) {
        setError('Usuario no encontrado.');
      } else {
        setError('Error al conectar con el servidor.');
      }
    } finally {
      setLoading(false);
    }
  };

  const totalCreditos = cursosAprobados.reduce((sum, curso) => sum + curso.creditos, 0);

  return (
    <>
      <Header />
      <div style={styles.container}>
        <div style={styles.card}>
          <h2 style={styles.title}>Buscar Perfil</h2>

          {/* Campo de búsqueda */}
          <div style={styles.searchGroup}>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Buscar por Registro Académico</label>
              <div className="textInputWrapper" style={{ width: '100%' }}>
                <input
                  placeholder="Ej: 202400023"
                  value={searchId}
                  onChange={(e) => setSearchId(e.target.value)}
                  className="textInput"
                  disabled={loading}
                />
              </div>
            </div>

            <button onClick={handleSearch} style={styles.button} disabled={loading}>
              {loading ? 'Buscando...' : 'Buscar'}
            </button>
          </div>

          {/* Mensaje de error */}
          {error && <p style={styles.error}>{error}</p>}

          {/* Resultado del perfil */}
          {profile && (
            <div style={styles.profileSection}>
              <h3 style={styles.sectionTitle}>
                Perfil de {profile.nombres} {profile.apellidos}
              </h3>

              <div style={styles.info}>
                <strong>Registro Académico:</strong> {profile.registro_academico}
              </div>
              <div style={styles.info}>
                <strong>Correo:</strong> {profile.correo}
              </div>

              <div style={styles.section}>
                <h4>Cursos Aprobados ({cursosAprobados.length})</h4>
                <div style={styles.cursosList}>
                  {cursosAprobados.length > 0 ? (
                    cursosAprobados.map((curso) => (
                      <div key={curso.id} style={styles.cursoItem}>
                        <span>
                          <strong>{curso.codigo}</strong> - {curso.nombre}
                        </span>
                        <span>{curso.creditos} créditos</span>
                      </div>
                    ))
                  ) : (
                    <p style={styles.noCursos}>No tiene cursos aprobados registrados.</p>
                  )}
                </div>
                <div style={styles.totalCreditos}>
                  <strong>Total de créditos:</strong> {totalCreditos}
                </div>
              </div>
            </div>
          )}

          {/* Botón volver */}
          <button
            onClick={() => navigate('/homepage')}
            style={{ ...styles.button, backgroundColor: '#2d6a4f', marginTop: '20px' }}
          >
            ← Volver
          </button>
        </div>
      </div>
    </>
  );
}

const styles = {
  container: {
    minHeight: 'calc(100vh - 80px)',
    backgroundColor: '#d8f3dc',
    padding: '40px 20px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'start',
    margin: 0,
  },
  card: {
    backgroundColor: 'white',
    padding: '40px',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    width: '100%',
    maxWidth: '700px',
    border: '1px solid #95d5b2',
  },
  title: {
    textAlign: 'center',
    color: '#2d6a4f',
    fontSize: '24px',
    fontWeight: '600',
    marginBottom: '20px',
  },
  searchGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    marginBottom: '20px',
  },
  inputGroup: {
    marginBottom: '10px',
  },
  label: {
    display: 'block',
    color: '#40916c',
    fontSize: '15px',
    fontWeight: '500',
    marginBottom: '6px',
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
  error: {
    color: '#d32f2f',
    fontSize: '14px',
    textAlign: 'center',
    marginBottom: '10px',
    fontWeight: '500',
  },
  profileSection: {
    marginTop: '20px',
    padding: '20px',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    border: '1px solid #eee',
  },
  sectionTitle: {
    fontSize: '18px',
    color: '#2d6a4f',
    marginBottom: '15px',
  },
  info: {
    fontSize: '16px',
    color: '#2d6a4f',
    marginBottom: '10px',
  },
  section: {
    marginTop: '20px',
  },
  cursosList: {
    maxHeight: '200px',
    overflowY: 'auto',
    border: '1px solid #eee',
    borderRadius: '6px',
    padding: '10px',
    backgroundColor: '#f9f9f9',
  },
  cursoItem: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '8px 0',
    borderBottom: '1px solid #eee',
    fontSize: '14px',
    color: '#2d6a4f',
  },
  noCursos: {
    color: '#666',
    fontStyle: 'italic',
    textAlign: 'center',
    padding: '10px',
  },
  totalCreditos: {
    marginTop: '15px',
    fontSize: '16px',
    fontWeight: '600',
    color: '#2d6a4f',
  },
};

export default Profiles;