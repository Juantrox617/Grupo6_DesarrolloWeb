import React from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();

  // Simulamos algunas publicaciones (vacías por ahora)
  const publicaciones = Array(5).fill({
    id: 1,
    usuario: 'usuario',
    fecha: '--/--/----',
    contenido: 'Aquí se mostrará el contenido real cuando se conecte al backend.'
  });

  return (
    <div style={styles.container}>
      {/* ========== HEADER / NAVBAR ========== */}
      <header style={styles.header}>
        <h1 style={styles.logo}>Kursum</h1>
        <nav style={styles.nav}>
          <a href="/home" style={styles.navLink}>Inicio</a>
          <a href="/profile" style={styles.navLink}>Mi perfil</a>
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

      {/* ========== CONTENIDO PRINCIPAL (SIDEBAR + FEED) ========== */}
      <div style={styles.main}>
        {/* ========== SIDEBAR ========== */}
        <aside style={styles.sidebar}>
          <h2 style={styles.sidebarTitle}>🔍 Filtros</h2>

          {/* Filtro por Curso */}
          <div style={styles.inputGroup}>
            <label style={styles.label}>Por Curso</label>
            <select style={styles.select}>
              <option>Selecciona un curso</option>
              {/* Este campo se llenará desde el backend después */}
            </select>
          </div>

          {/* Filtro por Catedrático */}
          <div style={styles.inputGroup}>
            <label style={styles.label}>Por Catedrático</label>
            <select style={styles.select}>
              <option>Selecciona un catedrático</option>
              {/* Este campo se llenará desde el backend después */}
            </select>
          </div>

          {/* Buscador por nombre */}
          <div style={styles.inputGroup}>
            <label style={styles.label}>Buscar por nombre</label>
            <input
              type="text"
              placeholder="Ej: López, Algoritmos"
              style={styles.input}
            />
          </div>

          {/* Botón Aplicar Filtros */}
          <button style={styles.filterButton}>Aplicar filtros</button>
        </aside>

        {/* ========== FEED DE PUBLICACIONES ========== */}
        <main style={styles.feed}>
          {/* Botón Crear Publicación */}
          <div style={styles.createPostContainer}>
            <button
              onClick={() => navigate('/crear-publicacion')}
              style={styles.createPostButton}
            >
              + Crear publicación
            </button>
          </div>

          {/* Lista de Publicaciones */}
          <div style={styles.postList}>
            {publicaciones.map((post, index) => (
              <div key={index} style={styles.postCard}>
                <p style={styles.postText}>
                  <em>{post.contenido}</em>
                </p>
                <div style={styles.postFooter}>
                  <span style={styles.postUser}>Usuario: @{post.usuario + index}</span>
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

// Estilos consistentes con el Login de tu amiga
const styles = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#d8f3dc', // Fondo claro verde
    fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif',
    margin: 0,
    padding: 0,
  },

  // ====== HEADER ======
  header: {
    backgroundColor: '#1b4332',
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
    color: '#d8f3dc',
  },
  nav: {
    display: 'flex',
    gap: '24px',
    alignItems: 'center',
  },
  navLink: {
    color: '#b7e4c7',
    textDecoration: 'none',
    fontSize: '18px',
    fontWeight: '500',
    transition: 'color 0.3s',
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
    transition: 'background-color 0.3s',
  },

  // ====== CONTENIDO PRINCIPAL ======
  main: {
    display: 'flex',
    padding: '20px 40px',
    gap: '30px',
    marginTop: '20px',
  },

  // ====== SIDEBAR ======
  sidebar: {
    width: '300px',
    backgroundColor: '#1b4332',
    color: 'white',
    padding: '24px',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
  },
  sidebarTitle: {
    fontSize: '22px',
    fontWeight: '600',
    marginBottom: '20px',
    color: '#d8f3dc',
  },
  inputGroup: {
    marginBottom: '20px',
  },
  label: {
    display: 'block',
    color: '#b7e4c7',
    fontSize: '15px',
    fontWeight: '500',
    marginBottom: '8px',
  },
  input: {
    width: '100%',
    padding: '10px',
    border: '1px solid #40916c',
    borderRadius: '6px',
    boxSizing: 'border-box',
    fontSize: '14px',
    backgroundColor: '#2d6a4f',
    color: 'white',
  },
  select: {
    width: '100%',
    padding: '10px',
    border: '1px solid #40916c',
    borderRadius: '6px',
    backgroundColor: '#2d6a4f',
    color: 'white',
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
    transition: 'background-color 0.3s',
  },

  // ====== FEED ======
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
    transition: 'all 0.3s',
  },
  postList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  postCard: {
    backgroundColor: '#b7e4c7',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    color: '#081c15',
    border: '1px solid #74c69d',
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