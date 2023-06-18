const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const UserSignup = sequelize.define('user',{

    id:{
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    name: Sequelize.STRING,
    phone:Sequelize.DOUBLE,
    email:Sequelize.STRING,
    password:Sequelize.STRING
});

module.exports = UserSignup
