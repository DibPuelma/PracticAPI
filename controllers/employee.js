var Company  = require('../models/company.js');
var Employee = require('../models/contest.js');

var schema = {
  'name': {
    notEmpty: true,
    isLength: { options: [{ min: 1, max: 30 }] },
    errorMessage: 'Invalid name'
  },
  'lastName': {
    notEmpty: true,
    isLength: { options: [{ min: 1, max: 30 }] },
    errorMessage: 'Invalid last name'
  },
  'picture': { // add: is a url
    optional: true,
    errorMessage: 'Invalid picture'
  }
};

var schemaUpdate = {
  'name': {
    optional: true,
    isLength: { options: [{ min: 1, max: 30 }] },
    errorMessage: 'Invalid name'
  },
  'lastName': {
    optional: true,
    isLength: { options: [{ min: 1, max: 30 }] },
    errorMessage: 'Invalid last name'
  },
  'picture': { // add: is a url
    optional: true,
    errorMessage: 'Invalid picture'
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
    Company.findById(req.params.companyId).then(function (company) {
      Employee.findAll().then(function (employees) {
        res.status(200).json(employees);
      }).catch(function (error) {
        res.status(500).json(error);
      });
    }).catch(function (error) {
      res.status(500).json(error);
    });  
  },

  show(req, res) {
    Company.findById(req.params.companyId).then(function (company) {
      Employee.findById(req.params.id).then(function (employee) {
        res.status(200).json(employee);
      }).catch(function (error){
        res.status(500).json(error);
      });
    }).catch(function (error) {
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
      
      Company.findById(req.params.companyId).then(function (company) {
        Employee.create(data).then(function (newEmployee) {
          newEmployee.setCompany(company).then(function() {
            res.status(200).json(newEmployee);
          });
        }).catch(function (error){
          res.status(500).json(error);
        });
      }).catch(function (error) {
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

      Company.findById(req.params.companyId).then(function (company) {
        Employee.update(data, {
          where: {
            id: req.params.id
          }
        }).then(function (updatedEmployee) {
          res.status(200).json(updatedEmployee);
        }).catch(function (error) {
          res.status(500).json(error);
        });
      }).catch(function (error) {
          res.status(500).json(error);
      });
    });
  },

  delete(req, res) {
    Company.findById(req.params.companyId).then(function (company) {
      Employee.destroy({
        where: {
          id: req.params.id
        }
      }).then(function (deletedEmployee) {
        res.status(200).json(deletedEmployee);
      }).catch(function (error) {
        res.status(500).json(error);
      });
    }).catch(function (error) {
        res.status(500).json(error);
    });

  }
};
