const express = require('express');
const router = express.Router();
const { login, forgotPassword } = require('../controllers/authController');

// Ruta para login
router.post('/login', login);

// Ruta para recuperar contraseña
router.post('/recuperar-contrasena', forgotPassword);

module.exports = router;