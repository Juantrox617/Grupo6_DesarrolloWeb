// src/pages/HomePage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/Kursum-homepage.png';
import '../styles/TextInput.css';


const HomePage = () => {
  const navigate = useNavigate();
  const [publicaciones, setPublicaciones] = useState([]); // Inicialmente vacío, se llenará desde el backend
  const user = JSON.parse(localStorage.getItem('user')); // Obtiene el usuario autenticado

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <img src={logo} alt="Logo Kursum" style={{ width: '250px' }} />
        <nav style={styles.nav}>
          <a href="/homepage" style={styles.navLink}>Inicio</a>
          <a  //boton para ver mi perfil
            href="/profile"
            onClick={(e) => { e.preventDefault(); navigate('/profile'); }}
            style={styles.navLink}
          >
            Mi perfil
          </a>
          <button  //boton para cerrar sesion
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
              <option>Selecciona un curso</option>
            </select>
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Por Catedrático</label>
            <select style={styles.select}>
              <option>Selecciona un catedrático</option>
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
                    <span style={styles.postUser}>
                      Usuario: @{post.usuario?.nombres || 'Usuario'}
                    </span>
                    <span style={styles.postDate}>
                      Fecha: {new Date(post.fecha_creacion).toLocaleDateString()}
                    </span>
                  </div>

                  {/* 🔽 Aquí agregamos la sección de comentarios */}
                  <div style={{ marginTop: "15px" }}>
                    <h4 style={{ marginBottom: "8px" }}>Comentarios:</h4>
                    {post.comentarios && post.comentarios.length > 0 ? (
                      <ul style={{ paddingLeft: "20px", margin: 0 }}>
                        {post.comentarios.map((c) => (
                          <li key={c.id} style={{ marginBottom: "6px", fontSize: "14px" }}>
                            <strong>@{c.usuario?.nombres || "Anon"}:</strong> {c.texto}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p style={{ fontSize: "14px", color: "#666" }}>
                        No hay comentarios aún.
                      </p>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <p style={styles.noPosts}>
                No hay publicaciones aún. Sé el primero en crear una.
              </p>
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
  profileSection: {
    marginTop: '30px',
    borderTop: '1px solid #74c69d',
    paddingTop: '20px',
  },
  profileTitle: {
    fontSize: '18px',
    color: '#2d6a4f',
    marginBottom: '10px',
  },
  viewProfileButton: {
    width: '100%',
    backgroundColor: '#74c69d',
    color: '#2d6a4f',
    border: '1px solid #40916c',
    padding: '10px',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: '500',
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