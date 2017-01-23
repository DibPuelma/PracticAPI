var util = require('util');
var User = require('../models/').User;

var schema = {
  'email': {
    notEmpty: true,
    isEmail: true,
    errorMessage: 'Invalid email'
  },
  'first_name': {
    notEmpty: true,
    isLength: { options: [{ min: 1, max: 30 }] },
    errorMessage: 'Invalid first name'
  },
  'last_name': {
    notEmpty: true,
    isLength: { options: [{ min: 1, max: 30 }] },
    errorMessage: 'Invalid last name'
  },
  'birthdate': {
    notEmpty: true,
    errorMessage: 'Invalid birthdate'
  },
  'gender': {
    notEmpty: true,
    isIn: { options: [['m', 'f', 'o']] },
    errorMessage: 'Invalid gender'
  },
  'facebook_id': {
    optional: true,
    errorMessage: 'Invalid facebook id'
  },
  'facebook_token': {
    optional: true,
    errorMessage: 'Invalid facebook token'
  },
  'password': {
    notEmpty: true,
    isLength: { options: [{ min: 4, max: 30 }] },
    errorMessage: 'Invalid password'
  }
};

var schemaUpdate = {
  'email': {
    optional: true,
    isEmail: true,
    errorMessage: 'Invalid email'
  },
  'first_name': {
    optional: true,
    isLength: { options: [{ min: 1, max: 30 }] },
    errorMessage: 'Invalid first name'
  },
  'last_name': {
    optional: true,
    isLength: { options: [{ min: 1, max: 30 }] },
    errorMessage: 'Invalid last name'
  },
  'birthdate': {
    optional: true,
    errorMessage: 'Invalid birthdate'
  },
  'gender': {
    optional: true,
    isIn: { values: ['m', 'f', 'o'] },
    errorMessage: 'Invalid gender'
  },
  'facebook_id': {
    optional: true,
    errorMessage: 'Invalid facebook id'
  },
  'facebook_token': {
    optional: true,
    errorMessage: 'Invalid facebook token'
  },
  'password': {
    optional: true,
    isLength: { options: [{ min: 4, max: 30 }] },
    errorMessage: 'Invalid facebook password'
  }
};

var filterParams = function(req) {
  var keys = Object.keys(schema);

  var data = {};
  for (var param in req.body)
    if (keys.indexOf(param) > -1) 
      data[param] = req.body[param];

  return data;
}

module.exports = {
  index(req, res) {
    User.findAll().then(function (users) {
      res.status(200).json(users);
    }).catch(function (error) {
      res.status(500).json(error);
    });
  },

  show(req, res) {
    User.findById(req.params.id).then(function (user) {
      res.status(200).json(user);
    }).catch(function (error){
      res.status(500).json(error);
    });
  },

  create(req, res) {
    console.log(req.body);
    req.checkBody(schema);

    req.getValidationResult().then(function(result) {
      if (!result.isEmpty()) {
        res.status(400).send('There have been validation errors: ' + util.inspect(result.array()));
        return;
      }

      var data = filterParams(req);

      User.create(data).then(function (newUser) {
        res.status(200).json(newUser);
      }).catch(function (error){
        res.status(500).json(error);
      });
    });
  },

  update(req, res) {
    req.checkBody(schemaUpdate);

    req.getValidationResult().then(function(result) {
      if (!result.isEmpty()) {
        res.status(400).send('There have been validation errors: ' + util.inspect(result.array()));
        return;
      }

      var data = filterParams(req);

      User.update(data, { where: {id: req.params.id}}).then(function(result) {
        res.status(200).json(result);
      }).catch(function(error) {
        res.status(500).json(error);
      });

    });
  },

  delete(req, res) {
    User.destroy({
      where: {
        id: req.params.id
      }
    }).then(function (deletedUser) {
      res.status(200).json(deletedUser);
    }).catch(function (error){
      res.status(500).json(error);
    });
  },

  contests(req, res) {
    User.findById(req.params.id).then(function (user) {
      user.getContests().then(function(contests) {
        res.status(200).json(contests);
      }).catch(function (error){
      res.status(500).json(error);
      });
    }).catch(function (error){
      res.status(500).json(error);
    });
  },

  login(req, res) {
    if (req.session.logged) {
      res.status(200).json({ message: "already logged in" });
      return;
    } 
      User.findById(req.params.id).then(function (user) {
        if (user.password == req.body.password) {
         req.session.logged = true;
         res.status(200).json({ message: "logged in" });
        } else {
          res.status(500).json({ message: "wrong password" });
        }
      }).catch(function (error){
        res.status(500).json(error);
      });
    
  },

  logout(req, res) {
    if (!req.session.logged) {
      res.status(200).json({ message: "you are not logged" });
      return;
    } 

    req.session.logged = false;
    res.status(200).json({message: "logged out"});
  }

};
