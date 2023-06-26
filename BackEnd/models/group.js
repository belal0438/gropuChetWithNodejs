const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const Groupdata = sequelize.define('group',{

    id:{
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    groupName: Sequelize.STRING,
});

module.exports = Groupdata
