var Sequelize = require('sequelize');
var db = new Sequelize('users', 'goals', '');

var User = db.define('User', {
  nameFirst: Sequelize.STRING,
  nameLast: Sequelize.STRING,
  authId: Sequelize.STRING,
  email: Sequelize.STRING,
  phone: Sequelize.STRING,
  public: {
    type: Sequelize.BOOLEAN,
    defaultValue: true
  },
  start: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW
  }
});

var Goal = db.define('Goal', {
  goalName: Sequelize.STRING,
  public: {
    type: Sequelize.BOOLEAN,
    defaultValue: true
  },
  complete: {
    type: Sequelize.BOOLEAN,
    defaultValue: true
  },
  start: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW
  }
});

var Backer = db.define('Backer', {
  backerName: Sequelize.STRING,
  backerEmail: Sequelize.STRING,
});

exports.User = User;
exports.Goal = Goal;
exports.Backer = Backer;
