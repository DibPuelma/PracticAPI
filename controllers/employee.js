var util = require('util');
var Company  = require('../models/').Company;
var Employee = require('../models/').Employee;
var SellPoint = require('../models/').SellPoint;


var schema = {
  'name': {
    notEmpty: true,
    isLength: { options: [{ min: 1, max: 30 }] },
    errorMessage: 'Invalid name'
  },
  'last_name': {
    notEmpty: true,
    isLength: { options: [{ min: 1, max: 30 }] },
    errorMessage: 'Invalid last name'
  },
  'picture': { // add: is a url
    optional: true,
    errorMessage: 'Invalid picture'
  },
  'newSellpoints': {
    isArray: true,
    optional: true,
    errorMessage: 'Invalid existing options array'
  },
  'deletedSellpoints': {
    isArray: true,
    optional: true,
    errorMessage: 'Invalid deleted options array'
  }
};

var schemaUpdate = {
  'name': {
    optional: true,
    isLength: { options: [{ min: 1, max: 30 }] },
    errorMessage: 'Invalid name'
  },
  'last_name': {
    optional: true,
    isLength: { options: [{ min: 1, max: 30 }] },
    errorMessage: 'Invalid last name'
  },
  'picture': { // add: is a url
    optional: true,
    errorMessage: 'Invalid picture'
  },
  'newSellpoints': {
    isArray: true,
    optional: true,
    errorMessage: 'Invalid existing options array'
  },
  'deletedSellpoints': {
    isArray: true,
    optional: true,
    errorMessage: 'Invalid deleted options array'
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
    Employee.findAll({ where: { company_id: req.params.company_id }, include: SellPoint }).then(function (employees) {
      res.status(200).json(employees);
    }).catch(function (error) {
      res.status(500).json(error);
    });
  },

  show(req, res) {
    Company.findById(req.params.company_id).then(function (company) {
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
    req.checkBody(schema);

    req.getValidationResult().then(function(result) {
      if (!result.isEmpty()) {
        res.status(400).send('There have been validation errors: ' + util.inspect(result.array()));
        return;
      }
      var data = filterParams(req);
      data.company_id = req.params.company_id;

      Employee.create(data).then(function (newEmployee) {
        /*newEmployee.setCompany(company).then(function() {
          res.status(200).json(newEmployee);
        });*/
        // Update employee info

        var promises = [];

        // Add sellpoints
        if (req.body.newSellpoints.length > 0) {
          req.body.newSellpoints.map((sellpoint_id) => {
            var getSellpoint = SellPoint.findById(sellpoint_id)
            .then((sellpoint) => {
              console.log("antes");
              sellpoint.addEmployee(newEmployee);
            })
            .catch((error) => {
              console.log("?")
              res.status(500).json(error);
            })
            promises.push(getSellpoint);
          });
        }

        // Remove sellpoints
        if (req.body.deletedSellpoints.length > 0) {
          req.body.deletedSellpoints.map((sellpoint_id) => {
            var getSellpoint = SellPoint.findById(sellpoint_id)
            .then((sellpoint) => {
              sellpoint.removeEmployee(newEmployee);
            })
            .catch((error) => {
              res.status(500).json(error);
            })
            promises.push(getSellpoint);
          });
        }

        // Answer resquest
        Promise.all(promises)
        .then(() => {
          res.status(200).json(newEmployee);
        })
        .catch((error) => {
          res.status(500).json(error);
        })


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

      Employee.findById(req.params.id).then(function (updatedEmployee) {
        var promises = [];

        // Update employee info
        var updateEmployee = updatedEmployee.update(data);
        promises.push(updateEmployee);

        // Add sellpoints
        if (req.body.newSellpoints.length > 0) {
          req.body.newSellpoints.map((sellpoint_id) => {
            var getSellpoint = SellPoint.findById(sellpoint_id)
            .then((sellpoint) => {
              sellpoint.addEmployee(updatedEmployee);
            })
            .catch((error) => {
              res.status(500).json(error);
            })
            promises.push(getSellpoint);
          });
        }

        // Remove sellpoints
        if (req.body.deletedSellpoints.length > 0) {
          req.body.deletedSellpoints.map((sellpoint_id) => {
            var getSellpoint = SellPoint.findById(sellpoint_id)
            .then((sellpoint) => {
              sellpoint.removeEmployee(updatedEmployee);
            })
            .catch((error) => {
              res.status(500).json(error);
            })
            promises.push(getSellpoint);
          });
        }

        // Answer resquest
        Promise.all(promises)
        .then(() => {
          res.status(200).json(updatedEmployee);
        })
        .catch((error) => {
          res.status(500).json(error);
        })

      }).catch(function (error) {
        res.status(500).json(error);
      });

    });
  },
  addPicture(req, res) {
    Employee.findById(req.params.id)
    .then((employee) => {
      employee.update({picture: 'http://localhost:8000/' + req.file.path.replace('images/', '')})
      .then((updatedEmployee) => {
        res.status(200).json(updatedEmployee);
      })
      .catch((error) => {
        console.log(error);
        res.status(500).json(error);
      })
    })
  },
  delete(req, res) {
    Company.findById(req.params.company_id).then(function (company) {
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
