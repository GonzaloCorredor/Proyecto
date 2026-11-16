const db = require('../config/database');

// POST /api/admin/login  ->  Query 8.3
exports.loginAdmin = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ error: 'Faltan datos obligatorios: email, password' });
        }
        // const [filas] = await db.query(/* Query 8.3 */, [/* parámetros */]);
        res.status(200).json({ mensaje: 'Administrador autenticado', datos: req.body });
    } catch (error) {
        res.status(500).json({ error: 'Error al iniciar sesión' });
    }
};

// GET /api/admin/resumen  ->  Query 8.7
exports.obtenerResumenAdmin = async (req, res) => {
    try {
        // const [filas] = await db.query(/* Query 8.7 */, [/* parámetros */]);
        res.status(200).json({ mensaje: 'Resumen del panel de administración' });
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el resumen' });
    }
};

// GET /api/admin/incidencias  ->  Query 8.4
exports.obtenerIncidenciasPendientes = async (req, res) => {
    try {
        // const [filas] = await db.query(/* Query 8.4 */, [/* parámetros */]);
        res.status(200).json({ mensaje: 'Incidencias pendientes' });
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener las incidencias' });
    }
};

// GET /api/admin/incidencias/:id  ->  Query 8.6
exports.obtenerGestionIncidencia = async (req, res) => {
    try {
        const { id } = req.params;
        // const [filas] = await db.query(/* Query 8.6 */, [/* parámetros */]);
        res.status(200).json({ mensaje: 'Historial de gestión de la incidencia', id });
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener la gestión' });
    }
};

// PUT /api/admin/incidencias/:id  ->  Query 8.5
exports.gestionarIncidencia = async (req, res) => {
    try {
        const { id } = req.params;
        const { id_admin, estado } = req.body;
        if (!id_admin || !estado) {
            return res.status(400).json({ error: 'Faltan datos obligatorios: id_admin, estado' });
        }
        // const [filas] = await db.query(/* Query 8.5 */, [/* parámetros */]);
        res.status(200).json({ mensaje: 'Incidencia gestionada', id, datos: req.body });
    } catch (error) {
        res.status(500).json({ error: 'Error al gestionar la incidencia' });
    }
};
