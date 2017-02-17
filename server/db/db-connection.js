var mysql = require('mysql');

var connection = mysql.createConnection({
  user: 'root',
  password: '',
  database: 'accomplish'
});

connection.connect();

module.exports = connection;