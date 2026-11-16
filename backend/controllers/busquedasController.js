const db = require('../config/database');

// GET /api/busquedas/populares  ->  Query 5.5
exports.obtenerDestinosPopulares = async (req, res) => {
    try {
        // const [filas] = await db.query(/* Query 5.5 */, [/* parámetros */]);
        res.status(200).json({ mensaje: 'Destinos más buscados' });
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los destinos populares' });
    }
};

// GET /api/busquedas/usuario/:id  ->  Query 5.3
exports.obtenerHistorialBusquedas = async (req, res) => {
    try {
        const { id } = req.params;
        // const [filas] = await db.query(/* Query 5.3 */, [/* parámetros */]);
        res.status(200).json({ mensaje: 'Historial de búsquedas del usuario', id });
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el historial' });
    }
};

// POST /api/busquedas/hotel  ->  Query 5.1
exports.guardarBusquedaHotel = async (req, res) => {
    try {
        const { id_usuario, destino, fecha_entrada, fecha_salida, huespedes, habitaciones } = req.body;
        if (!id_usuario || !destino || !fecha_entrada || !fecha_salida || !huespedes || !habitaciones) {
            return res.status(400).json({ error: 'Faltan datos obligatorios: id_usuario, destino, fecha_entrada, fecha_salida, huespedes, habitaciones' });
        }
        // const [filas] = await db.query(/* Query 5.1 */, [/* parámetros */]);
        res.status(201).json({ mensaje: 'Búsqueda de hotel guardada', datos: req.body });
    } catch (error) {
        res.status(500).json({ error: 'Error al guardar la búsqueda' });
    }
};

// POST /api/busquedas/vuelo  ->  Query 5.2
exports.guardarBusquedaVuelo = async (req, res) => {
    try {
        const { id_usuario, id_origen, id_destino, fecha_ida, pasajeros } = req.body;
        if (!id_usuario || !id_origen || !id_destino || !fecha_ida || !pasajeros) {
            return res.status(400).json({ error: 'Faltan datos obligatorios: id_usuario, id_origen, id_destino, fecha_ida, pasajeros' });
        }
        // const [filas] = await db.query(/* Query 5.2 */, [/* parámetros */]);
        res.status(201).json({ mensaje: 'Búsqueda de vuelo guardada', datos: req.body });
    } catch (error) {
        res.status(500).json({ error: 'Error al guardar la búsqueda' });
    }
};

// DELETE /api/busquedas/:id  ->  Query 5.4
exports.eliminarBusqueda = async (req, res) => {
    try {
        const { id } = req.params;
        // const [filas] = await db.query(/* Query 5.4 */, [/* parámetros */]);
        res.status(200).json({ mensaje: 'Búsqueda eliminada del historial', id });
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar la búsqueda' });
    }
};
