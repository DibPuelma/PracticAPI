var PossibleOption = require('../models/').PossibleOption;
var OptionsContainer = require('../models/').OptionsContainer;
var Company = require('../models/').Company;
var util = require('util');

var schema = {
  'value': {
    notEmpty: true,
    isLength: { options: [{ min: 1, max: 80 }] },
    errorMessage: 'Invalid value, must have between 1 and 80 characters'
  },
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
    PossibleOption.findAll({where: {company_id: req.params.company_id}})
    .then((possopts) => {
      res.status(200).json(possopts);
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
      PossibleOption.create(data)
      .then((possopt) => {
        Company.findById(req.params.company_id)
        .then((company) => {
          company.addPossibleOption(possopt);
          res.status(200).json(possopt);
        })
        .catch((error) => {
          console.log(error);
          res.status(500).json(error);
        })
      })
      .catch((error) => {
        res.status(500).json(error);
      })
    })
  },
  show(req, res) {
    PossibleOption.findOne({where: {id: req.params.id, company_id: req.params.company_id}})
    .then((optcont) => {
      res.status(200).json(optcont);
    })
    .catch(function(error) {
      res.status(500).json(error);
    })
  },
  update(req, res) {
    req.checkBody(schema);

    req.getValidationResult().then(function(result) {
      if (!result.isEmpty()) {
        res.status(400).send('There have been validation errors: ' + util.inspect(result.array()));
        return;
      }

      var data = filterParams(req);
      PossibleOption.update(data, {where: {id: req.params.id}})
      .then((possopt) => {
        res.status(200).json(possopt);
      })
      .catch((error) => {
        res.status(500).json(error);
      })
    })
  },
  delete(req, res) {
    PossibleOption.destroy({where: {id: req.params.id, company_id: req.params.company_id}})
    .then((deletedPossibleOption) => {
      res.status(200).json(deletedPossibleOption);
    })
    .catch(function(error) {
      res.status(500).json(error);
    })
  },
  removeOptionFromContainer(req, res) {
    OptionsContainer.findById(req.params.opt_cont_id)
    .then((optcont) => {
      PossibleOption.findById(req.params.id)
      .then((possopt) => {
        optcont.removePossibleOption(possopt)
        res.status(200).json(possopt);
      })
      .catch(function(error) {
        console.log(error);
        res.status(500).json(error);
      })
    })
    .catch(function(error) {
      console.log(error);
      res.status(500).json(error);
    })
  },
  addOptionToContainer(req, res) {
    OptionsContainer.findById(req.params.opt_cont_id)
    .then((optcont) => {
      PossibleOption.findById(req.params.id)
      .then((possopt) => {
        optcont.addPossibleOption(possopt)
        res.status(200).json(possopt);
      })
      .catch(function(error) {
        console.log(error);
        res.status(500).json(error);
      })
    })
    .catch(function(error) {
      console.log(error);
      res.status(500).json(error);
    })
  }
}
