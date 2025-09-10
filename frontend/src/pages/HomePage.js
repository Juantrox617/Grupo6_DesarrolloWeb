// src/pages/HomePage.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/Kursum-homepage.png';
import '../styles/TextInput.css';
import '../styles/CreatePostButton.css';
import PubDetail from './PubDetail';


const HomePage = () => {
  const navigate = useNavigate();
  const [publicaciones, setPublicaciones] = useState([]);
  const [publicacionesFiltradas, setPublicacionesFiltradas] = useState([]);
  const [catedraticos, setCatedraticos] = useState([]);
  const [cursos, setCursos] = useState([]);
  
  const [filtroCurso, setFiltroCurso] = useState('');
  const [filtroCatedratico, setFiltroCatedratico] = useState('');
  const [busquedaNombre, setBusquedaNombre] = useState('');
  // Cargar catedráticos
  useEffect(() => {
    fetch('http://localhost:3001/catedraticos')
      .then(response => response.json())
      .then(data => setCatedraticos(data))
      .catch(error => console.error('Error al obtener catedráticos:', error));
  }, []);

  // Cargar cursos
  useEffect(() => {
    fetch('http://localhost:3001/cursos')
      .then(response => response.json())
      .then(data => setCursos(data))
      .catch(error => console.error('Error al obtener cursos:', error));
  }, []);

  // Cargar publicaciones
  useEffect(() => {
    fetch('http://localhost:3001/getpublicaciones')
      .then(response => response.json())
      .then(data => {
        setPublicaciones(data);
        setPublicacionesFiltradas(data); // Inicialmente muestra todas
      })
      .catch(error => console.error('Error al obtener publicaciones:', error));
  }, []);

  // Función para aplicar filtros
  const aplicarFiltros = () => {
    let publicacionesFiltradas = [...publicaciones];

    // Filtro por curso
    if (filtroCurso) {
      publicacionesFiltradas = publicacionesFiltradas.filter(p => p.cur_id === parseInt(filtroCurso));
    }

    // Filtro por catedrático
    if (filtroCatedratico) {
      publicacionesFiltradas = publicacionesFiltradas.filter(p => p.cat_id === parseInt(filtroCatedratico));
    }

    // Filtro por nombre (texto)
    if (busquedaNombre.trim()) {
      const textoBuscado = busquedaNombre.toLowerCase();
      publicacionesFiltradas = publicacionesFiltradas.filter(p => {
        return (
          p.titulo.toLowerCase().includes(textoBuscado) ||
          p.mensaje.toLowerCase().includes(textoBuscado) ||
          (p.curso_nombre && p.curso_nombre.toLowerCase().includes(textoBuscado)) ||
          (p.catedratico_nombre && p.catedratico_nombre.toLowerCase().includes(textoBuscado))
        );
      });
    }

    setPublicacionesFiltradas(publicacionesFiltradas);
  };

  // Función para limpiar filtros
  const limpiarFiltros = () => {
    setFiltroCurso('');
    setFiltroCatedratico('');
    setBusquedaNombre('');
    setPublicacionesFiltradas(publicaciones);
  };

  // Formatear fecha
  const formatDate = (timestamp) => {
    if (!timestamp) return 'Fecha desconocida';
    const date = new Date(timestamp);
    return new Intl.DateTimeFormat('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      timeZone: 'America/Guatemala'
    }).format(date);
  };



  
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

            <select style={styles.select} 
              value={filtroCurso}
              onChange={(e) => setFiltroCurso(e.target.value)}
            >
              <option value="">Selecciona un curso</option>
              {cursos.map((curso) => (
                <option key={curso.id} value={curso.id}>
                  {curso.nombre} - Sección {curso.seccion}
                </option>
              ))}
            </select>
          </div>

      <div style={styles.inputGroup}>
          <label style={styles.label}>Por Catedratico</label>
            <select
            value={filtroCatedratico}
            onChange={(e) => setFiltroCatedratico(e.target.value)}
              style={styles.select}
      >
      <option value="">Selecciona un Catedratico</option>
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
    <input
      type="text"
      placeholder="Buscar por nombre..."
      value={busquedaNombre}
      onChange={(e) => setBusquedaNombre(e.target.value)}
      className="textInput"
    />
  </div>
</div>
<div style={{display: 'flex', gap: '10px', marginTop:'15px'}}>
    <button
      onClick={aplicarFiltros}
      style={styles.filterButton}
      >
      Aplicar filtros
    </button>
    <button 
      onClick={limpiarFiltros}
      style={{...styles.filterButton, background: '#dc3545'}}
    >
      Limpiar Filtro
    </button>
  </div>

        </aside>

        <main style={styles.feed}>
          <div style={styles.createPostContainer}>
            <button
              onClick={() => navigate('/crear-publicacion')}
              className="create-post-animated"
            >
              + Crear publicación
            </button>
          </div>

          
          <div style={styles.postList}>
            {publicacionesFiltradas.length > 0 ? (
              publicacionesFiltradas.map((publicacion) => (
                <div key={publicacion.id} style={styles.postCard}>
                  {/**titulo de publicacion */}
                  <h3 style={styles.postTitle}>{publicacion.titulo}</h3>
                  {/*mensaje de la publicacion */}
                  <p style={styles.postText}>
                    <em>{publicacion.mensaje}</em>
                  </p>
                {/* Curso o Catedrático */}
                  {publicacion.curso_nombre && (
                    <div style={styles.postTarget}>
                      📚 <strong>Curso:</strong> {publicacion.curso_nombre} - Sección {publicacion.curso_seccion}
                    </div>
                  )}
                  {publicacion.catedratico_nombre && (
                    <div style={styles.postTarget}>
                      👨‍🏫 <strong>Catedrático:</strong> {publicacion.catedratico_nombre}
                    </div>
                  )}

                  {/* Autor y fecha */}
                  <div style={styles.postFooter}>
                    <span style={styles.postUser}>
                      👤 {publicacion.nombres || 'Anónimo'} {publicacion.apellidos || ''}
                    </span>
                    <span style={styles.postDate}>
                       {formatDate(publicacion.hora_creado)}
                    </span>
                  </div>
                  {/* Botón para ver comentarios*/}
                  <button
                    onClick={() => navigate(`/publicacion/${publicacion.id}`)}
                    style={styles.verDetallesButton}
                  >
                    💬 Ver comentarios ({publicacion.total_comentarios || 0})
                  </button>
                </div>
              ))
            ) : (
              <p style={styles.noPosts}>
                   No hay publicaciones que coincidan con los filtros.

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
    backgroundColor: '#eff9f0ff',//fondo de toda la app
    fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif',
    margin: 0,
    padding: 0,
  },
  verDetallesButton: {
    background: '#1b159796', 
    color: 'white',
    border: 'none',
    padding: '7px 60px',
    borderRadius: '6px',
    cursor: 'pointer',
    marginTop: '15px',
    fontSize: '14px',
    fontWeight: 'bold',
    transition: 'background 0.3s'
  },

  header: {
    backgroundColor: '#2d6a4f',
    color: 'white',
    height: '80px',
    padding: '0 40px', 
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    position: 'sticky', 
    top: 0,             
    zIndex: 1000,       
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
    color: 'white',
    padding: '20px 16px',
    position: 'fixed',
    top: '80px',   // se pega justo debajo del header
    left: 0,       // pegado al borde izquierdo
    bottom: 0,     // se estira hasta el final de la pantalla
    overflowY: 'auto', // si hay muchos filtros, solo el sidebar scrollea
    zIndex: 9,     // un nivel debajo del header
    borderRight: 'none'
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
    boxShadow: '0 2px 6px rgba(255, 255, 255, 0.1)',
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
    transition: 'transform 0.25s cubic-bezier(0.4, 0.2, 0.2, 1)',
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
    textAlign: 'end',
    color: '#086137ff',
    fontStyle: 'italic',
    padding: '20px',
    backgroundColor: '#eff9f0ff',
    borderRadius: '8px',
  },
  
  postTarget: {
  fontSize: '14px',
  color: '#2d6a4f',
  fontWeight: '500',
  marginBottom: '10px',
  padding: '8px',
  backgroundColor: '#f0f7f4',
  borderRadius: '5px',
  display: 'inline-block',
  }
  
  
};
  

export default HomePage;