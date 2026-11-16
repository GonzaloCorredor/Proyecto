const db = require('../config/database');

// GET /api/favoritos/usuario/:id  ->  Query 6.3 y 6.4
exports.obtenerFavoritosUsuario = async (req, res) => {
    try {
        const { id } = req.params;
        // const [filas] = await db.query(/* Query 6.3 y 6.4 */, [/* parámetros */]);
        res.status(200).json({ mensaje: 'Favoritos del usuario', id });
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los favoritos' });
    }
};

// POST /api/favoritos/hotel  ->  Query 6.1
exports.añadirFavoritoHotel = async (req, res) => {
    try {
        const { id_usuario, id_hotel } = req.body;
        if (!id_usuario || !id_hotel) {
            return res.status(400).json({ error: 'Faltan datos obligatorios: id_usuario, id_hotel' });
        }
        // const [filas] = await db.query(/* Query 6.1 */, [/* parámetros */]);
        res.status(201).json({ mensaje: 'Hotel añadido a favoritos', datos: req.body });
    } catch (error) {
        res.status(500).json({ error: 'Error al añadir el favorito' });
    }
};

// POST /api/favoritos/vuelo  ->  Query 6.2
exports.añadirFavoritoVuelo = async (req, res) => {
    try {
        const { id_usuario, id_vuelo } = req.body;
        if (!id_usuario || !id_vuelo) {
            return res.status(400).json({ error: 'Faltan datos obligatorios: id_usuario, id_vuelo' });
        }
        // const [filas] = await db.query(/* Query 6.2 */, [/* parámetros */]);
        res.status(201).json({ mensaje: 'Vuelo añadido a favoritos', datos: req.body });
    } catch (error) {
        res.status(500).json({ error: 'Error al añadir el favorito' });
    }
};

// DELETE /api/favoritos/:id  ->  Query 6.5
exports.eliminarFavorito = async (req, res) => {
    try {
        const { id } = req.params;
        // const [filas] = await db.query(/* Query 6.5 */, [/* parámetros */]);
        res.status(200).json({ mensaje: 'Favorito eliminado', id });
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar el favorito' });
    }
};
