const express = require('express');
const router = express.Router();

const proveedoresController = require('../controllers/proveedoresController');

// Listado de proveedores
router.get('/', proveedoresController.obtenerProveedores);

// Detalle del proveedor
router.get('/:id', proveedoresController.obtenerProveedorPorId);

// Proveedor creado
router.post('/', proveedoresController.crearProveedor);

// Proveedor modificado
router.put('/:id', proveedoresController.modificarProveedor);

// Proveedor eliminado
router.delete('/:id', proveedoresController.eliminarProveedor);

module.exports = router;
