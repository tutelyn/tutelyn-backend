const { DataTypes } = require('sequelize');
const sequelize = require("../../db/database")

const Student_Batch = sequelize.define('student_batch', {
    id: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true
    }
});
module.exports = Student_Batch;