const express = require('express');
const { sequelize } = require('./models/index');

// Importacion de rutas
const adminRutas = require('./rutas/admin');
const alertasRutas = require('./rutas/alertas');
const busquedasRutas = require('./rutas/busquedas');
const catalogosRutas = require('./rutas/catalogos');
const favoritosRutas = require('./rutas/favoritos');
const hotelesRutas = require('./rutas/hoteles');
const incidenciasRutas = require('./rutas/incidencias');
const ofertasRutas = require('./rutas/ofertas');
const proveedoresRutas = require('./rutas/proveedores');
const reservasRutas = require('./rutas/reservas');
const usuariosRutas = require('./rutas/usuarios');
const vuelosRutas = require('./rutas/vuelos');

const app = express();
const PORT = process.env.PORT || 4004;

// Middlewares para parsear JSON y formularios
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Endpoints de la API
app.use('/api/admin', adminRutas);
app.use('/api/alertas', alertasRutas);
app.use('/api/busquedas', busquedasRutas);
app.use('/api', catalogosRutas);
app.use('/api/favoritos', favoritosRutas);
app.use('/api/hoteles', hotelesRutas);
app.use('/api/incidencias', incidenciasRutas);
app.use('/api/ofertas', ofertasRutas);
app.use('/api/proveedores', proveedoresRutas);
app.use('/api/reservas', reservasRutas);
app.use('/api/usuarios', usuariosRutas);
app.use('/api/vuelos', vuelosRutas);

// Ruta de comprobación
app.get('/', (req, res) => {
    res.status(200).json({ mensaje: 'API de NebriTrabel funcionando correctamente' });
});

// Inicialización de Sequelize y arranque del servidor
sequelize.sync({ force: false })
    .then(() => {
        console.log('Conectado a la base de datos buscador_viajes con Sequelize');
        app.listen(PORT, () => {
            console.log(`Servidor de NebriTrabel corriendo en http://localhost:${PORT}`);
        });
    })
    .catch((error) => {
        console.error('Error al conectar con la base de datos:', error);
    });

// Cierre limpio
process.on('SIGINT', async () => {
    try {
        console.log('\nCerrando la conexión a la base de datos de NebriTrabel...');
        await sequelize.close();
        console.log('Conexión cerrada exitosamente.');
        process.exit(0);
    } catch (error) {
        console.error('Error al cerrar la base de datos:', error);
        process.exit(1);
    }
});