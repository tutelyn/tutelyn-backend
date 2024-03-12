const { DataTypes, Sequelize } = require('sequelize');
const sequelize = require("../../db/database")

const City = sequelize.define('city', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    latitude: {
        type: DataTypes.DECIMAL(10, 8), // 10 total digits, 8 after the decimal point
        allowNull: false
    },

    longitude: {
        type: DataTypes.DECIMAL(11, 8), // 11 total digits, 8 after the decimal point
        allowNull: false
    }
})

module.exports = City