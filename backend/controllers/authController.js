const bcrypt = require('bcryptjs');
const db = require('../config/db');

// Función para el login
exports.login = async (req, res) => {
  const { carnet, contrasena } = req.body;

  // Validar que envíen ambos campos
  if (!carnet || !contrasena) {
    return res.status(400).json({ error: 'Carnet y contraseña son obligatorios' });
  }

  try {
    // Buscar usuario en la base de datos
    const rows = await db.query('SELECT * FROM usuario WHERE carnet = ?', [carnet]);

    // Si no existe el usuario
    if (rows.length === 0) {
      return res.status(401).json({ error: 'Carnet o contraseña incorrectos' });
    }

    const user = rows[0];

    // Comparar la contraseña que escribió con la que está en la BD
    const isMatch = await bcrypt.compare(contrasena, user.contrasena);

    if (!isMatch) {
      return res.status(401).json({ error: 'Carnet o contraseña incorrectos' });
    }

    // Si todo está bien, devolvemos éxito
    res.json({
      success: true,
      message: 'Inicio de sesión exitoso',
      user: {
        carnet: user.carnet,
        nombres: user.nombres,
        apellidos: user.apellidos,
        correo: user.correo
      }
    });

  } catch (error) {
    console.error('Error en login:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// Función para recuperar contraseña (solo validación por ahora)
exports.forgotPassword = async (req, res) => {
  const { carnet, correo } = req.body;

  if (!carnet || !correo) {
    return res.status(400).json({ error: 'Carnet y correo son obligatorios' });
  }

  try {
    const rows = await db.query(
      'SELECT * FROM usuario WHERE carnet = ? AND correo = ?',
      [carnet, correo]
    );

    if (rows.length === 0) {
      return res.status(404).json({ error: 'No se encontró ningún usuario con esos datos' });
    }

    res.json({
      success: true,
      message: 'Puede proceder a cambiar su contraseña'
    });

  } catch (error) {
    console.error('Error en recuperación de contraseña:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};