var Answer = require('../models/').Answer;
var PossibleOption = require('../models/').PossibleOption;

module.exports = {
  indexByQuestion(req, res){
    Answer.findAll({where: {question_id: req.params.question_id}, include: PossibleOption})
    .then((questions) => {
      res.status(200).json(questions);
    })
    .catch((error) => {
      res.status(500).json(error);
    })
  },
  show(req, res) {
    Answer.findOne({where: {id: req.params.id, answered_poll_id: req.params.answered_poll_id }, include: PossibleOption})
    .then((answer) => {
      console.log(answer);
      res.status(200).json(answer);
    })
    .catch(function(error) {
      console.log(error);
      res.status(500).json(error);
    })
  }
}
