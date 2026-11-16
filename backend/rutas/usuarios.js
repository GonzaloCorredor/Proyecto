const express = require('express');
const router = express.Router();

const usuariosController = require('../controllers/usuariosController');

// Usuario registrado
router.post('/registro', usuariosController.registrarUsuario);

// Sesión iniciada
router.post('/login', usuariosController.iniciarSesion);

// Datos del usuario
router.get('/:id', usuariosController.obtenerUsuario);

// Usuario modificado
router.put('/:id', usuariosController.modificarUsuario);

// Usuario dado de baja
router.delete('/:id', usuariosController.darDeBajaUsuario);

// Preferencias del usuario
router.get('/:id/preferencias', usuariosController.obtenerPreferencias);

// Preferencias guardadas
router.put('/:id/preferencias', usuariosController.guardarPreferencias);

module.exports = router;
