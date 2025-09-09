import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Header from "../components/Header";

const NewPublication = () => {
  const navigate = useNavigate();
  const { usuarioLogueado } = useAuth();
    useEffect(() => {
  // 🔴 Redirección inmediata si no hay usuario válido
  if (!usuarioLogueado || !usuarioLogueado.carnet) {
    alert("Por favor, inicia sesión para crear una publicación.");
    navigate("/login", { replace: true });
    return null;
  }}, [usuarioLogueado, navigate]);

  const [cursos, setCursos] = useState([]);
  const [catedraticos, setCatedraticos] = useState([]);

  // ✅ Estado inicial SIN 'fecha', CON 'referente'
  const [formData, setFormData] = useState({
    titulo: "",
    mensaje: "",
    tipo: "",       // 'curso' o 'catedratico' (solo para UI)
    referente: "",  // ID del curso o catedrático seleccionado
  });

  // Cargar catedráticos
  useEffect(() => {
    fetch('http://localhost:3001/catedraticos')
      .then(response => response.json())
      .then(data => {
        console.log('Catedráticos obtenidos:', data);
        setCatedraticos(data);
      })
      .catch(error => console.error('Error al obtener catedráticos:', error));
  }, []);

  // Cargar cursos
  useEffect(() => {
    fetch('http://localhost:3001/cursos')
      .then(response => response.json())
      .then(data => {
        console.log('Cursos obtenidos:', data);
        setCursos(data);
      })
      .catch(error => console.error('Error al obtener cursos:', error));
  }, []);

  // Manejar cambios en inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  // ✅ Manejar envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validar tipo
    if (!formData.tipo) {
      alert("Por favor, seleccione si la publicación es sobre un Curso o un Catedrático.");
      return;
    }

    // Validar referente
    if (!formData.referente) {
      alert("Por favor, seleccione un curso o catedrático.");
      return;
    }

    // Determinar cur_id y cat_id según el tipo
    let cur_id = null;
    let cat_id = null;

    if (formData.tipo === "curso") {
      cur_id = parseInt(formData.referente, 10);
    } else if (formData.tipo === "catedratico") {
      cat_id = parseInt(formData.referente, 10);
    }

    // ✅ Objeto final para enviar al backend — SIN 'tipo', SIN 'fecha'
    const publicacion = {
      titulo: formData.titulo,
      mensaje: formData.mensaje,
      usu_carnet: usuarioLogueado.carnet, // ✅ ¡IMPORTANTE! Usar carnet, no id
      cur_id: cur_id,
      cat_id: cat_id,
    };

    console.log("Enviando publicación:", publicacion);

    // Enviar al backend
    fetch("http://localhost:3001/publicaciones", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(publicacion),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Error HTTP: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        console.log("Publicación creada:", data);
        alert("¡Publicación creada exitosamente!");
        navigate("/homepage");
      })
      .catch((err) => {
        console.error("Error al crear publicación:", err);
        alert("Hubo un error. Por favor, inténtalo de nuevo.");
      });
  };

  return (
    <div style={styles.container}>
      <Header />
      <main style={styles.main}>
        <h2 style={styles.title}>Crear nueva publicación</h2>

        {/* Mostrar info del usuario logueado */}
        <div style={styles.userInfo}>
          <p>
            <strong>Publicando como:</strong> {usuarioLogueado.nombres} {usuarioLogueado.apellidos} ({usuarioLogueado.carnet})
          </p>
        </div>

        <form onSubmit={handleSubmit} style={styles.form}>
          {/* Título */}
          <div style={styles.inputGroup}>
            <label style={styles.label}>Título</label>
            <input
              type="text"
              name="titulo"
              value={formData.titulo}
              onChange={handleChange}
              style={styles.input}
              required
            />
          </div>

          {/* Mensaje */}
          <div style={styles.inputGroup}>
            <label style={styles.label}>Mensaje</label>
            <textarea
              name="mensaje"
              value={formData.mensaje}
              onChange={handleChange}
              style={styles.textarea}
              required
            />
          </div>

          {/* Selector de tipo: Curso o Catedrático */}
          <div style={styles.inputGroup}>
            <label style={styles.label}>Tipo de publicación</label>
            <select
              name="tipo"
              value={formData.tipo}
              onChange={handleChange}
              style={styles.input}
              required
            >
              <option value="">-- Selecciona --</option>
              <option value="curso">Curso</option>
              <option value="catedratico">Catedrático</option>
            </select>
          </div>

          {/* Selector dinámico: Curso */}
          {formData.tipo === "curso" && (
            <div style={styles.inputGroup}>
              <label style={styles.label}>Selecciona un Curso</label>
              <select
                name="referente"
                value={formData.referente}
                onChange={handleChange}
                style={styles.input}
                required
              >
                <option value="">-- Selecciona un curso --</option>
                {cursos.map((curso) => (
                  <option key={curso.id} value={curso.id}>
                    {curso.nombre} - Sección {curso.seccion}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Selector dinámico: Catedrático */}
          {formData.tipo === "catedratico" && (
            <div style={styles.inputGroup}>
              <label style={styles.label}>Selecciona un Catedrático</label>
              <select
                name="referente"
                value={formData.referente}
                onChange={handleChange}
                style={styles.input}
                required
              >
                <option value="">-- Selecciona un catedrático --</option>
                {catedraticos.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.nombre}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Botones de acción */}
          <div style={styles.actions}>
            <button type="submit" style={styles.submitButton}>
              Publicar
            </button>
            <button
              type="button"
              style={styles.cancelButton}
              onClick={() => navigate("/homepage")}
            >
              Cancelar
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};

// Estilos (mantenidos desde tu versión)
const styles = {
  container: {
    minHeight: "100vh",
    backgroundColor: "#d8f3dc",
    fontFamily: "Segoe UI, Tahoma, Geneva, Verdana, sans-serif",
  },
  main: {
    maxWidth: "600px",
    margin: "40px auto",
    backgroundColor: "white",
    padding: "30px",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
  },
  title: {
    fontSize: "24px",
    fontWeight: "600",
    color: "#2d6a4f",
    marginBottom: "20px",
    textAlign: "center",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  inputGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  label: {
    fontSize: "16px",
    fontWeight: "500",
    color: "#2d6a4f",
  },
  input: {
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #74c69d",
    fontSize: "14px",
  },
  textarea: {
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #74c69d",
    fontSize: "14px",
    minHeight: "120px",
    resize: "vertical",
  },
  actions: {
    display: "flex",
    justifyContent: "space-between",
    gap: "10px",
  },
  submitButton: {
    flex: 1,
    backgroundColor: "#40916c",
    color: "white",
    border: "none",
    padding: "12px",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "600",
    fontSize: "16px",
    transition: "background-color 0.3s",
  },
  cancelButton: {
    flex: 1,
    backgroundColor: "#40916c",
    color: "#fcfcfcff",
    border: "1px solid #40916c",
    padding: "12px",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "600",
    fontSize: "16px",
    transition: "background-color 0.3s",
  },
  userInfo: {
    backgroundColor: "#e9ecef",
    padding: "15px",
    borderRadius: "8px",
    marginBottom: "20px",
    borderLeft: "4px solid #40916c",
    textAlign: "center",
    fontWeight: "500",
  },
};

export default NewPublication;
