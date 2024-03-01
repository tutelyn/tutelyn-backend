
const { Sequelize } = require('sequelize');
const sequelize = new Sequelize({
    dialect: 'postgres',
    host: 'ep-late-dawn-28386266-pooler.ap-southeast-1.postgres.vercel-storage.com',
    username: 'default',
    password: 'FsjYCXPz4py2',
    database: 'verceldb',
    ssl: true,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false, // you can set it to true in production with a valid certificate
      }
    }
  });

  module.exports = sequelize