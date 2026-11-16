const express = require('express');

const app = express();
const PORT = 4004;

// Middleware para recibir JSON
app.use(express.json());

// Importar rutas
const hotelesRoutes = require('./rutas/hoteles');
const vuelosRoutes = require('./rutas/vuelos');
const usuariosRoutes = require('./rutas/usuarios');
const reservasRoutes = require('./rutas/reservas');
const busquedasRoutes = require('./rutas/busquedas');
const favoritosRoutes = require('./rutas/favoritos');
const alertasRoutes = require('./rutas/alertas');
const ofertasRoutes = require('./rutas/ofertas');
const proveedoresRoutes = require('./rutas/proveedores');
const catalogosRoutes = require('./rutas/catalogos');
const incidenciasRoutes = require('./rutas/incidencias');
const adminRoutes = require('./rutas/admin');

// Registrar rutas
app.use('/api/hoteles', hotelesRoutes);
app.use('/api/vuelos', vuelosRoutes);
app.use('/api/usuarios', usuariosRoutes);
app.use('/api/reservas', reservasRoutes);
app.use('/api/busquedas', busquedasRoutes);
app.use('/api/favoritos', favoritosRoutes);
app.use('/api/alertas', alertasRoutes);
app.use('/api/ofertas', ofertasRoutes);
app.use('/api/proveedores', proveedoresRoutes);
app.use('/api', catalogosRoutes);
app.use('/api/incidencias', incidenciasRoutes);
app.use('/api/admin', adminRoutes);

// Ruta principal
app.get('/', (req, res) => {
    res.send('API de hoteles y vuelos funcionando');
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor funcionando en http://localhost:${PORT}`);
});
