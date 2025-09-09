
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
  db.query('SELECT * FROM publicacion', (err, result) => {
    if (err) {
      console.error('Error al obtener la publicación:', err);
      res.status(500).json({ error: 'Error al obtener la publicación' });
    } else {
      res.send(result);
    }
  });
});

app.put('/usuario/:carnet', (req, res) => {
  const carnet = req.params.carnet;
  const { nombres, apellidos, correo } = req.body;
  console.log('Body recibido:', req.body);

  db.query(
    'UPDATE usuario SET nombres = ?, apellidos = ?, correo = ? WHERE carnet = ?',
    [nombres, apellidos, correo, carnet],
    (err, result) => {
      if (err) {
        console.error('Error al actualizar el usuario:', err);
        return res.status(500).json({ error: 'Error al actualizar el usuario' });
      }
      res.json({ message: 'Usuario actualizado correctamente', nombres, apellidos, correo });
    }
  );
});

app.post('/aprobados', (req, res) => {
  const { usu_carnet, cur_id } = req.body;
  console.log('Body recibido:', req.body);
  db.query(
    'INSERT INTO aprobado (usu_carnet, cur_id, hora_aprobado) VALUES (?, ?, NOW( ))',
    [usu_carnet, cur_id],
    (err, result) => {
      if (err) {
        console.error('Error al agregar curso aprobado:', err);
        return res.status(500).json({ error: 'Error al agregar curso aprobado' });
      }
      res.status(201).json({ message: 'Curso aprobado agregado correctamente', id: result.insertId });
    }
  );
});
app.get('/aprobados/:carnet', (req, res) => {
  const carnet = req.params.carnet;
  db.query(
    `SELECT c.id, c.codigo, c.nombre, c.creditos
     FROM aprobado a
     JOIN curso c ON a.cur_id = c.id
     WHERE a.usu_carnet = ?`,
    [carnet],
    (err, result) => {
      if (err) {
        return res.status(500).json({ error: 'Error al obtener cursos aprobados' });
      }
      res.json(result);
    }
  );
});

app.get('/usuario/:carnet', (req, res) => {
  const carnet = req.params.carnet;
  db.query('SELECT * FROM usuario WHERE carnet = ?', [carnet], (err, result) => {
    if (err) {
      console.error('Error al obtener el usuario:', err);
      return res.status(500).json({ error: 'Error al obtener el usuario' });
    }
    if (result.length === 0) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    res.json(result[0]);
  });
});

app.listen(3001, () => {
  console.log('Servidor corriendo en http://localhost:3001');
});



  
