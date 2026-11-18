const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Hotel = sequelize.define('Hotel', {
    id_hotel: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    id_proveedor: { type: DataTypes.INTEGER, allowNull: false },
    nombre: { type: DataTypes.STRING(150), allowNull: false },
    direccion: { type: DataTypes.STRING(255) },
    ciudad: { type: DataTypes.STRING(100) },
    valoracion: { type: DataTypes.DECIMAL(3, 2) },
    descripcion: { type: DataTypes.TEXT }
}, { 
    tableName: 'Hotel', 
    timestamps: false 
});

module.exports = Hotel;