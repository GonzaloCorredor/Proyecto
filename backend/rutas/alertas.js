const express = require('express');
const router = express.Router();

const alertasController = require('../controllers/alertasController');

// Alertas cuyo precio objetivo se ha alcanzado
router.get('/disparadas', alertasController.obtenerAlertasDisparadas);

// Alertas activas del usuario
router.get('/usuario/:id', alertasController.obtenerAlertasUsuario);

// Alerta de hotel creada
router.post('/hotel', alertasController.crearAlertaHotel);

// Alerta de vuelo creada
router.post('/vuelo', alertasController.crearAlertaVuelo);

// Alerta desactivada
router.put('/:id', alertasController.desactivarAlerta);

// Alerta eliminada
router.delete('/:id', alertasController.eliminarAlerta);

module.exports = router;
