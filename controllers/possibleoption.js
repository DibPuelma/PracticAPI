var PossibleOption = require('../models/').PossibleOption;
var OptionsContainer = require('../models/').OptionsContainer;
var Company = require('../models/').Company;

module.exports = {
  index(req, res){
    PossibleOption.findAll(where: {company_id: req.params.company_id})
    .then((possopts) => {
      res.status(200).json(possopts);
    })
    .catch((error) => {
      res.status(500).json(error);
    })
  },
  create(req, res){
    PossibleOption.create(req.body)
    .then((possopt) => {
      Company.findById(req.paramas.company_id)
      .then((company) => {
        company.addPossibleOption(possopt);
        res.status(200).json(possopt);
      })
      .catch((error) => {
        res.status(500).json(error);
      })
    })
    .catch((error) => {
      res.status(500).json(error);
    })
  },
  show(req, res) {
    PossibleOption.findById(req.params.id)
    .then((optcont) => {
      res.status(200).json(optcont);
    })
    .catch(function(error) {
      res.status(500).json(error);
    })
  },
  update(req, res) {
    PossibleOption.update(req.body, {where: {id: req.params.id}})
    .then((possopt) => {
      res.status(200).json(possopt);
    })
    .catch((error) => {
      res.status(500).json(error);
    })
  },
  delete(req, res) {
    PossibleOption.destroy({where: {id: req.params.id}})
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
