var util = require('util');
var Company  = require('../models/').Company;
var Contest = require('../models/').Contest;

var schema = {
  'name': {
    notEmpty: true,
    isLength: { options: [{ min: 1, max: 30 }] },
    errorMessage: 'Invalid name'
  },
  'draw_date': {
    notEmpty: true,
    isDate: {}
  },
  'start_date': {
    notEmpty: true,
    isDate: {}
  }
};

var schemaUpdate = {
  'name': {
    optional: true,
    isLength: { options: [{ min: 1, max: 30 }] },
    errorMessage: 'Invalid name'
  },
  'draw_date': {
    optional: true,
    toDate: true
  },
  'start_date': {
    optional: true,
    toDate: true
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
    Contest.findAll({ where: { company_id: req.params.companyId } }).then(function (contests) {
      res.status(200).json(contests);
    }).catch(function (error) {
      res.status(500).json(error);
    });
  },

  show(req, res) {
    Company.findById(req.params.companyId).then(function (company) {
      Contest.findById(req.params.id).then(function (contest) {
        res.status(200).json(contest);
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

      Company.findById(req.params.companyId).then(function (company) {
        Contest.create(data).then(function (newContest) {
          newContest.setCompany(company).then(function() {
            res.status(200).json(newContest);
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
    req.checkBody(schemaUpdate);

    req.getValidationResult().then(function(result) {
      if (!result.isEmpty()) {
        res.status(400).send('There have been validation errors: ' + util.inspect(result.array()));
        return;
      }
      var data = filterParams(req);

      Company.findById(req.params.companyId).then(function (company) {
        Contest.update(data, { where: { id: req.params.id } }).then(function (updatedContest) {
          res.status(200).json(updatedContest);
        }).catch(function (error){
          res.status(500).json(error);
        });
      }).catch(function (error) {
        res.status(500).json(error);
      });
    });
  },

  delete(req, res) {
    Company.findById(req.params.companyId).then(function (company) {
      Contest.destroy({
        where: {
          id: req.params.id
        }
      }).then(function (deletedContest) {
        res.status(200).json(deletedContest);
      }).catch(function (error){
        res.status(500).json(error);
      });
    }).catch(function (error) {
      res.status(500).json(error);
    });  
  }
};
