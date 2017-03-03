var util = require('util');
var fs = require('fs');

var Company = require('../models/').Company;
var SellPoint = require('../models/').SellPoint;
var Manager = require('../models/').Manager;

var schema = {
  'email': {
    notEmpty: true,
    isEmail: true,
    errorMessage: 'Invalid email'
  },
  'name': {
    notEmpty: true,
    isLength: { options: [{ min: 1, max: 30 }] },
    errorMessage: 'Invalid name'
  },
  //TODO: VALIDATE URL OR IMAGE
  'logo': {
    optional: true,
    errorMessage: 'Invalid logo'
  }
};

var schemaUpdate = {
  'email': {
    optional: true,
    isEmail: true,
    errorMessage: 'Invalid email'
  },
  'name': {
    optional: true,
    isLength: { options: [{ min: 1, max: 30 }] },
    errorMessage: 'Invalid name'
  },
  //TODO: VALIDATE URL OR IMAGE
  'logo': {
    optional: true,
    errorMessage: 'Invalid logo'
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
    Company.findAll({include: [Manager]}).then(function (companies) {
      res.status(200).json(companies);
    }).catch(function (error) {
      res.status(500).json(error);
    });
  },

  show(req, res) {
    Company.findById(req.params.id, {include: [SellPoint, Manager]}).then(function (company) {
      res.status(200).json(company);
    }).catch(function (error){
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

      Company.create(data).then(function (newCompany) {
        // var dir = 'images/companies/' + newCompany.name;
        //
        // if (!fs.existsSync(dir)){
        //   fs.mkdirSync(dir);
        // }

        res.status(200).json(newCompany);

      }).catch(function (error){
        console.log(error);
        res.status(500).json(error);
      });
    });
  },
  addLogo(req, res) {
    console.log(req.file);
    Company.findById(req.params.company_id)
    .then((company) => {
      console.log('replaced', req.file.path.replace('images/', ''));
      company.update({logo: 'http://localhost:8000/' + req.file.path.replace('images/', '')})
      .then((updatedCompany) => {
        res.status(200).json(updatedCompany);
      })
      .catch((error) => {
        console.log(error);
        res.status(500).json(error);
      })
    })
  },
  update(req, res) {
    req.checkBody(schemaUpdate);

    req.getValidationResult().then(function(result) {
      if (!result.isEmpty()) {
        res.status(400).send('There have been validation errors: ' + util.inspect(result.array()));
        return;
      }
      var data = filterParams(req);

      Company.update(data, { where: { id: req.params.id } }).then(function (updatedCompany) {
        res.status(200).json(updatedCompany);
      }).catch(function (error){
        res.status(500).json(error);
      });
    });
  },

  delete(req, res) {
    Company.destroy({
      where: {
        id: req.params.id
      }
    }).then(function (deletedCompany) {
      res.status(200).json(deletedCompany);
    }).catch(function (error){
      res.status(500).json(error);
    });
  }
};
