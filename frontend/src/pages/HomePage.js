// src/pages/HomePage.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/Kursum-homepage.png';
import '../styles/TextInput.css';

const HomePage = () => {
  const navigate = useNavigate();
  const [publicaciones, setPublicaciones] = useState([]);
  const [catedraticos, setCatedraticos] = useState([]);
  const [cursos, setCursos] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/catedraticos')
      .then(response => response.json())
      .then(data => {
        console.log('Catedráticos obtenidos:', data);
        setCatedraticos(data);
      })
      .catch(error => console.error('Error al obtener los catedráticos:', error));
  }, []);

  useEffect(() => {
    fetch('http://localhost:3001/cursos')
      .then(response => response.json())
      .then(data => {
        console.log('Cursos obtenidos:', data);
        setCursos(data);
      })
      .catch(error => console.error('Error al obtener los cursos:', error));
  }, []);

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <img src={logo} alt="Logo Kursum" style={{ width: '250px' }} />
        <nav style={styles.nav}>
          <a href="/homepage" style={styles.navLink}>Inicio</a>
          <a
            href="/my-profile"
            onClick={(e) => { e.preventDefault(); navigate('/my-profile'); }}
            style={styles.navLink}
          >
            Mi perfil
          </a>
          <a
            href="/profiles"
            onClick={(e) => { e.preventDefault(); navigate('/profiles'); }}
            style={styles.navLink}
          >
            Perfiles
          </a>
          <button
            onClick={() => {
              localStorage.removeItem('token');
              localStorage.removeItem('user');
              navigate('/');
            }}
            style={styles.logoutButton}
          >
            Cerrar sesión
          </button>
        </nav>
      </header>

      <div style={styles.main}>
        <aside style={styles.sidebar}>
          <h2 style={styles.sidebarTitle}> Filtros</h2>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Por Curso</label>
            <select style={styles.select}>
              <option value="">Selecciona un curso</option>
              {cursos.map((curso) => (
                <option key={curso.id} value={curso.id}>
                  {curso.nombre}
                </option>
              ))}
            </select>
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Por Catedrático</label>
            <select style={styles.select}>
              <option value="">Selecciona un catedrático</option>
              {catedraticos.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.nombre}
                </option>
              ))}
            </select>
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Buscar por nombre</label>
            <div className="textInputWrapper">
              <input placeholder="Buscar por nombre..." type="text" className="textInput" />
            </div>
          </div>

          <button style={styles.filterButton}>Aplicar filtros</button>
        </aside>

        <main style={styles.feed}>
          <div style={styles.createPostContainer}>
            <button
              onClick={() => navigate('/crear-publicacion')}
              style={styles.createPostButton}
            >
              + Crear publicación
            </button>
          </div>

          <div style={styles.postList}>
            {publicaciones.length > 0 ? (
              publicaciones.map((post) => (
                <div key={post.id} style={styles.postCard}>
                  <p style={styles.postText}>
                    <em>{post.mensaje}</em>
                  </p>
                  <div style={styles.postFooter}>
                    <span style={styles.postUser}>Usuario: @{post.usuario?.nombres || 'Usuario'}</span>
                    <span style={styles.postDate}>Fecha: {new Date(post.fecha_creacion).toLocaleDateString()}</span>
                  </div>
                </div>
              ))
            ) : (
              <p style={styles.noPosts}>No hay publicaciones aún. Sé el primero en crear una.</p>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

const styles = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#d8f3dc',
    fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif',
    margin: 0,
    padding: 0,
  },
  header: {
    backgroundColor: '#2d6a4f',
    color: 'white',
    height: '80px',
    padding: '16px 40px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0 40px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  },
  logo: {
    fontSize: '28px',
    fontWeight: 'bold',
    color: '#95d5b2',
  },
  nav: {
    display: 'flex',
    gap: '24px',
    alignItems: 'center',
  },
  navLink: {
    color: '#95d5b2',
    textDecoration: 'none',
    fontSize: '18px',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'color 0.3s'
  },
  logoutButton: {
    backgroundColor: '#40916c',
    color: 'white',
    border: 'none',
    padding: '8px 16px',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: '500',
    fontSize: '16px',
    transition: 'background-color 0.3s'
  },
  main: {
    display: 'flex',
    padding: '20px 40px',
    gap: '30px',
    marginTop: '20px',
  },
  sidebar: {
    width: '280px',
    backgroundColor: '#c3e7d3ff',
    color: '#2d6a4f',
    padding: '24px 16px',
    minHeight: 'calc(100vh - 80px)',
    borderRadius: '0px',
    boxShadow: 'none',
    position: 'fixed',
    top: '80px',
    left: 0,
  },
  sidebarTitle: {
    fontSize: '22px',
    fontWeight: '600',
    marginBottom: '20px',
    color: '#2d6a4f',
  },
  inputGroup: {
    marginBottom: '20px',
  },
  label: {
    display: 'block',
    color: '#2d6a4f',
    fontSize: '15px',
    fontWeight: '500',
    marginBottom: '8px',
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
    border: '1px solid #ffffffff',
    borderRadius: '6px',
    backgroundColor: 'white',
    color: '#2d6a4f',
    fontSize: '14px',
  },
  filterButton: {
    width: '100%',
    backgroundColor: '#40916c',
    color: 'white',
    border: 'none',
    padding: '10px',
    borderRadius: '20px',
    cursor: 'pointer',
    fontWeight: '600',
    fontSize: '14px',
    marginTop: '10px',
    transition: 'background-color 0.3s'
  },
  feed: {
    flex: 1,
    marginLeft: '280px',
    padding: '20px',
    maxWidth: '800px',
  },
  createPostContainer: {
    marginBottom: '24px',
  },
  createPostButton: {
    backgroundColor: '#40916c',
    color: 'white',
    border: 'none',
    padding: '12px 20px',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: '600',
    fontSize: '16px',
    boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
    transition: 'background-color 0.3s'
  },
  postList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  postCard: {
    backgroundColor: 'white',
    padding: '24px',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
    color: '#2d6a4f',
    border: '1px solid #eee',
  },
  postText: {
    fontSize: '15px',
    color: '#2d6a4f',
    lineHeight: '1.5',
    margin: 0,
  },
  postFooter: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '12px',
    fontSize: '13px',
    color: '#666',
    fontWeight: '500',
  },
  noPosts: {
    textAlign: 'center',
    color: '#40916c',
    fontStyle: 'italic',
    padding: '20px',
    backgroundColor: '#95d5b2',
    borderRadius: '8px',
  }
};

export default HomePage;