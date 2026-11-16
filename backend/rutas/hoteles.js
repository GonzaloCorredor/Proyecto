const express = require('express');
const router = express.Router();

const hotelesController = require('../controllers/hotelesController');

// Listado de hoteles
router.get('/', hotelesController.obtenerHoteles);

// Ciudades disponibles
router.get('/ciudades', hotelesController.obtenerCiudades);

// Resultados de búsqueda de hoteles
router.get('/buscar', hotelesController.buscarHoteles);

// Detalle del hotel
router.get('/:id', hotelesController.obtenerHotelPorId);

// Ofertas del hotel
router.get('/:id/ofertas', hotelesController.obtenerOfertasHotel);

// Hotel creado
router.post('/', hotelesController.crearHotel);

// Servicio asignado al hotel
router.post('/:id/servicios', hotelesController.asignarServicioHotel);

// Hotel modificado
router.put('/:id', hotelesController.modificarHotel);

// Hotel eliminado
router.delete('/:id', hotelesController.eliminarHotel);

module.exports = router;
