var PossibleOption = require('../models/').PossibleOption;
var OptCont = require('../models').OptionsContainer;

module.exports = {
  create(req, res){
    promises = [];
    var newOptCont;
    var createOptCont = OptCont.create({name: req.body.name, allow_other: req.body.allow_other})
    .then((optcont) => {
      newOptCont = optcont;
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
    var promises = []
    var newOptCont;
    var findOptCont = OptCont.findById(req.params.id, {include: PossibleOption})
    .then((optcont) => {
      var updateOptCont = optcont.update({name: req.body.name, allow_other: req.body.allow_other})
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
  },
  delete(req, res) {
    OptCont.destroy({where: {id: req.params.id}})
    .then((deletedOptCont) => {
      res.status(200).json(deletedOptCont);
    })
    .catch(function(error) {
      res.status(500).json(error);
    })
  },
  removeCurrentOption(req, res) {
    OptCont.findById(req.params.optcont_id)
    .then((optcont) => {
      PossibleOption.findById(req.params.possopt_id)
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
  }
}
