var Answer = require('../models/').Answer;
var PossibleOption = require('../models/').PossibleOption;

module.exports = {
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
