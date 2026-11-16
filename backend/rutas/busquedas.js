const express = require('express');
const router = express.Router();

const busquedasController = require('../controllers/busquedasController');

// Destinos más buscados
router.get('/populares', busquedasController.obtenerDestinosPopulares);

// Historial de búsquedas del usuario
router.get('/usuario/:id', busquedasController.obtenerHistorialBusquedas);

// Búsqueda de hotel guardada
router.post('/hotel', busquedasController.guardarBusquedaHotel);

// Búsqueda de vuelo guardada
router.post('/vuelo', busquedasController.guardarBusquedaVuelo);

// Búsqueda eliminada del historial
router.delete('/:id', busquedasController.eliminarBusqueda);

module.exports = router;
