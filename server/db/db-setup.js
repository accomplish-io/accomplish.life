var Sequelize = require('sequelize');
var db = new Sequelize('users', 'goals', '');

var User = db.define('User', {
});

var Goal = db.define('Goal', {
});

var Backer = db.define('Backer', {
});

exports.User = User;
exports.Goal = Goal;
exports.Backer = Backer;
