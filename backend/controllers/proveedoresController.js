const db = require('../config/database');

// GET /api/proveedores  ->  Query 4.5
exports.obtenerProveedores = async (req, res) => {
    try {
        // const [filas] = await db.query(/* Query 4.5 */, [/* parámetros */]);
        res.status(200).json({ mensaje: 'Listado de proveedores' });
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los proveedores' });
    }
};

// GET /api/proveedores/:id  ->  Query 10.1
exports.obtenerProveedorPorId = async (req, res) => {
    try {
        const { id } = req.params;
        // const [filas] = await db.query(/* Query 10.1 */, [/* parámetros */]);
        res.status(200).json({ mensaje: 'Detalle del proveedor', id });
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el proveedor' });
    }
};

// POST /api/proveedores  ->  Query 10.2
exports.crearProveedor = async (req, res) => {
    try {
        const { nombre } = req.body;
        if (!nombre) {
            return res.status(400).json({ error: 'Faltan datos obligatorios: nombre' });
        }
        // const [filas] = await db.query(/* Query 10.2 */, [/* parámetros */]);
        res.status(201).json({ mensaje: 'Proveedor creado', datos: req.body });
    } catch (error) {
        res.status(500).json({ error: 'Error al crear el proveedor' });
    }
};

// PUT /api/proveedores/:id  ->  Query 10.3
exports.modificarProveedor = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre } = req.body;
        if (!nombre) {
            return res.status(400).json({ error: 'Faltan datos obligatorios: nombre' });
        }
        // const [filas] = await db.query(/* Query 10.3 */, [/* parámetros */]);
        res.status(200).json({ mensaje: 'Proveedor modificado', id, datos: req.body });
    } catch (error) {
        res.status(500).json({ error: 'Error al modificar el proveedor' });
    }
};

// DELETE /api/proveedores/:id  ->  Query 10.4
exports.eliminarProveedor = async (req, res) => {
    try {
        const { id } = req.params;
        // const [filas] = await db.query(/* Query 10.4 */, [/* parámetros */]);
        res.status(200).json({ mensaje: 'Proveedor eliminado', id });
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar el proveedor' });
    }
};
