import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";

const NewPublication = () => {
  const navigate = useNavigate();
  const [cursos, setCursos] = useState([]);
  const [catedraticos, setCatedraticos] = useState([]);

  const [formData, setFormData] = useState({
    titulo: "",
    mensaje: "",
    tipo: "",       // curso o catedrático
    referente: "",  // nombre del curso o catedrático
    fecha: new Date().toISOString().split("T")[0], // fecha de hoy
  });

  // Simulación de carga de cursos y catedráticos
  useEffect(() => {
    // 👉 Aquí después conectan con el backend
    setCursos(["Matemática I", "Programación I", "Física II"]);
    setCatedraticos(["Dr. Pérez", "Lic. Ramírez", "Ing. López"]);
  }, []);

  // Manejar cambios de inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Manejar envío de formulario
  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Nueva publicación:", formData);

    // Aquí conectas con tu backend real!!!
    fetch("http://tu-backend.com/api/publicaciones", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Publicación creada:", data);
        navigate("/homepage");
      })
      .catch((err) => console.error("Error:", err));
  };

  return (
    <div style={styles.container}>
      <Header />
      <main style={styles.main}>
        <h2 style={styles.title}>Crear nueva publicación</h2>

        <form onSubmit={handleSubmit} style={styles.form}>
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

          {/* Selector de tipo de publicación */}
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

          {/* Selector dinámico de referente */}
          {formData.tipo === "curso" && (
            <div style={styles.inputGroup}>
              <label style={styles.label}>Curso</label>
              <select
                name="referente"
                value={formData.referente}
                onChange={handleChange}
                style={styles.input}
                required
              >
                <option value="">-- Selecciona un curso --</option>
                {cursos.map((curso, idx) => (
                  <option key={idx} value={curso}>
                    {curso}
                  </option>
                ))}
              </select>
            </div>
          )}

          {formData.tipo === "catedratico" && (
            <div style={styles.inputGroup}>
              <label style={styles.label}>Catedrático</label>
              <select
                name="referente"
                value={formData.referente}
                onChange={handleChange}
                style={styles.input}
                required
              >
                <option value="">-- Selecciona un catedrático --</option>
                {catedraticos.map((catedratico, idx) => (
                  <option key={idx} value={catedratico}>
                    {catedratico}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Campo de fecha */}
          <div style={styles.inputGroup}>
            <label style={styles.label}>Fecha</label>
            <input
              type="date"
              name="fecha"
              value={formData.fecha}
              readOnly
              style={styles.input}
            />
          </div>

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
    backgroundColor: "#95d5b2",
    color: "#2d6a4f",
    border: "1px solid #40916c",
    padding: "12px",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "600",
    fontSize: "16px",
    transition: "background-color 0.3s",
  },
};

export default NewPublication;
