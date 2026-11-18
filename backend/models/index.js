const sequelize = require('../config/database');

const Usuario = require('./Usuario');
const Preferencias = require('./Preferencias'); // Asume que creaste este archivo siguiendo el patrón
const Aerolinea = require('./Aerolinea');
const Aeropuerto = require('./Aeropuerto');
const Vuelo = require('./Vuelo');
const Hotel = require('./Hotel');
const Proveedor = require('./Proveedor');
const Favoritos = require('./Favoritos');

//Definir las relaciones

// Usuario Preferencias
Usuario.hasOne(Preferencias, { foreignKey: 'id_usuario' });
Preferencias.belongsTo(Usuario, { foreignKey: 'id_usuario' });

// Aerolinea Vuelo
Aerolinea.hasMany(Vuelo, { foreignKey: 'id_aerolinea' });
Vuelo.belongsTo(Aerolinea, { foreignKey: 'id_aerolinea' });

// Aeropuertos Vuelo
Aeropuerto.hasMany(Vuelo, { foreignKey: 'id_origen', as: 'VuelosOrigen' });
Vuelo.belongsTo(Aeropuerto, { foreignKey: 'id_origen', as: 'Origen' });

Aeropuerto.hasMany(Vuelo, { foreignKey: 'id_destino', as: 'VuelosDestino' });
Vuelo.belongsTo(Aeropuerto, { foreignKey: 'id_destino', as: 'Destino' });

// Proveedor Hotel
Proveedor.hasMany(Hotel, { foreignKey: 'id_proveedor' });
Hotel.belongsTo(Proveedor, { foreignKey: 'id_proveedor' });

// Usuario Favoritos
Usuario.hasMany(Favoritos, { foreignKey: 'id_usuario' });
Favoritos.belongsTo(Usuario, { foreignKey: 'id_usuario' });

Favoritos.belongsTo(Hotel, { foreignKey: 'id_hotel' });
Favoritos.belongsTo(Vuelo, { foreignKey: 'id_vuelo' });

//Exportar todo
module.exports = {
    sequelize,
    Usuario,
    Preferencias,
    Aerolinea,
    Aeropuerto,
    Vuelo,
    Hotel,
    Proveedor,
    Favoritos
};