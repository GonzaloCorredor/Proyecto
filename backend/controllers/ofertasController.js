const db = require('../config/database');

// POST /api/ofertas  ->  Query 4.3
exports.crearOferta = async (req, res) => {
    try {
        const { id_proveedor, precio } = req.body;
        if (!id_proveedor || !precio) {
            return res.status(400).json({ error: 'Faltan datos obligatorios: id_proveedor, precio' });
        }
        // const [filas] = await db.query(/* Query 4.3 */, [/* parámetros */]);
        res.status(201).json({ mensaje: 'Oferta creada', datos: req.body });
    } catch (error) {
        res.status(500).json({ error: 'Error al crear la oferta' });
    }
};

// PUT /api/ofertas/:id  ->  Query 4.4
exports.actualizarPrecioOferta = async (req, res) => {
    try {
        const { id } = req.params;
        const { precio } = req.body;
        if (!precio) {
            return res.status(400).json({ error: 'Faltan datos obligatorios: precio' });
        }
        // const [filas] = await db.query(/* Query 4.4 */, [/* parámetros */]);
        res.status(200).json({ mensaje: 'Precio de la oferta actualizado', id, datos: req.body });
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar la oferta' });
    }
};

// DELETE /api/ofertas/:id  ->  Query 10.5
exports.eliminarOferta = async (req, res) => {
    try {
        const { id } = req.params;
        // const [filas] = await db.query(/* Query 10.5 */, [/* parámetros */]);
        res.status(200).json({ mensaje: 'Oferta eliminada', id });
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar la oferta' });
    }
};
