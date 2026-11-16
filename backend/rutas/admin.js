const express = require('express');
const router = express.Router();

const adminController = require('../controllers/adminController');

// Administrador autenticado
router.post('/login', adminController.loginAdmin);

// Resumen del panel de administración
router.get('/resumen', adminController.obtenerResumenAdmin);

// Incidencias pendientes
router.get('/incidencias', adminController.obtenerIncidenciasPendientes);

// Historial de gestión de la incidencia
router.get('/incidencias/:id', adminController.obtenerGestionIncidencia);

// Incidencia gestionada
router.put('/incidencias/:id', adminController.gestionarIncidencia);

module.exports = router;
