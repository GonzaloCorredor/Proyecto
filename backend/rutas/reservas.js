const express = require('express');
const router = express.Router();

const reservasController = require('../controllers/reservasController');

// Reservas del usuario
router.get('/usuario/:id', reservasController.obtenerReservasUsuario);

// Detalle de la reserva
router.get('/:id', reservasController.obtenerReservaPorId);

// Reserva de hotel creada
router.post('/hotel', reservasController.crearReservaHotel);

// Reserva de vuelo creada
router.post('/vuelo', reservasController.crearReservaVuelo);

// Reserva cancelada
router.delete('/:id', reservasController.cancelarReserva);

module.exports = router;
