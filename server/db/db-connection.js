var mysql = require('mysql');

var Sequelize = require('sequelize');

db = new Sequelize(process.env.DBNAME || 'accomplish', process.env.DBUSER || 'root', process.env.DBPW || '', {
  host: process.env.DBHOST || 'localhost',
  dialect: 'mysql',
  port: process.env.DBPORT || 3306,
  pool: {
    min: 1,
    max: 5,
    idle: 20000
  }
});

db.authenticate()
  .then(function(err) {
    console.log('Connection has been established successfully.');
  }, function(err) {
    console.log('Unable to connect to the database: ', err);
  });

module.exports = db;