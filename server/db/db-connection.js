var mysql = require('mysql');

var Sequelize = require('sequelize');

db = new Sequelize('accomplish1', 'AccomplishIO', 'hrr21brach', {
    host: 'rds-mysql-accomplish1.cqrshccyvmut.us-east-2.rds.amazonaws.com',
    dialect: 'mysql',
    port: 3306,
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

/*
var connection = mysql.createConnection({
  user: 'root',
  password: '',
  database: 'accomplish'
});

connection.connect();
*/
module.exports = db;