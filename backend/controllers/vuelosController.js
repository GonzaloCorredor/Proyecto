const db = require('../config/database');

// GET /api/vuelos  ->  Query 3.1
exports.obtenerVuelos = async (req, res) => {
    try {
        // const [filas] = await db.query(/* Query 3.1 */, [/* parámetros */]);
        res.status(200).json({ mensaje: 'Listado de vuelos' });
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los vuelos' });
    }
};

// GET /api/vuelos/buscar  ->  Query 3.3 / 3.4 / 3.5
exports.buscarVuelos = async (req, res) => {
    try {
        const { origen, destino, fecha } = req.query;
        if (!origen || !destino || !fecha) {
            return res.status(400).json({ error: 'Faltan parámetros obligatorios: origen, destino, fecha' });
        }
        // const [filas] = await db.query(/* Query 3.3 / 3.4 / 3.5 */, [/* parámetros */]);
        res.status(200).json({ mensaje: 'Resultados de búsqueda de vuelos', filtros: req.query });
    } catch (error) {
        res.status(500).json({ error: 'Error al buscar vuelos' });
    }
};

// GET /api/vuelos/comparar  ->  Query 3.6
exports.compararAerolineas = async (req, res) => {
    try {
        const { origen, destino } = req.query;
        if (!origen || !destino) {
            return res.status(400).json({ error: 'Faltan parámetros obligatorios: origen, destino' });
        }
        // const [filas] = await db.query(/* Query 3.6 */, [/* parámetros */]);
        res.status(200).json({ mensaje: 'Vuelo más barato por aerolínea', filtros: req.query });
    } catch (error) {
        res.status(500).json({ error: 'Error al comparar aerolíneas' });
    }
};

// GET /api/vuelos/:id  ->  Query 3.2
exports.obtenerVueloPorId = async (req, res) => {
    try {
        const { id } = req.params;
        // const [filas] = await db.query(/* Query 3.2 */, [/* parámetros */]);
        res.status(200).json({ mensaje: 'Detalle del vuelo', id });
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el vuelo' });
    }
};

// GET /api/vuelos/:id/ofertas  ->  Query 4.2
exports.obtenerOfertasVuelo = async (req, res) => {
    try {
        const { id } = req.params;
        // const [filas] = await db.query(/* Query 4.2 */, [/* parámetros */]);
        res.status(200).json({ mensaje: 'Ofertas del vuelo', id });
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener las ofertas del vuelo' });
    }
};

// POST /api/vuelos  ->  Query 3.7
exports.crearVuelo = async (req, res) => {
    try {
        const { id_aerolinea, id_origen, id_destino, fecha_salida, fecha_llegada } = req.body;
        if (!id_aerolinea || !id_origen || !id_destino || !fecha_salida || !fecha_llegada) {
            return res.status(400).json({ error: 'Faltan datos obligatorios: id_aerolinea, id_origen, id_destino, fecha_salida, fecha_llegada' });
        }
        // const [filas] = await db.query(/* Query 3.7 */, [/* parámetros */]);
        res.status(201).json({ mensaje: 'Vuelo creado', datos: req.body });
    } catch (error) {
        res.status(500).json({ error: 'Error al crear el vuelo' });
    }
};

// PUT /api/vuelos/:id  ->  Query 3.8
exports.modificarVuelo = async (req, res) => {
    try {
        const { id } = req.params;
        const { id_aerolinea, id_origen, id_destino, fecha_salida, fecha_llegada } = req.body;
        if (!id_aerolinea || !id_origen || !id_destino || !fecha_salida || !fecha_llegada) {
            return res.status(400).json({ error: 'Faltan datos obligatorios: id_aerolinea, id_origen, id_destino, fecha_salida, fecha_llegada' });
        }
        // const [filas] = await db.query(/* Query 3.8 */, [/* parámetros */]);
        res.status(200).json({ mensaje: 'Vuelo modificado', id, datos: req.body });
    } catch (error) {
        res.status(500).json({ error: 'Error al modificar el vuelo' });
    }
};

// DELETE /api/vuelos/:id  ->  Query 3.9
exports.eliminarVuelo = async (req, res) => {
    try {
        const { id } = req.params;
        // const [filas] = await db.query(/* Query 3.9 */, [/* parámetros */]);
        res.status(200).json({ mensaje: 'Vuelo eliminado', id });
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar el vuelo' });
    }
};
