const db = require('../config/database');

// GET /api/reservas/usuario/:id  ->  Query (sin tabla Reserva)
exports.obtenerReservasUsuario = async (req, res) => {
    try {
        const { id } = req.params;
        // const [filas] = await db.query(/* Query (sin tabla Reserva) */, [/* parámetros */]);
        res.status(200).json({ mensaje: 'Reservas del usuario', id });
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener las reservas' });
    }
};

// GET /api/reservas/:id  ->  Query (sin tabla Reserva)
exports.obtenerReservaPorId = async (req, res) => {
    try {
        const { id } = req.params;
        // const [filas] = await db.query(/* Query (sin tabla Reserva) */, [/* parámetros */]);
        res.status(200).json({ mensaje: 'Detalle de la reserva', id });
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener la reserva' });
    }
};

// POST /api/reservas/hotel  ->  Query (sin tabla Reserva)
exports.crearReservaHotel = async (req, res) => {
    try {
        // const [filas] = await db.query(/* Query (sin tabla Reserva) */, [/* parámetros */]);
        res.status(201).json({ mensaje: 'Reserva de hotel creada' });
    } catch (error) {
        res.status(500).json({ error: 'Error al crear la reserva' });
    }
};

// POST /api/reservas/vuelo  ->  Query (sin tabla Reserva)
exports.crearReservaVuelo = async (req, res) => {
    try {
        // const [filas] = await db.query(/* Query (sin tabla Reserva) */, [/* parámetros */]);
        res.status(201).json({ mensaje: 'Reserva de vuelo creada' });
    } catch (error) {
        res.status(500).json({ error: 'Error al crear la reserva' });
    }
};

// DELETE /api/reservas/:id  ->  Query (sin tabla Reserva)
exports.cancelarReserva = async (req, res) => {
    try {
        const { id } = req.params;
        // const [filas] = await db.query(/* Query (sin tabla Reserva) */, [/* parámetros */]);
        res.status(200).json({ mensaje: 'Reserva cancelada', id });
    } catch (error) {
        res.status(500).json({ error: 'Error al cancelar la reserva' });
    }
};
