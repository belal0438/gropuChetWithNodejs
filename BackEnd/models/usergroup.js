const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const UserGroup = sequelize.define('usergroup',{

    id:{
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    isAdmin:{
        type: Sequelize.BOOLEAN
    }
});

module.exports = UserGroup
