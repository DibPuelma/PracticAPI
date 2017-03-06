var Poll             = require('../models/').Poll;
var Company          = require('../models/').Company;
var SellPoint        = require('../models/').SellPoint;
var Question         = require('../models/').Question;
var OptionsContainer = require('../models/').OptionsContainer;
var PossibleOption   = require('../models/').PossibleOption;
var PollQuestions    = require('../models/').PollQuestions

var util = require('util');

var schema = {
  'name': {
    notEmpty: true,
    isLength: { options: [{ min: 1, max: 30 }] },
    errorMessage: 'Invalid name'
  },
  'description': {
    optional: true,
    isLength: { options: [{ min: 0, max: 500 }] },
    errorMessage: 'Invalid description'
  },
  'existingQuestions': {
    isArray: true,
    errorMessage: 'Invalid existing questions array'
  },
  'newQuestions': {
    isArray: true,
    errorMessage: 'Invalid new questions array'
  },
  'activeSellPoint': {
    optional: true,
    errorMessage: 'Invalid sell point to make active'
  }
};

var schemaUpdate = {
  'name': {
    optional: true,
    isLength: { options: [{ min: 1, max: 30 }] },
    errorMessage: 'Invalid name'
  },
  'description': {
    optional: true,
    isLength: { options: [{ min: 0, max: 500 }] },
    errorMessage: 'Invalid description'
  },
  'existingQuestions': {
    isArray: true,
    optional: true,
    errorMessage: 'Invalid existing questions array'
  },
  'newQuestions': {
    isArray: true,
    optional: true,
    errorMessage: 'Invalid new questions array'
  },
  'activeSellPoint': {
    optional: true,
    errorMessage: 'Invalid sell point to make active'
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
    Poll.findAll({where: {company_id: req.params.company_id}, include: [Question]})
    .then((polls) => {
      res.status(200).json(polls);
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

      // Create poll
      Poll.create(data)
      .then((poll) => {
        var promises = [];
        var newPoll = poll;

        // Set company and create questions
        var setCompany = Company.findById(req.params.company_id)
        .then((company) => {
          poll.setCompany(company);
          if (req.body.newQuestions.length > 0) {
            req.body.newQuestions.map((newQuestion) => {
              var addNewQuestion = Question.create(newQuestion)
              .then((question) => {
                poll.addQuestion(question).then((r) =>  {
                  var question_id = r[0][0].dataValues.question_id;
                  var poll_id = r[0][0].dataValues.poll_id;
                  PollQuestions.update(
                    { order: newQuestion.order},
                    { where: { question_id: question_id, poll_id: poll_id } }
                  );
                  if (newQuestion.type === 'options') {
                    OptionsContainer.find(newQuestion.options_container_id).then((opt) => {
                      question.setOptionsContainer(opt);
                    }).catch(function(error) {
                      console.log(error);
                      res.status(500).json(error);      
                    });
                  }
                });
                company.addQuestion(question);
              })
              .catch(function (error) {
                console.log(error);
                res.status(500).json(error);
              })
              promises.push(addNewQuestion);
            })
          }
        })
        .catch(function (error) {
          console.log(error);
          res.status(500).json(error);
        });
        promises.push(setCompany);

        // Add existing questions
        if (req.body.existingQuestions.length > 0) {
          req.body.existingQuestions.map((q) => {
            var addExistingQuestion = Question.findById(q.id)
            .then((question) => {
              question.update(q);
              poll.addQuestion(question).then((r) =>  {
                  var question_id = r[0][0].dataValues.question_id;
                  var poll_id = r[0][0].dataValues.poll_id;
                  PollQuestions.update(
                    { order: q.order},
                    { where: { question_id: question_id, poll_id: poll_id } }
                  );
                });
              if (q.type === 'options') {
                OptionsContainer.find(q.options_container_id).then((opt) => {
                  question.setOptionsContainer(opt);
                }).catch(function(error) {
                  console.log(error);
                  res.status(500).json(error);      
                });
              }
            })
            .catch(function (error) {
              console.log(error);
              res.status(500).json(error);
            })
            promises.push(addExistingQuestion);
          })
        }

        // Set active sellpoint
        /*if (typeof req.body.activeSellPoint !== 'undefined') {
          var setActiveSellPoint = SellPoint.findById(req.body.activeSellPoint)
          .then((sellPoint) => {
            sellPoint.setPoll(poll);
          })
          .catch(function (error) {
            console.log(error);
            res.status(500).json(error);
          })
          promises.push(setActiveSellPoint);
        }*/

        // If all promises are resolved
        Promise.all(promises)
        .then(() => {
          res.status(200).json(newPoll);
        })
        .catch(function(error) {
          console.log(error);
          res.status(500).json(error);
        });

      });
    });
  },
  show(req, res) {
    Poll.findOne({where: {id: req.params.id, company_id: req.params.company_id}, include: {model:Question, include: {model: OptionsContainer, include: PossibleOption}}})
    .then((poll) => {
      res.status(200).json(poll);
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

      Poll.findById(req.params.id).then((poll) => {
        var promises = [];
        var poll_id = poll.id;
        
        // Update poll info
        poll.update({ name: data.name, description: data.description});
        
        // Update questios
        if (req.body.existingQuestions.length > 0) {
          req.body.existingQuestions.map((q) => {
            var addExistingQuestion = Question.findById(q.id)
            .then((question) => {
              var p_u = question.update({ text: q.text });

              var pq_u = PollQuestions.update(
                { order: q.order},
                { where: { question_id: q.id, poll_id: poll_id } }
              );

              promises.push(p_u);
              promises.push(pq_u);
            })
            .catch(function (error) {
              console.log(error);
              res.status(500).json(error);
            })
            promises.push(addExistingQuestion);
          })
        }

        Promise.all(promises)
        .then(() => {
          res.status(200).json(poll);
        })
        .catch(function(error) {
          console.log(error);
          res.status(500).json(error);
        });
      })
      .catch(function(error) {
        res.status(500).json(error);
      })
    })
  },
  delete(req, res) {
    Poll.destroy({where: {id: req.params.id, company_id: req.params.company_id}})
    .then((deletedPoll) => {
      res.status(200).json(deletedPoll);
    })
    .catch(function(error) {
      res.status(500).json(error);
    })
  }
}
