const express = require('express');
const router = express.Router();

const favoritosController = require('../controllers/favoritosController');

// Favoritos del usuario
router.get('/usuario/:id', favoritosController.obtenerFavoritosUsuario);

// Hotel añadido a favoritos
router.post('/hotel', favoritosController.añadirFavoritoHotel);

// Vuelo añadido a favoritos
router.post('/vuelo', favoritosController.añadirFavoritoVuelo);

// Favorito eliminado
router.delete('/:id', favoritosController.eliminarFavorito);

module.exports = router;
