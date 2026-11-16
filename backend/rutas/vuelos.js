const express = require('express');
const router = express.Router();

const vuelosController = require('../controllers/vuelosController');

// Listado de vuelos
router.get('/', vuelosController.obtenerVuelos);

// Resultados de búsqueda de vuelos
router.get('/buscar', vuelosController.buscarVuelos);

// Vuelo más barato por aerolínea
router.get('/comparar', vuelosController.compararAerolineas);

// Detalle del vuelo
router.get('/:id', vuelosController.obtenerVueloPorId);

// Ofertas del vuelo
router.get('/:id/ofertas', vuelosController.obtenerOfertasVuelo);

// Vuelo creado
router.post('/', vuelosController.crearVuelo);

// Vuelo modificado
router.put('/:id', vuelosController.modificarVuelo);

// Vuelo eliminado
router.delete('/:id', vuelosController.eliminarVuelo);

module.exports = router;
