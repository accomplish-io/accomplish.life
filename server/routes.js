module.exports = function(app, express, db) {
  //add routes and controller based on database endpoints

  app.post('/api/auth', function(req, res) {
    console.log('Attempting to create new user');
    //console.log('Reqest body: ', req.body);
    db.Users.findOrCreate({where: {
      name: req.body.name,
      email: req.body.email
    }})
      .then(function(user) {
        res.send(user)
      });
  });

  app.put('/api/users/:userid', function(req, res) {
    db.Users.findOne({
      where: {
        userid: req.params.userid
      }
    })
      .then(function(user) {
        user.update(req.body);
        res.send(user);
      });
  });

  app.get('/api/users/:userid', function(req, res) {
    db.Users.findOne({
      where: {
        userid: req.params.userid
      }
    })
      .then(function(user) {
        res.send(user);
      });
  });

  app.get('/api/goals/:userid', function(req, res) {
    db.Goals.findAll({
      where: {
        userid: req.params.userid
      }
    })
      .then(function(results) {
        res.send(results);
      });
  });

  app.post('/api/goals/:userid', function(req, res) {
    db.Users.findOne({
      where: {
        email: req.params.email
      }
    })
      .then(function(user) {
        db.Goals.create({
          userid: req.params.userid,
          // rest of schema
        })
          .then(function(goal) {
            res.send(goal)
          });
      })
      .catch(function (error) {
        res.send(`Error: ${e}`)
      });
  });

  app.delete('/api/goal/:id', function(req, res) {
    db.Goals.destroy({
      where: { id: req.params.id }
    })
      .then(function() {
        res.send('Task deleted');
      });
  });

  app.get('/api/goal/:id', function(req, res) {
    db.Goals.findOne({
      where: {
        id: req.params.id
      }
    })
      .then(function(goal) {
        res.send(goal);
      });
  });

  app.put('/api/goal/:id', function(req, res) {
    db.Goals.findOne({
      where: {
        id: req.params.id
      }
    })
      .then(function(goal) {
        goal.update(req.body);
        res.send(goal);
      });
  });
}