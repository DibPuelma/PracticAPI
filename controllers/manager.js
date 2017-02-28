var Manager = require('../models/').Manager;
var Company = require('../models/').Company;

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
  'password': {
    notEmpty: true,
    isLength: { options: [{ min: 4, max: 30 }] },
    errorMessage: 'Invalid password'
  },
  'password_confirm': {
    notEmpty: true,
    isLength: { options: [{ min: 4, max: 30 }] },
    errorMessage: 'Invalid password'
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
  'company_id',
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
    Manager.findAll().then(function (managers) {
      managers.forEach(function(part, index) {
        managers[index].dataValues = filterKeys(managers[index].dataValues, visible_attrs);
      });

      res.status(200).json(managers);
    }).catch(function (error) {
      res.status(500).json(error);
    });
  },

  byCompany(req, res) {
    Manager.findAll({where: {company_id: req.params.company_id}}).then(function (managers) {
      managers.forEach(function(part, index) {
        managers[index].dataValues = filterKeys(managers[index].dataValues, visible_attrs);
      });

      res.status(200).json(managers);
    }).catch(function (error) {
      res.status(500).json(error);
    });
  },

  show(req, res) {
    Manager.findById(req.params.id).then(function (manager) {
      res.status(200).json(filterKeys(manager.dataValues, visible_attrs));
    }).catch(function (error){
      res.status(500).json(error);
    });
  },

  create(req, res) {
    req.checkBody(schema);

    req.getValidationResult().then(function(result) {
      if (!result.isEmpty()) {
        res.status(500).json({ code: "VALIDATION_ERROR", error: result.array() });
        return;
      }

      var data = filterParams(req);
      data['status'] = 'active';

      if(data.password !== data.password_confirm) {
        res.status(500).json({error: 'Las contraseñas no coinciden'});
      }

      Manager.create(data).then(function (newManager) {
        Company.findById(req.body.company_id)
        .then((company) => {
          company.addManager(newManager)
          .then(() => {
            response = { code: 'OK', manager: filterKeys(newManager.dataValues, visible_attrs) };
            res.status(200).json(response);
          })
          .catch((error) => {
            console.log(error);
            res.status(500).json(error);
          })
        })
      }).catch(function (error){
        console.log(error);
        res.status(500).json(error);
      });
    });
  },

  update(req, res) {
    req.checkBody(schema);

    req.getValidationResult().then(function(result) {
      if (!result.isEmpty()) {
        res.status(500).json({code: "VALIDATION_ERROR", error: result.array() });
        return;
      }

      var data = filterParams(req);

      if(data.password !== data.password_confirm) {
        res.status(500).json({error: 'Las contraseñas no coinciden'});
      }

      Manager.update(data, { where: {id: req.params.id } }).then(function(result) {
        result['code'] = 'OK';
        res.status(200).json(result);
      }).catch(function(error) {
        res.status(500).json(error);
      });

    });
  },

  delete(req, res) {
    Manager.destroy({ where: { id: req.params.id } }).then(function (manager) {
      res.status(200).json(manager);
    }).catch(function (error){
      res.status(500).json(error);
    });
  },

  login(req, res) {
    if (req.session.logged) {
      res.status(200).json({ code: "ALREADY_LOGGED", message: "already logged", manager: filterKeys(req.session.manager, visible_attrs) });
      return;
    }

    Manager.findOne( { where: { email: req.body.email } } ).then(function (manager) {
      if (manager.password == req.body.password) {
        req.session.manager = manager.dataValues;
        req.session.logged = true;
        res.status(200).json({ code: "OK", message: "logged in", manager: filterKeys(manager.dataValues, visible_attrs) });
      } else {
        res.status(500).json({ code: "WRONG_PASSWORD", message: "wrong password" });
      }
    }).catch(function (error){
      error['code'] = "MANAGER_DOES_NOT_EXIT";
      res.status(500).json(error);
    });

  },

  logout(req, res) {
    if (!req.session.logged) {
      res.status(200).json({ message: "you are not logged" });
      return;
    }

    req.session.manager = null;
    req.session.logged = false;
    res.status(200).json({message: "logged out"});
  },
}
