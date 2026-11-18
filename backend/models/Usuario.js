const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Usuario = sequelize.define('Usuario', {
    id_usuario: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nombre: { type: DataTypes.STRING(100), allowNull: false },
    apellidos: { type: DataTypes.STRING(150), allowNull: false },
    email: { type: DataTypes.STRING(150), allowNull: false, unique: true },
    password_hash: { type: DataTypes.STRING(255), allowNull: false },
    fecha_registro: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    estado: { type: DataTypes.BOOLEAN, defaultValue: true }
}, { 
    tableName: 'Usuario', 
    timestamps: false 
});

module.exports = Usuario;