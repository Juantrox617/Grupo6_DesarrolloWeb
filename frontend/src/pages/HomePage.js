import React from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();

  const publicaciones = Array(3).fill(null).map((_, i) => ({
    id: i + 1,
    usuario: `Usuario${i + 1}`,
    fecha: '05/09/2025',
    contenido: 'Excelente catedrático, explica muy claro y es accesible. Recomendado 100%.'
  }));

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.logo}>Kursum</h1>
        <nav style={styles.nav}>
          <a href="/homepage" style={styles.navLink}>Inicio</a>
          <a
            href="/profile"
            onClick={(e) => { e.preventDefault(); navigate('/profile'); }}
            style={styles.navLink}
          >
            Mi perfil
          </a>
          <button
            onClick={() => navigate('/')}
            style={styles.logoutButton}
          >
            Cerrar sesión
          </button>
        </nav>
      </header>

      <div style={styles.main}>
        <aside style={styles.sidebar}>
          <h2 style={styles.sidebarTitle}>🔍 Filtros</h2>

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
            <input type="text" placeholder="Ej: López, Algoritmos" style={styles.input} />
          </div>

          <button style={styles.filterButton}>Aplicar filtros</button>

          <div style={styles.profileSection}>
            <h3 style={styles.profileTitle}>👤 Tu Perfil</h3>
            <p><strong>Nombre:</strong> Ana López</p>
            <p><strong>Registro:</strong> 202400023</p>
            <button
              onClick={() => navigate('/profile')}
              style={styles.viewProfileButton}
            >
              Ver Perfil Completo
            </button>
          </div>
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
            {publicaciones.map((post) => (
              <div key={post.id} style={styles.postCard}>
                <p style={styles.postText}>
                  <em>{post.contenido}</em>
                </p>
                <div style={styles.postFooter}>
                  <span style={styles.postUser}>Usuario: @{post.usuario}</span>
                  <span style={styles.postDate}>Fecha: {post.fecha}</span>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

// === COLORES ACTUALIZADOS ===
const styles = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#d8f3dc', // Fondo general suave
    fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif',
    margin: 0,
    padding: 0,
  },
  header: {
    backgroundColor: '#2d6a4f', // Verde oscuro
    color: 'white',
    padding: '16px 40px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  },
  logo: {
    fontSize: '28px',
    fontWeight: 'bold',
    color: '#95d5b2', // Verde suave
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
    width: '300px',
    backgroundColor: '#95d5b2', // Verde suave
    color: '#2d6a4f',
    padding: '24px',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    border: '1px solid #74c69d',
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
    border: '1px solid #74c69d',
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
    padding: '12px',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: '500',
    fontSize: '16px',
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
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    color: '#2d6a4f',
    border: '1px solid #95d5b2',
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
    color: '#40916c',
    fontWeight: '500',
  },
};

export default HomePage;