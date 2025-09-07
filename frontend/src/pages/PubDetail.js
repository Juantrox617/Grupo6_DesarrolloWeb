import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../components/Header';

const PubDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [comentario, setComentario] = useState('');
  const [publicacion, setPublicacion] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  // 📌 DATOS DE PRUEBA - Simulan la respuesta de la API
  useEffect(() => {
    const fetchPublicacion = async () => {
      try {
        setCargando(true);
        const response = await fetch(`http://localhost:3001/publicaciones/${id}`);
        
        if (!response.ok) {
          throw new Error('Error al cargar la publicación');
        }
        
        const data = await response.json();
        setPublicacion(data);
      } catch (error) {
        setError(error.message);
        console.error('Error:', error);
      } finally {
        setCargando(false);
      }
    };

    fetchPublicacion();
  }, [id]);

  const handleComentarioSubmit = async (e) => {
    e.preventDefault();
    if (comentario.trim()) {
      try {
        // 📌 ENVÍO REAL DEL COMENTARIO - Reemplaza el mock
        const token = localStorage.getItem('token');
        const response = await fetch(`http://localhost:3001/publicaciones/${id}/comentarios`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({
            texto: comentario
          })
        });

        if (!response.ok) {
          throw new Error('Error al enviar el comentario');
        }

        const nuevoComentario = await response.json();
        
        // Actualizar el estado local con el nuevo comentario
        setPublicacion(prev => ({
          ...prev,
          comentarios: [...prev.comentarios, nuevoComentario]
        }));

        setComentario('');
        alert('¡Comentario agregado exitosamente!');

      } catch (error) {
        console.error('Error al enviar comentario:', error);
        alert('Error al enviar el comentario');
      }
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
          <p style={styles.mensaje}>"{publicacion.mensaje}"</p>
          <div style={styles.meta}>
            <span>👤 Por: @{publicacion.usuario?.nombres}</span>
            <span>📅 {new Date(publicacion.fecha_creacion).toLocaleDateString()}</span>
          </div>
        </div>

        {/* Sección de comentarios */}
        <div style={styles.comentariosSection}>
          <h3>💬 Comentarios ({publicacion.comentarios?.length || 0})</h3>
          
          {/* Formulario para comentar */}
          <form onSubmit={handleComentarioSubmit} style={styles.comentarioForm}>
            <textarea
              value={comentario}
              onChange={(e) => setComentario(e.target.value)}
              placeholder="Escribe tu comentario aquí..."
              style={styles.textarea}
              rows="3"
              required
            />
            <button type="submit" style={styles.submitButton}>
              ✅ Publicar comentario
            </button>
          </form>

          {/* Lista de comentarios */}
          <div style={styles.comentariosList}>
            {publicacion.comentarios && publicacion.comentarios.length > 0 ? (
              publicacion.comentarios.map((comentario) => (
                <div key={comentario.id} style={styles.comentario}>
                  <div style={styles.comentarioHeader}>
                    <strong>👤 @{comentario.usuario?.nombres}</strong>
                    <small style={styles.comentarioFecha}>
                      {new Date(comentario.fecha).toLocaleDateString()}
                    </small>
                  </div>
                  <p style={styles.comentarioTexto}>{comentario.texto}</p>
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
  publicacion: {
    background: 'white',
    padding: '25px',
    borderRadius: '12px',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
    marginBottom: '25px',
    borderLeft: '4px solid #00ff66ff'
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