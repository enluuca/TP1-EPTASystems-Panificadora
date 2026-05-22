const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Rutas GET (Renderizado de Vistas)
router.get('/registro', authController.getRegistro);
router.get('/login', authController.getLogin);

// Rutas POST (Procesamiento de Formularios)
router.post('/registro', authController.postRegistrar);
router.post('/login', authController.postLogin);

module.exports = router;