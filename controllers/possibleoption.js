var PossibleOption = require('../models/').PossibleOption;

module.exports = {
  create(req, res){
    PossibleOption.create(req.body)
    .then((possopt) => {
      res.status(200).json(possopt);
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
    .then((deletedOptCont) => {
      res.status(200).json(deletedOptCont);
    })
    .catch(function(error) {
      res.status(500).json(error);
    })
  }
}
