const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Vuelo = sequelize.define('Vuelo', {
    id_vuelo: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    id_aerolinea: { type: DataTypes.INTEGER, allowNull: false },
    id_origen: { type: DataTypes.INTEGER, allowNull: false },
    id_destino: { type: DataTypes.INTEGER, allowNull: false },
    fecha_salida: { type: DataTypes.DATE, allowNull: false },
    fecha_llegada: { type: DataTypes.DATE, allowNull: false },
    escalas: { type: DataTypes.INTEGER, defaultValue: 0 }
}, { 
    tableName: 'Vuelo', 
    timestamps: false 
});

module.exports = Vuelo;