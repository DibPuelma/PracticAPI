var util    = require('util');
var User    = require('../models/').User;
var Company = require('../models/').Company;
var Contest = require('../models/').Contest;
var Prize   = require('../models/').Prize;

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

var visible_attrs = [
  'id',
  'email',
  'first_name',
  'last_name',
  'birthdate',
  'gender',
  'facebook_id',
  'facebook_token',
  'status',
  'created_at',
  'updated_at'
];

var filterKeys = function(object, allowedKeys) {
  var data = {};
  for (var attr in object) {
    if (allowedKeys.indexOf(attr) > -1) {
      data[attr] = object[attr];
    }
  }
  return data;
}


module.exports = {
  index(req, res) {
    console.log("1");
    User.findAll().then(function (users) {
      console.log("2");
      res.status(200).json(users);
    }).catch(function (error) {
      res.status(500).json(error);
    });
  },

  show(req, res) {
    User.findById(req.params.id).then(function (user) {
      res.status(200).json(filterKeys(user.dataValues, visible_attrs));
    }).catch(function (error){
      res.status(500).json(error);
    });
  },

  create(req, res) {
    console.log(req.body);
    req.checkBody(schema);

    req.getValidationResult().then(function(result) {
      if (!result.isEmpty()) {
        res.status(500).json({code: "VALIDATION_ERROR", error: result.array() });
        return;
      }

      var data = filterParams(req);
      data['status'] = 'active';

      User.create(data).then(function (newUser) {
        response = {code: 'OK', user: filterKeys(newUser.dataValues, visible_attrs)};
        res.status(200).json(response);
      }).catch(function (error){
        res.status(500).json(error);
      });
    });
  },

  update(req, res) {
    req.checkBody(schemaUpdate);

    req.getValidationResult().then(function(result) {
      if (!result.isEmpty()) {
        res.status(500).json({code: "VALIDATION_ERROR", error: result.array() });
        return;
      }

      var data = filterParams(req);

      User.update(data, { where: {id: req.params.id}}).then(function(result) {
        result['code'] = 'OK';
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
      user.getContests({ include: [Company, {model: Prize, include: User}]}).then(function(contests) {
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
      req.session.logged = false;
    }

    User.findOne( { where: {email: req.body.email} } ).then(function (user) {
      if (user.password == req.body.password) {
       req.session.logged = true;
       res.status(200).json({ code: "OK", message: "logged in", user: filterKeys(user.dataValues, visible_attrs) });
      } else {
        res.status(500).json({ code: "WRONG_PASSWORD", message: "wrong password" });
      }
    }).catch(function (error){
      error['code'] = "USER_DOES_NOT_EXIT";
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
  },

  prizes(req, res) {
    Prize.findAll( {where: { winner: req.params.id }, include: { model: Contest, include: Company } } ).then(function(prizes) {
      res.status(200).json(prizes);
    }).catch(function (error) {
      res.status(500).json(error);
    });
  }

};
