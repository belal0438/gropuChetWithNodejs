const Sequelize = require('sequelize');

const sequelize = new Sequelize('gropuchatapp', 'root', 'B#5266@belal', {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = sequelize;