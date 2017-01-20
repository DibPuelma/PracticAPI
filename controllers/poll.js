var Poll = require('../models/').Poll;
var Company = require('../models/').Company;
var SellPoint = require('../models/').SellPoint;
var Question = require('../models/').Question;

module.exports = {
  //post
  create(req, res){
    promises = [];
    var newPoll;
    createPoll = Poll.create({name: req.body.name, description: req.body.description})
    .then((poll) => {
      newPoll = poll;
      var setCompany = Company.findById(req.body.companyId)
      .then((company) => {
        poll.setCompany(company);
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
      if(req.body.newQuestions.length > 0){
        req.body.newQuestions.map((newQuestion) => {
          var addNewQuestion = Question.create(newQuestion)
          .then((question) => {
            poll.addQuestion(question);
          })
          .catch(function (error) {
            res.status(500).json(error);
          })
          promises.push(addNewQuestion);
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
  },//get
  show(req, res) {
    Poll.findById(req.params.id, {include: Question})
    .then((poll) => {
      res.status(200).json(poll);
    })
    .catch(function(error) {
      res.status(500).json(error);
    })
  },//put
  update(req, res) {
    Poll.findById(req.params.id)
    .then((poll) => {
      poll.update(req.body)
      res.status(200).json(poll);
    })
    .catch(function(error) {
      res.status(500).json(error);
    })
  },//delete
  delete(req, res) {
    Poll.destroy({where: {id: req.params.id}})
    .then((deletedPoll) => {
      res.status(200).json(deletedPoll);
    })
    .catch(function(error) {
      res.status(500).json(error);
    })
  },//delete
  removeQuestionFromPoll(req, res) {
    Poll.findById(req.params.poll_id)
    .then((poll) => {
      Question.findById(req.params.question_id)
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
  },//put
  changeActiveSellPoint(req, res) {
    Poll.findById(req.params.poll_id)
    .then((poll) => {
      SellPoint.findById(req.params.sell_point_id)
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
