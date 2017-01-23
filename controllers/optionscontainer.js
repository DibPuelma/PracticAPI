var PossibleOption = require('../models/').PossibleOption;
var Company = require('../models/').Company;
var OptCont = require('../models').OptionsContainer;
var util = require('util');

var schema = {
  'name': {
    notEmpty: true,
    isLength: { options: [{ min: 1, max: 30 }] },
    errorMessage: 'Invalid name, must have between 1 and 30 characters'
  },
  'allow_other': {
    notEmpty: true,
    isBoolean: true,
    errorMessage: 'Invalid allow other, must be boolean'
  },
  'newOptions': {
    isArray: true,
    notEmpty: true,
    errorMessage: 'Invalid new options array'
  },
  'existingOptions': {
    isArray: true,
    notEmpty: true,
    errorMessage: 'Invalid existing options array'
  }
};

var schemaUpdate = {
  'name': {
    optional: true,
    isLength: { options: [{ min: 1, max: 30 }] },
    errorMessage: 'Invalid name, must have between 1 and 30 characters'
  },
  'allow_other': {
    optional: true,
    isBoolean: true,
    errorMessage: 'Invalid allow other, must be boolean'
  },
  'newOptions': {
    isArray: true,
    optional: true,
    errorMessage: 'Invalid new options array'
  },
  'existingOptions': {
    isArray: true,
    optional: true,
    errorMessage: 'Invalid existing options array'
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
  index(req, res){
    OptCont.findAll(where: {company_id: req.params.company_id}, {include: PossibleOption})
    .then((optconts) => {
      res.status(200).json(optconts);
    })
    .catch((error) => {
      res.status(500).json(error);
    })
  },
  create(req, res){
    req.checkBody(schema);

    req.getValidationResult().then(function(result) {
      if (!result.isEmpty()) {
        res.status(400).send('There have been validation errors: ' + util.inspect(result.array()));
        return;
      }

      var data = filterParams(req);

      promises = [];
      var newOptCont;
      var createOptCont = OptCont.create(data)
      .then((optcont) => {
        newOptCont = optcont;
        var setCompany = Company.findById(req.params.company_id)
        .then((company) => {
          company.addOptionsContainer(optcont);
          if(req.body.newOptions.length > 0){
            req.body.newOptions.map((option) => {
              var setCreateOption = PossibleOption.create(option)
              .then((option) => {
                optcont.addPossibleOption(option);
                company.addPossibleOption(option);
              })
              .catch((error) => {
                res.status(500).json(error);
              })
              promises.push(setCreateOption);
            })
          }
        })
        .catch((error) => {
          res.status(500).json(error);
        })
        promises.push(setCompany);

        if(req.body.existingOptions.length > 0){
          req.body.existingOptions.map((optionId) => {
            var getOption = PossibleOption.findById(optionId)
            .then((option) => {
              optcont.addPossibleOption(option);
            })
            .catch((error) => {
              res.status(500).json(error);
            })
            promises.push(getOption);
          })
        }
      })
      .catch((error) => {
        console.log(error);
        res.status(500).json(error);
      })
      promises.push(createOptCont);
      Promise.all(promises)
      .then(() => {
        res.status(200).json(newOptCont);
      })
      .catch((error) => {
        res.status(500).json(error);
      })
    }
  },
  show(req, res) {
    OptCont.findById(req.params.id, {include: PossibleOption})
    .then((optcont) => {
      res.status(200).json(optcont);
    })
    .catch(function(error) {
      res.status(500).json(error);
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

      var promises = []
      var newOptCont;
      var findOptCont = OptCont.findById(req.params.id, {include: PossibleOption})
      .then((optcont) => {
        var updateOptCont = optcont.update(data)
        promises.push(updateOptCont);
        if(req.body.newOptions.length > 0){
          req.body.newOptions.map((option) => {
            var setCreateOption = PossibleOption.create(option)
            .then((option) => {
              optcont.addPossibleOption(option);
            })
            .catch((error) => {
              res.status(500).json(error);
            })
            promises.push(setCreateOption);
          })
        }
        if(req.body.existingOptions.length > 0){
          req.body.existingOptions.map((optionId) => {
            var getOption = PossibleOption.findById(optionId)
            .then((option) => {
              optcont.addPossibleOption(option);
            })
            .catch((error) => {
              res.status(500).json(error);
            })
            promises.push(getOption);
          })
        }
        newOptCont = optcont;
      })
      .catch(function(error) {
        res.status(500).json(error);
      })
      promises.push(findOptCont);
      Promise.all(promises)
      .then(() => {
        console.log(newOptCont);
        res.status(200).json(newOptCont);
      })
      .catch((error) => {
        res.status(500).json(error);
      })
    }
  },
  delete(req, res) {
    OptCont.destroy({where: {id: req.params.id}})
    .then((deletedOptCont) => {
      res.status(200).json(deletedOptCont);
    })
    .catch(function(error) {
      res.status(500).json(error);
    })
  }
}
