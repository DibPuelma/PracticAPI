var Answer = require('../models/').Answer;
var PossibleOption = require('../models/').PossibleOption;

module.exports = {
  index(req, res){
    Answer.findAll(where: {company_id: req.params.company_id})
    .then((questions) => {
      res.status(200).json(questions);
    })
    .catch((error) => {
      res.status(500).json(error);
    })
  },
  show(req, res) {
    Answer.findById(req.params.id, {include: PossibleOption})
    .then((answer) => {
      res.status(200).json(answer);
    })
    .catch(function(error) {
      res.status(500).json(error);
    })
  }
}
