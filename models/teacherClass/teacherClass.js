const { DataTypes } = require('sequelize');
const sequelize = require("../../db/database")

const TeacherClass = sequelize.define("teacherclass", {
    id: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,

    },

    class: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },

    teacherid: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
})

module.exports = TeacherClass;