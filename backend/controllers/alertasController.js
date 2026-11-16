const db = require('../config/database');

// GET /api/alertas/disparadas  ->  Query 7.6
exports.obtenerAlertasDisparadas = async (req, res) => {
    try {
        // const [filas] = await db.query
        res.status(200).json({ mensaje: 'Alertas cuyo precio objetivo se ha alcanzado' });
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener las alertas disparadas' });
    }
};

// GET /api/alertas/usuario/:id  ->  Query 7.3
exports.obtenerAlertasUsuario = async (req, res) => {
    try {
        const { id } = req.params;
        // const [filas] = await db.query(/* Query 7.3 */, [/* parámetros */]);
        res.status(200).json({ mensaje: 'Alertas activas del usuario', id });
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener las alertas' });
    }
};

// POST /api/alertas/hotel  ->  Query 7.1
exports.crearAlertaHotel = async (req, res) => {
    try {
        const { id_usuario, id_hotel, precio_objetivo } = req.body;
        if (!id_usuario || !id_hotel || !precio_objetivo) {
            return res.status(400).json({ error: 'Faltan datos obligatorios: id_usuario, id_hotel, precio_objetivo' });
        }
        // const [filas] = await db.query(/* Query 7.1 */, [/* parámetros */]);
        res.status(201).json({ mensaje: 'Alerta de hotel creada', datos: req.body });
    } catch (error) {
        res.status(500).json({ error: 'Error al crear la alerta' });
    }
};

// POST /api/alertas/vuelo  ->  Query 7.2
exports.crearAlertaVuelo = async (req, res) => {
    try {
        const { id_usuario, id_vuelo, precio_objetivo } = req.body;
        if (!id_usuario || !id_vuelo || !precio_objetivo) {
            return res.status(400).json({ error: 'Faltan datos obligatorios: id_usuario, id_vuelo, precio_objetivo' });
        }
        // const [filas] = await db.query(/* Query 7.2 */, [/* parámetros */]);
        res.status(201).json({ mensaje: 'Alerta de vuelo creada', datos: req.body });
    } catch (error) {
        res.status(500).json({ error: 'Error al crear la alerta' });
    }
};

// PUT /api/alertas/:id  ->  Query 7.4
exports.desactivarAlerta = async (req, res) => {
    try {
        const { id } = req.params;
        // const [filas] = await db.query(/* Query 7.4 */, [/* parámetros */]);
        res.status(200).json({ mensaje: 'Alerta desactivada', id });
    } catch (error) {
        res.status(500).json({ error: 'Error al desactivar la alerta' });
    }
};

// DELETE /api/alertas/:id  ->  Query 7.5
exports.eliminarAlerta = async (req, res) => {
    try {
        const { id } = req.params;
        // const [filas] = await db.query(/* Query 7.5 */, [/* parámetros */]);
        res.status(200).json({ mensaje: 'Alerta eliminada', id });
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar la alerta' });
    }
};
