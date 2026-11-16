const express = require('express');
const router = express.Router();

const catalogosController = require('../controllers/catalogosController');

// Listado de servicios
router.get('/servicios', catalogosController.obtenerServicios);

// Listado de aeropuertos
router.get('/aeropuertos', catalogosController.obtenerAeropuertos);

// Listado de aerolíneas
router.get('/aerolineas', catalogosController.obtenerAerolineas);

module.exports = router;
