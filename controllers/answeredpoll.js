var AnsweredPoll = require('../models/').AnsweredPoll;
var Employee = require('../models/').Employee;
var SellPoint = require('../models/').SellPoint;
var Answer = require('../models/').Answer;
var User = require('../models/').User;
var Poll = require('../models/').Poll;
var Question = require('../models/').Question;
var util = require('util');

var schema = {
  'answers': {
    notEmpty: true,
    isArray: true,
    errorMessage: 'Invalid answers, must be an array'
  },
  'employeeId': {
    notEmpty: true,
    isNumeric: true,
    errorMessage: 'Invalid employee ID, must be a number'
  },
  'sellPointId': {
    notEmpty: true,
    isNumeric: true,
    errorMessage: 'Invalid sellPoint ID, must be a number'
  },
  'userId': {
    notEmpty: true,
    isNumeric: true,
    errorMessage: 'Invalid user ID, must be a number'
  },
  'pollId': {
    notEmpty: true,
    isNumeric: true,
    errorMessage: 'Invalid poll ID, must be a number'
  },
  'questions': {
    notEmpty: true,
    isArray: true,
    errorMessage: 'Invalid questions array'
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
  index(req, res) {
    AnsweredPoll.findAll({where: {user_id: req.params.user_id}, include: Answer})
    .then((answeredpolls) => {
      res.status(200).json(answeredpolls);
    })
    .catch((error) => {
      res.status(500).json(error);
    })
  },
  indexByPoll(req, res) {
    AnsweredPoll.findAll({where: {poll_id: req.params.poll_id}, include: Answer})
    .then((answeredpolls) => {
      res.status(200).json(answeredpolls);
    })
    .catch((error) => {
      res.status(500).json(error);
    })
  },
  create(req, res) {
    req.checkBody(schema);

    req.getValidationResult().then(function(result) {
      if (!result.isEmpty()) {
        res.status(400).send('There have been validation errors: ' + util.inspect(result.array()));
        return;
      }

      var data = filterParams(req);
      promises = [];
      var newAnsweredPoll;
      var createAnsweredPoll = AnsweredPoll.create({})
      .then((answeredpoll) => {
        newAnsweredPoll = answeredpoll;
        var setEmployee = Employee.findById(req.body.employeeId)
        .then((employee) => {
          answeredpoll.setEmployee(employee);
        })
        .catch(function (error) {
          console.log("error emple");
          console.log(error);
          res.status(500).json(error);
        })
        promises.push(setEmployee);

        var setSellPoint = SellPoint.findById(req.body.sellPointId)
        .then((sellPoint) => {
          answeredpoll.setSellPoint(sellPoint);
        })
        .catch(function (error) {
          console.log("error sellp");
          console.log(error);
          res.status(500).json(error);
        })
        promises.push(setSellPoint);

        var setUser = User.findById(req.body.userId)
        .then((user) => {
          answeredpoll.setUser(user);
        })
        .catch(function (error) {
          console.log("error user");
          console.log(error);
          res.status(500).json(error);
        })
        promises.push(setUser);

        var setPoll = Poll.findById(req.params.poll_id)
        .then((poll) => {
          answeredpoll.setPoll(poll);
        })
        .catch(function (error) {
          console.log("error poll");
          console.log(error);
          res.status(500).json(error);
        })
        promises.push(setPoll);

        req.body.answers.map((answer) => {
          var addNewAnswer = Answer.create(answer)
          .then((answer) => {
            Question.findById(answer.question)
            .then((question) => {
              question.addAnswer(answer);
            })
            .catch(function (error) {
              console.log("error de pregunta");
              console.log(error);
              res.status(500).json(error);
            })
            answeredpoll.addAnswer(answer);
          })
          .catch(function (error) {
            console.log("error de respuesta");
            console.log(error);
            res.status(500).json(error);
          })
          promises.push(addNewAnswer);
        })
      });
      promises.push(createAnsweredPoll);
      Promise.all(promises)
      .then(() => {
        res.status(200).json(newAnsweredPoll);
      })
      .catch(function(error) {
        res.status(500).json(error);
      })
    })
  },
  showByUser(req, res) {
    AnsweredPoll.findByOne({where: {id: req.params.id, user_id: req.params.user_id}, include: { model: Answer, include: Question}})
    .then((answeredpoll) => {
      res.status(200).json(answeredpoll);
    })
    .catch(function(error) {
      res.status(500).json(error);
    })
  },
  show(req, res) {
    AnsweredPoll.findById(req.params.id, {include: { model: Answer, include: Question}})
    .then((answeredpoll) => {
      res.status(200).json(answeredpoll);
    })
    .catch(function(error) {
      res.status(500).json(error);
    })
  },
  delete(req, res) {
    AnsweredPoll.destroy({where: {id: req.params.id}})
    .then((deletedAnsweredPoll) => {
      res.status(200).json(deletedAnsweredPoll);
    })
    .catch(function(error) {
      res.status(500).json(error);
    })
  }
}
