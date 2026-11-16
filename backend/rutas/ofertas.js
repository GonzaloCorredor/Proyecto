const express = require('express');
const router = express.Router();

const ofertasController = require('../controllers/ofertasController');

// Oferta creada
router.post('/', ofertasController.crearOferta);

// Precio de la oferta actualizado
router.put('/:id', ofertasController.actualizarPrecioOferta);

// Oferta eliminada
router.delete('/:id', ofertasController.eliminarOferta);

module.exports = router;
