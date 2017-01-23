var Poll = require('../models/').Poll;
var Company = require('../models/').Company;
var SellPoint = require('../models/').SellPoint;
var Question = require('../models/').Question;
var util = require('util');

var schema = {
  'name': {
    notEmpty: true,
    isLength: { options: [{ min: 1, max: 30 }] },
    errorMessage: 'Invalid name'
  },
  'description': {
    notEmpty: true,
    isLength: { options: [{ min: 1, max: 500 }] },
    errorMessage: 'Invalid description'
  },
  'existingQuestions': {
    isArray: true,
    notEmpty: true,
    errorMessage: 'Invalid existing questions array'
  },
  'newQuestions': {
    isArray: true,
    notEmpty: true,
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
    isLength: { options: [{ min: 1, max: 500 }] },
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
    Poll.findAll({where: {company_id: req.params.company_id}, include: [Question, { model: SellPoint, as: 'activeSellPoint' }]})
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

      promises = [];
      var newPoll;
      createPoll = Poll.create(data)
      .then((poll) => {
        newPoll = poll;
        var setCompany = Company.findById(req.params.company_id)
        .then((company) => {
          poll.setCompany(company);
          if(req.body.newQuestions.length > 0){
            req.body.newQuestions.map((newQuestion) => {
              var addNewQuestion = Question.create(newQuestion)
              .then((question) => {
                poll.addQuestion(question);
                company.addQuestion(question);
              })
              .catch(function (error) {
                res.status(500).json(error);
              })
              promises.push(addNewQuestion);
            })
          }
        })
        .catch(function (error) {
          res.status(500).json(error);
        })
        promises.push(setCompany);
        if(req.body.existingQuestions.length > 0){
          req.body.existingQuestions.map((id) => {
            var addExistingQuestion = Question.findById(id)
            .then((question) => {
              poll.addQuestion(question);
            })
            .catch(function (error) {
              res.status(500).json(error);
            })
            promises.push(addExistingQuestion);
          })
        }
        if(req.body.activeSellPoint !== null){
          var setActiveSellPoint = SellPoint.findById(req.body.activeSellPoint)
          .then((sellPoint) => {
            sellPoint.setPoll(poll);
          })
          .catch(function (error) {
            res.status(500).json(error);
          })
          promises.push(setActiveSellPoint);
        }
      });
      promises.push(createPoll);
      Promise.all(promises)
      .then(() => {
        res.status(200).json(newPoll);
      })
      .catch(function(error) {
        res.status(500).json(error);
      })
    })
  },
  show(req, res) {
    Poll.findOne({where: {id: req.params.id, company_id: req.params.company_id}, include: [Question, { model: SellPoint, as: 'activeSellPoint' }]})
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

      Poll.findById(req.params.id)
      .then((poll) => {
        poll.update(data)
        res.status(200).json(poll);
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
  },
  changeActiveSellPoint(req, res) {
    Poll.findOne({where: {id: req.params.poll_id, company_id: req.params.company_id}})
    .then((poll) => {
      SellPoint.findOne({where: {id: req.params.sell_point_id, company_id: req.params.company_id}})
      .then((sellPoint) => {
        sellPoint.setPoll(poll);
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
