const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('buscador_viajes', 'root', 'tu_contraseña_aqui', {
    host: 'localhost',
    dialect: 'mysql',
    logging: false // True para consultas en la terminañ
});

module.exports = sequelize;