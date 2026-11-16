const db = require('../config/database');

// GET /api/servicios  ->  Query 2.10
exports.obtenerServicios = async (req, res) => {
    try {
        // const [filas] = await db.query(/* Query 2.10 */, [/* parámetros */]);
        res.status(200).json({ mensaje: 'Listado de servicios' });
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los servicios' });
    }
};

// GET /api/aeropuertos  ->  Query 3.10
exports.obtenerAeropuertos = async (req, res) => {
    try {
        // const [filas] = await db.query(/* Query 3.10 */, [/* parámetros */]);
        res.status(200).json({ mensaje: 'Listado de aeropuertos' });
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los aeropuertos' });
    }
};

// GET /api/aerolineas  ->  Query 3.10
exports.obtenerAerolineas = async (req, res) => {
    try {
        // const [filas] = await db.query(/* Query 3.10 */, [/* parámetros */]);
        res.status(200).json({ mensaje: 'Listado de aerolíneas' });
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener las aerolíneas' });
    }
};
