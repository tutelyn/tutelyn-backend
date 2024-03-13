const { DataTypes } = require('sequelize');
const sequelize = require("../../db/database")

const StudentDetails = sequelize.define('studentdetail', {
  id: {
    primaryKey: true,
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,

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

  stream: {
    type: DataTypes.STRING(20),
    allowNull: false,
  },

  profileImage: {
    type: DataTypes.TEXT,
    allowNull: true

  },

  currentClass: {
    type: DataTypes.INTEGER,
    allowNull: false,

  },

  subjects: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: true,

  },
  subjectsIdString: {
    type: DataTypes.TEXT,
    allowNull: true,

  },
  institute: {
    type: DataTypes.TEXT,
    allowNull: true,

  },
  studentId: {
    type: DataTypes.INTEGER,
    unique: true,
    allowNull: false
  }

}, {

});

module.exports = StudentDetails