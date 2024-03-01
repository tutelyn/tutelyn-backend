const { DataTypes } = require('sequelize');
const sequelize = require("../../db/database")

const Teacher = sequelize.define('teacher', {
  id: {
    primaryKey: true,
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,

  },
  userName: {
    type: DataTypes.STRING(20),
    allowNull: false,
    unique: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,

  },

  password: {

    type: DataTypes.STRING,
    allowNull: false,
  },
  OTP: {
    type: DataTypes.INTEGER,
    allowNull: true,
  }

}, {

});

module.exports = Teacher