// src/pages/MyProfile.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import api from '../services/api';

function MyProfile() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [cursosAprobados, setCursosAprobados] = useState([]);
  const [cursos, setCursos] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    nombres: '',
    apellidos: '',
    correo: ''
  });
  const [selectedCursoId, setSelectedCursoId] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        // ✅ Comenta esta validación temporalmente para ver el diseño
        // if (!token) {
        //   navigate('/');
        //   return;
        // }

        // 🔁 Descomenta estas líneas cuando el backend esté listo
        // const userRes = await api.get('/auth/profile');
        // const userData = userRes.data;
        // setUser(userData);
        // setFormData({
        //   nombres: userData.nombres || '',
        //   apellidos: userData.apellidos || '',
        //   correo: userData.correo || ''
        // });

        // Simulación temporal para ver el diseño
        setUser({ registro_academico: '202400023' });
        setFormData({
          nombres: 'Ana María',
          apellidos: 'López González',
          correo: 'ana@usac.edu.gt'
        });
        setCursosAprobados([
          { id: 1, codigo: 'CS101', nombre: 'Programación 1', creditos: 5 },
          { id: 2, codigo: 'MA101', nombre: 'Matemática Discreta', creditos: 4 }
        ]);
        setCursos([
          { id: 1, codigo: 'CS101', nombre: 'Programación 1', creditos: 5 },
          { id: 2, codigo: 'MA101', nombre: 'Matemática Discreta', creditos: 4 },
          { id: 3, codigo: 'CS102', nombre: 'Programación 2', creditos: 5 }
        ]);
      } catch (error) {
        console.error('Error al cargar datos:', error);
        // ✅ Comenta el alert para que no moleste en diseño
        // alert('Error al cargar el perfil.');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      // 🔁 Descomenta cuando el backend esté listo
      // const res = await api.put('/auth/profile', formData);
      // const updatedUser = { ...user, ...res.data };
      // setUser(updatedUser);
      // localStorage.setItem('user', JSON.stringify(updatedUser));
      setEditMode(false);
      alert('Perfil actualizado (simulado)');
    } catch (error) {
      alert('Error al actualizar: ' + (error.response?.data?.message || 'Intente de nuevo'));
    }
  };

  const handleAddCourse = async () => {
    if (!selectedCursoId) {
      alert('Selecciona un curso');
      return;
    }
    try {
      // 🔁 Descomenta cuando el backend esté listo
      // await api.post('/usuarios/cursos-aprobados', { curso_id: selectedCursoId });
      // const res = await api.get('/usuarios/cursos-aprobados');
      // setCursosAprobados(res.data);
      setSelectedCursoId('');
      alert('Curso agregado (simulado)');
    } catch (error) {
      alert('Error al agregar curso');
    }
  };

  const totalCreditos = cursosAprobados.reduce((sum, c) => sum + c.creditos, 0);

  if (loading) return <div style={styles.loading}>Cargando...</div>;

  return (
    <>
      <Header />
      <div style={styles.container}>
        <div style={styles.card}>
          <h2 style={styles.title}>Mi Perfil</h2>
          <div style={styles.info}><strong>Registro:</strong> {user?.registro_academico}</div>

          {editMode ? (
            <>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Nombres</label>
                <input name="nombres" value={formData.nombres} onChange={handleChange} style={styles.input} />
              </div>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Apellidos</label>
                <input name="apellidos" value={formData.apellidos} onChange={handleChange} style={styles.input} />
              </div>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Correo</label>
                <input name="correo" value={formData.correo} onChange={handleChange} style={styles.input} type="email" />
              </div>
              <button onClick={handleSave} style={styles.button}>Guardar</button>
              <button onClick={() => setEditMode(false)} style={{ ...styles.button, backgroundColor: '#95d5b2', marginLeft: '10px' }}>
                Cancelar
              </button>
            </>
          ) : (
            <>
              <div style={styles.info}><strong>Nombres:</strong> {formData.nombres}</div>
              <div style={styles.info}><strong>Apellidos:</strong> {formData.apellidos}</div>
              <div style={styles.info}><strong>Correo:</strong> {formData.correo}</div>
              <button onClick={() => setEditMode(true)} style={styles.button}>Editar Perfil</button>
            </>
          )}

          <div style={styles.section}>
            <h3 style={styles.sectionTitle}>Cursos Aprobados ({cursosAprobados.length})</h3>
            <div style={styles.cursosList}>
              {cursosAprobados.map((curso) => (
                <div key={curso.id} style={styles.cursoItem}>
                  <span><strong>{curso.codigo}</strong> - {curso.nombre}</span>
                  <span>{curso.creditos} créditos</span>
                </div>
              ))}
            </div>
            <div style={styles.totalCreditos}><strong>Total de créditos:</strong> {totalCreditos}</div>

            {/* ✅ Título con color consistente */}
            <div style={styles.addCourseForm}>
              <h4 style={styles.addCourseTitle}>Agregar Curso Aprobado</h4>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Selecciona un curso</label>
                <select value={selectedCursoId} onChange={(e) => setSelectedCursoId(e.target.value)} style={styles.select}>
                  <option value="">Selecciona un curso</option>
                  {cursos.map((curso) => (
                    <option key={curso.id} value={curso.id}>
                      {curso.codigo} - {curso.nombre} ({curso.creditos} créditos)
                    </option>
                  ))}
                </select>
              </div>
              <button onClick={handleAddCourse} style={styles.button}>Agregar Curso</button>
            </div>
          </div>

          <button onClick={() => navigate('/homepage')} style={{ ...styles.button, backgroundColor: '#2d6a4f', marginTop: '20px' }}>
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
  select: {
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
  },
  section: {
    marginTop: '30px',
    borderTop: '1px solid #95d5b2',
    paddingTop: '20px',
  },
  sectionTitle: {
    fontSize: '18px',
    color: '#2d6a4f',
    marginBottom: '15px',
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
  totalCreditos: {
    marginTop: '15px',
    fontSize: '16px',
    fontWeight: '600',
    color: '#2d6a4f',
  },
  addCourseForm: {
    marginTop: '20px',
    padding: '15px',
    backgroundColor: '#95d5b2',
    borderRadius: '8px',
  },
  // ✅ Estilo nuevo para el título
  addCourseTitle: {
    fontSize: '18px',
    color: '#2d6a4f',
    fontWeight: '600',
    marginBottom: '15px',
  },
  loading: {
    textAlign: 'center',
    color: '#2d6a4f',
    fontSize: '18px',
    marginTop: '50px'
  }
};

export default MyProfile;