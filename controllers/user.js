var User = require('../models/user.js');

var schema = {
  'email': {
    notEmpty: true,
    isEmail: true,
    errorMessage: 'Invalid email'
  },
  'firstName': {
    notEmpty: true,
    isLength: { options: [{ min: 1, max: 30 }] },
    errorMessage: 'Invalid first name'
  },
  'lastName': {
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
    isIn: { values: ['m', 'f', 'o'] },
    errorMessage: 'Invalid gender'
  },
  'facebookId': {
    optional: true,
    errorMessage: 'Invalid facebook id'
  },
  'facebookToken': {
    optional: true,
    errorMessage: 'Invalid facebook token'
  },
  'password': {
    notEmpty: true,
    isLength: { options: [{ min: 4, max: 30 }] },
    errorMessage: 'Invalid facebook password'
  }
};

var schemaUpdate = {
  'email': {
    optional: true,
    isEmail: true,
    errorMessage: 'Invalid email'
  },
  'firstName': {
    optional: true,
    isLength: { options: [{ min: 1, max: 30 }] },
    errorMessage: 'Invalid first name'
  },
  'lastName': {
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
  'facebookId': {
    optional: true,
    errorMessage: 'Invalid facebook id'
  },
  'facebookToken': {
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
  var keys = schema.keys();

  var data = {};
  for (var param in req.body)
    if (keys.indexOf(param) > -1) 
      data[type] = req.body[param];

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
    req.checkParams(schema);

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
    req.checkParams(schemaUpdate);

    req.getValidationResult().then(function(result) {
      if (!result.isEmpty()) {
        res.status(400).send('There have been validation errors: ' + util.inspect(result.array()));
        return;
      }

      var data = filterParams(req);

      User.update(data, {
        where: {
          id: req.params.id
        }
      }).then(function (updatedUser) {
        res.status(200).json(updatedUser);
      }).catch(function (error){
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
  }
};
