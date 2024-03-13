const { DataTypes } = require('sequelize');
const sequelize = require("../../db/database")

const Batch = sequelize.define("batch", {
    id: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,

    },
    subjects: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
    },
    classid: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },

})

module.exports = Batch;