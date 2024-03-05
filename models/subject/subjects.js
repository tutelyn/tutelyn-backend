const { DataTypes } = require('sequelize');
const sequelize = require("../../db/database")

const Subject = sequelize.define('subject', {
    id: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,

    },
    subjectName: {
        type: DataTypes.STRING(20),
        allowNull: false,
        unique: true,
    },
    class: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }

}, {

});

module.exports = Subject