const { Sequelize } = require('sequelize');

const db = new Sequelize({
  dialect: process.env.DB_DIALECT,
  host: process.env.db_host,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  logging: false,
});

module.exports = { db };
// const { Sequelize } = require('sequelize');

// const db = new Sequelize({
//   dialect: 'postgres',
//   host: 'localhost',
//   username: 'postgres',
//   password: 'A1s2d3f4',
//   database: process.env.DB_DATABASE,
//   logging: false,
// });

// module.exports = { db };
