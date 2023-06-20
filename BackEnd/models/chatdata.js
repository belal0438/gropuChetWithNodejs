const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const Chatdata = sequelize.define('data',{

    id:{
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    data: Sequelize.STRING,
});

module.exports = Chatdata
