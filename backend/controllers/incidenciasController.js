const db = require('../config/database');

// GET /api/incidencias/usuario/:id  ->  Query 8.2
exports.obtenerIncidenciasUsuario = async (req, res) => {
    try {
        const { id } = req.params;
        // const [filas] = await db.query(/* Query 8.2 */, [/* parámetros */]);
        res.status(200).json({ mensaje: 'Incidencias del usuario', id });
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener las incidencias' });
    }
};

// POST /api/incidencias  ->  Query 8.1
exports.crearIncidencia = async (req, res) => {
    try {
        const { id_usuario, descripcion } = req.body;
        if (!id_usuario || !descripcion) {
            return res.status(400).json({ error: 'Faltan datos obligatorios: id_usuario, descripcion' });
        }
        // const [filas] = await db.query(/* Query 8.1 */, [/* parámetros */]);
        res.status(201).json({ mensaje: 'Incidencia creada', datos: req.body });
    } catch (error) {
        res.status(500).json({ error: 'Error al crear la incidencia' });
    }
};
