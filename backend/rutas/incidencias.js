const express = require('express');
const router = express.Router();

const incidenciasController = require('../controllers/incidenciasController');

// Incidencias del usuario
router.get('/usuario/:id', incidenciasController.obtenerIncidenciasUsuario);

// Incidencia creada
router.post('/', incidenciasController.crearIncidencia);

module.exports = router;
