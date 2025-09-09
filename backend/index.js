
const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');
app.use(cors());
app.use(express.json());



const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '0000',
  database: 'foro'
});

app.post('/create', (req, res) => {
  const carnet = req.body.carnet;
  const nombres = req.body.nombres;
  const apellidos = req.body.apellidos;
  const contrasena = req.body.contrasena;
  const correo = req.body.correo;

  db.query('INSERT INTO usuario (carnet, nombres, apellidos, contrasena, correo) VALUES (?, ?, ?, ?, ?)', [carnet, nombres, apellidos, contrasena, correo], (err, result) => {
    if (err) {
      console.error('Error al insertar el usuario:', err);
      res.status(500).json({ error: 'Error al insertar el usuario' });
      
    } else {
      console.log('Usuario creado exitosamente');
      res.status(201).json({ message: 'Usuario creado exitosamente' });
    }
  });
});

app.get('/usuario', (req, res) => {
  db.query('SELECT * FROM usuario', (err, result) => {
    if (err) {
      console.error('Error al obtener los usuarios:', err);
      
    } else {
      res.send(result);
    }
  });
});
app.post('/login', (req, res) => {
  const carnet = req.body.carnet;
  const Contrasena = req.body.contrasena;
  db.query('SELECT * FROM usuario WHERE carnet = ? AND contrasena = ?', [carnet, Contrasena], (err, results) => {
    if (err) {
      console.error('Error al autenticar el usuario:', err);
      return res.status(500).json({ error: 'Error al autenticar el usuario' });
    }
    if (results.length > 0) {
      const usuario = results[0];
      return res.status(200).json({ message: 'Autenticación exitosa', 
        usuario: {
            id: usuario.id,
            carnet: usuario.carnet,
            nombres: usuario.nombres,
            apellidos: usuario.apellidos,
            correo: usuario.correo
          }
      });
      
    } else {
      return res.status(401).json({ message: 'Carnet o contraseña incorrectos' });
    }
  });
});

  app.get('/catedraticos', (req, res) => {
  db.query('SELECT * FROM catedratico', (err, result) => {
    if (err) {
      console.error('Error al obtener los catedráticos:', err);
      res.status(500).json({ error: 'Error al obtener los catedráticos' });
    } else {
      res.send(result);
    }
  });
});

  app.get('/cursos', (req, res) => {
  db.query('SELECT * FROM curso', (err, result) => {
    if (err) {
      console.error('Error al obtener los cursos:', err);
      res.status(500).json({ error: 'Error al obtener los cursos' });
    } else {
      res.send(result);
    }
  });
});

app.post('/publicaciones', (req, res) => {
  const {
    titulo,
    mensaje,
    usu_carnet,
    cur_id,
    cat_id
  } = req.body;

  // Validaciones
  if (!titulo || !mensaje || !usu_carnet) {
    return res.status(400).json({ error: 'Faltan campos obligatorios: titulo, mensaje, usu_carnet' });
  }

  if (!cur_id && !cat_id) {
    return res.status(400).json({ error: 'Debe seleccionar un curso o catedrático' });
  }

  if (cur_id && cat_id) {
    return res.status(400).json({ error: 'No puede seleccionar un curso y un catedrático a la vez' });
  }

  // ✅ Query CORRECTO para tu tabla
  const query = `
    INSERT INTO publicacion (titulo, mensaje, usu_carnet, cur_id, cat_id)
    VALUES (?, ?, ?, ?, ?)
  `;

  db.query(query, [titulo, mensaje, usu_carnet, cur_id, cat_id], (err, result) => {
    if (err) {
      console.error('Error SQL:', err);
      return res.status(500).json({ 
        error: 'Error al crear la publicación',
        details: err.message 
      });
    }
    
    res.status(201).json({ 
      message: 'Publicación creada exitosamente', 
      id: result.insertId 
    });
  });
});

app.get('/getpublicaciones', (req, res) => {

  const query = `
    SELECT 
      p.id,
      p.titulo,
      p.mensaje,
      p.hora_creado,
      p.usu_carnet,
      p.cur_id,
      p.cat_id,
      u.nombres,
      u.apellidos,
      c.nombre as curso_nombre,
      cat.nombre as catedratico_nombre
    FROM publicacion p
    LEFT JOIN usuario u ON p.usu_carnet = u.carnet
    LEFT JOIN curso c ON p.cur_id = c.id
    LEFT JOIN catedratico cat ON p.cat_id = cat.id
    ORDER BY p.hora_creado DESC;
  `;

  db.query(query, (err, result) => {
    if (err) {
      console.error('Error al obtener la publicación:', err);
      res.status(500).json({ error: 'Error al obtener la publicaciónes' });
    } 
    res.json(result);
  });
});
  
app.listen(3001, () => {
  console.log('Servidor corriendo en http://localhost:3001');
});



  
