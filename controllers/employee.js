var Company  = require('../models/company.js');
var Employee = require('../models/contest.js');

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
  'picture': {
    optional: true,
    errorMessage: 'Invalid picture'
  }
};

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
      Company.findById(req.params.companyId).then(function (company) {
        Employee.create(req.body).then(function (newEmployee) {
          res.status(200).json(newEmployee);
        }).catch(function (error){
          res.status(500).json(error);
        });
      }).catch(function (error) {
        res.status(500).json(error);
      });
    });
  },

  update(req, res) {
    req.checkParams(schema);

    req.getValidationResult().then(function(result) {
      Company.findById(req.params.companyId).then(function (company) {
        Employee.update(req.body, {
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
