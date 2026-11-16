const db = require('../config/database');

// POST /api/usuarios/registro  ->  Query 1.1 y 1.2
exports.registrarUsuario = async (req, res) => {
    try {
        const { nombre, apellidos, email, password } = req.body;
        if (!nombre || !apellidos || !email || !password) {
            return res.status(400).json({ error: 'Faltan datos obligatorios: nombre, apellidos, email, password' });
        }
        // const [filas] = await db.query(/* Query 1.1 y 1.2 */, [/* parámetros */]);
        res.status(201).json({ mensaje: 'Usuario registrado', datos: req.body });
    } catch (error) {
        res.status(500).json({ error: 'Error al registrar el usuario' });
    }
};

// POST /api/usuarios/login  ->  Query 1.3
exports.iniciarSesion = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ error: 'Faltan datos obligatorios: email, password' });
        }
        // const [filas] = await db.query(/* Query 1.3 */, [/* parámetros */]);
        res.status(200).json({ mensaje: 'Sesión iniciada', datos: req.body });
    } catch (error) {
        res.status(500).json({ error: 'Error al iniciar sesión' });
    }
};

// GET /api/usuarios/:id  ->  Query 1.4
exports.obtenerUsuario = async (req, res) => {
    try {
        const { id } = req.params;
        // const [filas] = await db.query(/* Query 1.4 */, [/* parámetros */]);
        res.status(200).json({ mensaje: 'Datos del usuario', id });
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el usuario' });
    }
};

// PUT /api/usuarios/:id  ->  Query 1.5
exports.modificarUsuario = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, apellidos } = req.body;
        if (!nombre || !apellidos) {
            return res.status(400).json({ error: 'Faltan datos obligatorios: nombre, apellidos' });
        }
        // const [filas] = await db.query(/* Query 1.5 */, [/* parámetros */]);
        res.status(200).json({ mensaje: 'Usuario modificado', id, datos: req.body });
    } catch (error) {
        res.status(500).json({ error: 'Error al modificar el usuario' });
    }
};

// DELETE /api/usuarios/:id  ->  Query 1.7
exports.darDeBajaUsuario = async (req, res) => {
    try {
        const { id } = req.params;
        // const [filas] = await db.query(/* Query 1.7 */, [/* parámetros */]);
        res.status(200).json({ mensaje: 'Usuario dado de baja', id });
    } catch (error) {
        res.status(500).json({ error: 'Error al dar de baja al usuario' });
    }
};

// GET /api/usuarios/:id/preferencias  ->  Query 1.4
exports.obtenerPreferencias = async (req, res) => {
    try {
        const { id } = req.params;
        // const [filas] = await db.query(/* Query 1.4 */, [/* parámetros */]);
        res.status(200).json({ mensaje: 'Preferencias del usuario', id });
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener las preferencias' });
    }
};

// PUT /api/usuarios/:id/preferencias  ->  Query 1.6
exports.guardarPreferencias = async (req, res) => {
    try {
        const { id } = req.params;
        // const [filas] = await db.query(/* Query 1.6 */, [/* parámetros */]);
        res.status(200).json({ mensaje: 'Preferencias guardadas', id });
    } catch (error) {
        res.status(500).json({ error: 'Error al guardar las preferencias' });
    }
};
