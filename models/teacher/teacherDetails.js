const { DataTypes } = require('sequelize');
const sequelize = require("../../db/database")

const TeacherDetails = sequelize.define('teacherdetails', {
    id: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true
    },
    firstName: {
        type: DataTypes.STRING(20),
        allowNull: false,
    },
    lastName: {
        type: DataTypes.STRING(20),
        allowNull: false,
    },
    phNumber: {
        type: DataTypes.BIGINT,
        allowNull: false,
    },
    gender: {
        type: DataTypes.STRING(8),
        allowNull: false,
    },
    yearOfExp: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    specification: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
    },
    subjects: {
        type: DataTypes.ARRAY(DataTypes.JSONB)
    },
    subjectsIdString: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    latitude: {
        type: DataTypes.DECIMAL(10, 8), // 10 total digits, 8 after the decimal point
        allowNull: false
    },
    longitude: {
        type: DataTypes.DECIMAL(11, 8), // 11 total digits, 8 after the decimal point
        allowNull: false
    },
    pinCode: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    address: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    profileImage: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    qualification: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
    },
    aaddharNo: {
        type: DataTypes.STRING(12),
        allowNull: false,
    },
    teacherId: {
        type: DataTypes.INTEGER,
        unique: true,
        allowNull: false
    }
})

module.exports = TeacherDetails