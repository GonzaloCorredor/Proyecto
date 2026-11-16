const db = require('../config/database');

// GET /api/hoteles  ->  Query 2.1
exports.obtenerHoteles = async (req, res) => {
    try {
        // const [filas] = await db.query(/* Query 2.1 */, [/* parámetros */]);
        res.status(200).json({ mensaje: 'Listado de hoteles' });
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los hoteles' });
    }
};

// GET /api/hoteles/ciudades  ->  Query 2.11
exports.obtenerCiudades = async (req, res) => {
    try {
        // const [filas] = await db.query(/* Query 2.11 */, [/* parámetros */]);
        res.status(200).json({ mensaje: 'Ciudades disponibles' });
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener las ciudades' });
    }
};

// GET /api/hoteles/buscar  ->  Query 2.4 / 2.5
exports.buscarHoteles = async (req, res) => {
    try {
        const { ciudad } = req.query;
        if (!ciudad) {
            return res.status(400).json({ error: 'Faltan parámetros obligatorios: ciudad' });
        }
        // const [filas] = await db.query(/* Query 2.4 / 2.5 */, [/* parámetros */]);
        res.status(200).json({ mensaje: 'Resultados de búsqueda de hoteles', filtros: req.query });
    } catch (error) {
        res.status(500).json({ error: 'Error al buscar hoteles' });
    }
};

// GET /api/hoteles/:id  ->  Query 2.2 y 2.3
exports.obtenerHotelPorId = async (req, res) => {
    try {
        const { id } = req.params;
        // const [filas] = await db.query(/* Query 2.2 y 2.3 */, [/* parámetros */]);
        res.status(200).json({ mensaje: 'Detalle del hotel', id });
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el hotel' });
    }
};

// GET /api/hoteles/:id/ofertas  ->  Query 4.1
exports.obtenerOfertasHotel = async (req, res) => {
    try {
        const { id } = req.params;
        // const [filas] = await db.query(/* Query 4.1 */, [/* parámetros */]);
        res.status(200).json({ mensaje: 'Ofertas del hotel', id });
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener las ofertas del hotel' });
    }
};

// POST /api/hoteles  ->  Query 2.6
exports.crearHotel = async (req, res) => {
    try {
        const { id_proveedor, nombre } = req.body;
        if (!id_proveedor || !nombre) {
            return res.status(400).json({ error: 'Faltan datos obligatorios: id_proveedor, nombre' });
        }
        // const [filas] = await db.query(/* Query 2.6 */, [/* parámetros */]);
        res.status(201).json({ mensaje: 'Hotel creado', datos: req.body });
    } catch (error) {
        res.status(500).json({ error: 'Error al crear el hotel' });
    }
};

// POST /api/hoteles/:id/servicios  ->  Query 2.7
exports.asignarServicioHotel = async (req, res) => {
    try {
        const { id } = req.params;
        const { id_servicio } = req.body;
        if (!id_servicio) {
            return res.status(400).json({ error: 'Faltan datos obligatorios: id_servicio' });
        }
        // const [filas] = await db.query(/* Query 2.7 */, [/* parámetros */]);
        res.status(201).json({ mensaje: 'Servicio asignado al hotel', id, datos: req.body });
    } catch (error) {
        res.status(500).json({ error: 'Error al asignar el servicio' });
    }
};

// PUT /api/hoteles/:id  ->  Query 2.8
exports.modificarHotel = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre } = req.body;
        if (!nombre) {
            return res.status(400).json({ error: 'Faltan datos obligatorios: nombre' });
        }
        // const [filas] = await db.query(/* Query 2.8 */, [/* parámetros */]);
        res.status(200).json({ mensaje: 'Hotel modificado', id, datos: req.body });
    } catch (error) {
        res.status(500).json({ error: 'Error al modificar el hotel' });
    }
};

// DELETE /api/hoteles/:id  ->  Query 2.9
exports.eliminarHotel = async (req, res) => {
    try {
        const { id } = req.params;
        // const [filas] = await db.query(/* Query 2.9 */, [/* parámetros */]);
        res.status(200).json({ mensaje: 'Hotel eliminado', id });
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar el hotel' });
    }
};
