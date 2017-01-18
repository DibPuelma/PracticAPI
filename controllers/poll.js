var Poll = require('../models/').Poll;
var Company = require('../models/').Company;
var SellPoint = require('../models/').SellPoint;
var Question = require('../models/').Question;

module.exports = {
  create(req, res){
    poll = Poll.build({name: req.body.name, description: req.body.description});
    Company.findById(req.params.company_id)
    .then(function (company) {
      poll.setCompany(company);
    })
    .catch(function (error) {
      res.status(500).json(error);
    })
    if(req.body.existingQuestions.length > 0){
      req.body.existingQuestions.map((id) => {
        Question.findById(data)
        .then(function (question) {
          poll.addQuestion(question);
        })
        .catch(function (error) {
          res.status(500).json(error);
        })
      })
    }
    if(req.body.newQuestions.length > 0){
      req.body.newQuestions.map((newQuestion) => {
        Question.create(newQuestion)
        .then(function (question) {
          poll.addQuestion(question);
        })
        .catch(function (error) {
          res.status(500).json(error);
        })
      })
    }
    if(req.body.activeSellPoint){
      SellPoint.findById(req.body.activeSellPoint)
      .then(function (sellPoint) {
        sellPoint.setPoll(poll);
        // poll.active_sellpoint = sellPoint.id;
      })
      .catch(function (error) {
        res.status(500).json(error);
      })
    }
    poll.save()
    .then(function (poll) {
      res.status(200).json(poll);
    })
    .catch(function(error) {
      res.status(500).json(error);
    })
  },
  //TODO: Agregar active_sellpoint a poll
  show(req, res) {
    Poll.findById(req.params.id, {include: Question})
    .then(function(poll){
      res.status(200).json(poll);
    })
    .catch(function(error) {
      res.status(500).json(error);
    })
  },
  indexByCompany(req, res){
    Poll.findAll({where: {company_id: req.params.company_id}})
    .then(function(polls) {
      res.status(200).json(polls);
    })
    .catch(function(error) {
      res.status(500).json(error);
    })
  }

}
