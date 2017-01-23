var AnsweredPoll = require('../models/').AnsweredPoll;
var Employee = require('../models/').Employee;
var SellPoint = require('../models/').SellPoint;
var Answer = require('../models/').Answer;
var User = require('../models/').User;
var Poll = require('../models/').Poll;
var Question = require('../models/').Question;


module.exports = {
  index(req, res) {
    AnsweredPoll.findAll({where: {user_id: req.params.user_id}}, {include: Answer, include: Question})
  },
  create(req, res) {
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
  },
  show(req, res) {
    AnsweredPoll.findById(req.params.id, {include: Answer, include: Question})
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
