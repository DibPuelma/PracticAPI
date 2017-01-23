var Question = require('../models/').Question;
var OptionsContainer = require('../models').OptionsContainer;
var Poll = require('../models').Poll;
var Company = require('../models').Company;
var util = require('util');

var schema = {
  'text': {
    notEmpty: true,
    isLength: { options: [{ min: 1, max: 100 }] },
    errorMessage: 'Invalid text'
  },
  'type': {
    notEmpty: true,
    isValidType: true,
    errorMessage: 'Invalid type'
  },
  'optionsContainer': {
    isNumeric: true,
    optional: true,
    errorMessage: 'Invalid existing questions array'
  }
};

var schemaUpdate = {
  'text': {
    optional: true,
    isLength: { options: [{ min: 1, max: 100 }] },
    errorMessage: 'Invalid name'
  },
  'type': {
    optional: true,
    isValidType: true,
    errorMessage: 'Invalid type'
  },
  'optionsContainer': {
    isNumeric: true,
    optional: true,
    errorMessage: 'Invalid existing questions array'
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
  create(req, res){
    req.checkBody(schema);

    req.getValidationResult().then(function(result) {
      if (!result.isEmpty()) {
        res.status(400).send('There have been validation errors: ' + util.inspect(result.array()));
        return;
      }

      var data = filterParams(req);

      promises = [];
      var newQuestion;
      var createQuestion = Question.create(data)
      .then((question) => {
        newQuestion = question;
        var addToCompany = Company.findById(req.params.company_id)
        .then((company) => {
          company.addQuestion(question);
        })
        .catch((error) => {
          res.status(500).json(error);
        })
        promises.push(addToCompany);
        if(req.body.optionsContainer){
          var setOptCont = OptionsContainer.findById(req.body.optionsContainer)
          .then((optcont) => {
            question.setOptionsContainer(optcont);
          })
          .catch((error) => {
            res.status(500).json(error);
          })
          promises.push(setOptCont);
        }
      })
      .catch((error) => {
        res.status(500).json(error);
      })
      promises.push(createQuestion);
      Promise.all(promises)
      .then(() => {
        res.status(200).json(newQuestion);
      })
      .catch((error) => {
        res.status(500).json(error);
      })
    })
  },
  show(req, res) {
    Question.findOne({where: {id: req.params.id, company_id: req.params.company_id, include: OptionsContainer}})
    .then((question) => {
      res.status(200).json(question);
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

      Question.findById(req.params.id)
      .then((question) => {
        question.update(data)
        if(req.body.type === 'options'){
          OptionsContainer.findById(req.body.optionsContainer)
          .then((optcont) => {
            question.setOptionsContainer(optcont);
            res.status(200).json(question);
          })
          .catch(function(error) {
            console.log("error opt");
            console.log(error);
            res.status(500).json(error);
          })
        }
        else{
          res.status(200).json(question);
        }
      })
      .catch(function(error) {
        console.log("error upd");
        res.status(500).json(error);
      })
    })
  },
  delete(req, res) {
    Question.destroy({where: {id: req.params.id}})
    .then((deletedQuestion) => {
      res.status(200).json(deletedQuestion);
    })
    .catch(function(error) {
      res.status(500).json(error);
    })
  },
  removeQuestionFromPoll(req, res) {
    Poll.findById(req.params.poll_id)
    .then((poll) => {
      Question.findById(req.params.id)
      .then((question) => {
        poll.removeQuestion(question);
        res.status(200).json(poll);
      })
      .catch(function(error) {
        res.status(500).json(error);
      })
    })
    .catch(function(error) {
      res.status(500).json(error);
    })
  },
  addQuestionToPoll(req, res) {
    Poll.findById(req.params.poll_id)
    .then((poll) => {
      Question.findById(req.params.id)
      .then((question) => {
        poll.addQuestion(question);
        res.status(200).json(poll);
      })
      .catch(function(error) {
        res.status(500).json(error);
      })
    })
    .catch(function(error) {
      res.status(500).json(error);
    })
  }
}
