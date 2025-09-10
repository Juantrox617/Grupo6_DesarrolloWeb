import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Header from '../components/Header';

const PubDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { usuarioLogueado } = useAuth();

  const [publicacion, setPublicacion] = useState(null);
  const [comentarios, setComentarios] = useState([]);
  const [nuevoComentario, setNuevoComentario] = useState('');
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  // Formatear fecha para Guatemala
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

  // Obtener la publicación
  useEffect(() => {
    const fetchPublicacion = async () => {
      try {
        setCargando(true);
        const response = await fetch('http://localhost:3001/getpublicaciones');
        
        if (!response.ok) {
          throw new Error('Error al cargar las publicaciones');
        }
        
        const data = await response.json();
        const pub = data.find(p => p.id == id);
        
        if (!pub) {
          throw new Error('Publicación no encontrada');
        }
        
        setPublicacion(pub);
      } catch (error) {
        setError(error.message);
        console.error('Error:', error);
      } finally {
        setCargando(false);
      }
    };

    fetchPublicacion();
  }, [id]);

  // Obtener comentarios cuando se carga la publicación
  useEffect(() => {
    if (!id) return;
    
    const fetchComentarios = async () => {
      try {
        const response = await fetch(`http://localhost:3001/comentarios/${id}`);
        
        if (!response.ok) {
           throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log("Comentarios obtenidos:", data); // ✅ Verifica aquí
        setComentarios(data);
      } catch (error) {
        console.error('Error al cargar comentarios:', error);
        // No mostramos error, solo continuamos sin comentarios
         alert('Error al cargar los comentarios. Por favor, inténtalo de nuevo.');
      }
    };

    fetchComentarios();
  }, [id]);

  // Manejar envío de nuevo comentario
  const handleComentarioSubmit = async (e) => {
    e.preventDefault();

    if (!usuarioLogueado) {
      alert("Debes iniciar sesión para comentar.");
      return;
    }

    if (!nuevoComentario.trim()) {
      alert("El comentario no puede estar vacío.");
      return;
    }

    try {
      const comentario = {
        mensaje: nuevoComentario,
        usu_carnet: usuarioLogueado.carnet,
        pub_id: id
      };

      const response = await fetch("http://localhost:3001/comentarios", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(comentario),
      });

      if (!response.ok) {
        throw new Error("Error al enviar el comentario");
      }

      // Limpiar el campo y recargar comentarios
      setNuevoComentario('');
      const updatedResponse = await fetch(`http://localhost:3001/comentarios/${id}`);
      const updatedData = await updatedResponse.json();
      setComentarios(updatedData);
      
      alert('¡Comentario agregado exitosamente!');

    } catch (error) {
      console.error('Error al enviar comentario:', error);
      alert('Error al enviar el comentario');
    }
  };

  // Estados de carga y error
  if (cargando) {
    return (
      <div style={{ backgroundColor: '#d8f3dc', minHeight: '100vh' }}>
        <Header />
        <div style={styles.container}>
          <div style={styles.loading}>Cargando publicación...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ backgroundColor: '#d8f3dc', minHeight: '100vh' }}>
        <Header />
        <div style={styles.container}>
          <button onClick={() => navigate(-1)} style={styles.backButton}>
            ← Volver al inicio
          </button>
          <div style={styles.error}>Error: {error}</div>
        </div>
      </div>
    );
  }

  if (!publicacion) {
    return (
      <div style={{ backgroundColor: '#d8f3dc', minHeight: '100vh' }}>
        <Header />
        <div style={styles.container}>
          <button onClick={() => navigate(-1)} style={styles.backButton}>
            ← Volver al inicio
          </button>
          <div style={styles.loading}>Publicación no encontrada</div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: '#d8f3dc', minHeight: '100vh' }}>
      <Header />
      <div style={styles.container}>
        <button onClick={() => navigate(-1)} style={styles.backButton}>
          ← Volver al inicio
        </button>

        {/* Publicación principal */}
        <div style={styles.publicacion}>
          <h2 style={styles.titulo}>{publicacion.titulo}</h2>
          <p style={styles.mensaje}>"{publicacion.mensaje}"</p>
          <div style={styles.meta}>
            <span>👤 Por: {publicacion.nombres} {publicacion.apellidos}</span>
            <span>📅 {formatDate(publicacion.hora_creado)}</span>
          </div>
        </div>

        {/* Sección de comentarios */}
        <div style={styles.comentariosSection}>
          <h3>💬 Comentarios ({comentarios.length})</h3>
          
          {/* Formulario para comentar */}
          {usuarioLogueado ? (
            <form onSubmit={handleComentarioSubmit} style={styles.comentarioForm}>
              <textarea
                value={nuevoComentario}
                onChange={(e) => setNuevoComentario(e.target.value)}
                placeholder="Escribe tu comentario aquí..."
                style={styles.textarea}
                rows="3"
                required
              />
              <button type="submit" style={styles.submitButton}>
                ✅ Publicar comentario
              </button>
            </form>
          ) : (
            <p style={styles.loginMessage}>
              Debes <a href="/login" onClick={(e) => { e.preventDefault(); navigate('/login'); }}>iniciar sesión</a> para comentar.
            </p>
          )}

          {/* Lista de comentarios */}
          <div style={styles.comentariosList}>
            {comentarios.length > 0 ? (
              comentarios.map((comentario) => (
                <div key={comentario.id} style={styles.comentario}>
                  <div style={styles.comentarioHeader}>
                    <strong>👤 {comentario.nombres} {comentario.apellidos}</strong>
                    <small style={styles.comentarioFecha}>
                      {formatDate(comentario.hora_creado)}
                    </small>
                  </div>
                  <p style={styles.comentarioTexto}>{comentario.mensaje}</p>
                </div>
              ))
            ) : (
              <p style={styles.sinComentarios}>No hay comentarios aún. Sé el primero en comentar. ✨</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// 🎨 Estilos mejorados
const styles = {
  container: {
    padding: '20px',
    maxWidth: '800px',
    margin: '0 auto',
    backgroundColor: '#f5f8fa',
    minHeight: '100vh',
    marginTop: '20px'
  },
  backButton: {
    background: '#2d6a4f',
    color: 'white',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '8px',
    cursor: 'pointer',
    marginBottom: '20px',
    fontSize: '16px'
  },
  loading: {
    textAlign: 'center',
    padding: '40px',
    fontSize: '18px',
    color: '#666'
  },
  error: {
    textAlign: 'center',
    padding: '20px',
    color: '#dc3545',
    fontSize: '18px'
  },
  publicacion: {
    background: 'white',
    padding: '25px',
    borderRadius: '12px',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
    marginBottom: '25px',
    borderLeft: '4px solid #00ff66ff'
  },
  titulo: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#2d6a4f',
    marginBottom: '15px'
  },
  mensaje: {
    fontSize: '20px',
    marginBottom: '15px',
    color: '#333',
    lineHeight: '1.5'
  },
  meta: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '14px',
    color: '#6c757d'
  },
  comentariosSection: {
    background: 'white',
    padding: '25px',
    borderRadius: '12px',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
  },
  comentarioForm: {
    marginBottom: '25px'
  },
  textarea: {
    width: '100%',
    padding: '15px',
    border: '2px solid #e9ecef',
    borderRadius: '8px',
    resize: 'vertical',
    marginBottom: '15px',
    fontSize: '16px',
    fontFamily: 'inherit'
  },
  submitButton: {
    background: '#28a745',
    color: 'white',
    border: 'none',
    padding: '12px 25px',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: 'bold'
  },
  loginMessage: {
    textAlign: 'center',
    color: '#6c757d',
    marginBottom: '20px',
    fontSize: '16px'
  },
  comentariosList: {
    marginTop: '20px'
  },
  comentario: {
    background: '#f8f9fa',
    padding: '15px',
    borderRadius: '8px',
    marginBottom: '15px',
    borderLeft: '3px solid #17a2b8'
  },
  comentarioHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '8px'
  },
  comentarioFecha: {
    color: '#6c757d'
  },
  comentarioTexto: {
    margin: 0,
    color: '#495057',
    lineHeight: '1.4'
  },
  sinComentarios: {
    textAlign: 'center',
    color: '#6c757d',
    fontStyle: 'italic',
    padding: '20px'
  }
};

export default PubDetail;