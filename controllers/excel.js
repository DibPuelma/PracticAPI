var Employee = require('../models/').Employee;
var AnsweredPoll = require('../models/').AnsweredPoll;
var Answer = require('../models/').Answer;
var Question = require('../models/').Question;
var PossibleOption = require('../models/').PossibleOption;
var SellPoint = require('../models/').SellPoint;
var Poll = require('../models/').Poll;
var User = require('../models/').User;

var excelReporter = require('../middlewares/excel/bundler');
var ageCalculator = require('../helpers/ageCalculator');

module.exports = {
  getBySellPoint(req, res) {
    SellPoint.findAll({where: {company_id: req.params.company_id}, include: {model: AnsweredPoll, include: [{model: Answer, include: [Question, PossibleOption]}, User]}})
    .then((sellpoints) => {
      dataset = [];
      sellpoints.map((sellpoint) => {
        sellpoint.AnsweredPolls.map((answeredpoll) => {
          answeredpoll.Answers.map((answer) => {
            var answerValue = null;
            if(answer.string_value !== null) answerValue = answer.string_value;
            else if (answer.number_value !== null) answerValue = answer.number_value;
            else if (answer.boolean_value !== null) answerValue = answer.boolean_value;
            else if (answer.possible_option_id !== null) answerValue = answer.PossibleOption.value;
            var data = {
              sellpoint_id: sellpoint.id,
              sellpoint_name: sellpoint.location,
              question_id: answer.Question.id,
              question_text: answer.Question.text,
              question_type: answer.Question.type,
              answer_id: answer.id,
              value: answerValue,
              user_id: answeredpoll.User.id,
              user_age: ageCalculator.calculateAge(answeredpoll.User.birthdate),
              user_gender: answeredpoll.User.gender
            }
            dataset.push(data);
          })
        })
      })
      res.setHeader('Content-Type', 'application/vnd.ms-excel');
      res.setHeader("Content-Disposition", "attachment; filename=" + "Reporte_por_pregunta.xlsx");
      res.send(excelReporter.buildExcel(dataset, 'sellpoint'));
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json(error);
    })
  },
  getByQuestion(req, res) {
    Question.findAll({where: {company_id: req.params.company_id}, include: {model: Answer, include: [{model: AnsweredPoll, include: User}, PossibleOption]}})
    .then((questions) => {
      dataset = [];
      questions.map((question) => {
        question.Answers.map((answer) => {
          var answerValue = null;
          if(answer.string_value !== null) answerValue = answer.string_value;
          else if (answer.number_value !== null) answerValue = answer.number_value;
          else if (answer.boolean_value !== null) answerValue = answer.boolean_value;
          else if (answer.possible_option_id !== null) answerValue = answer.PossibleOption.value;
          var data = {
            question_id: question.id,
            question_text: question.text,
            question_type: question.type,
            answer_id: answer.id,
            value: answerValue,
            user_id: answer.AnsweredPoll.User.id,
            user_age: ageCalculator.calculateAge(answer.AnsweredPoll.User.birthdate),
            user_gender: answer.AnsweredPoll.User.gender
          }
          dataset.push(data);
        })
      })
      res.setHeader('Content-Type', 'application/vnd.ms-excel');
      res.setHeader("Content-Disposition", "attachment; filename=" + "Reporte_por_pregunta.xlsx");
      res.send(excelReporter.buildExcel(dataset, 'question'));
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json(error);
    })
  },
  getByPoll(req, res) {
    Poll.findAll({where: {company_id: req.params.company_id}, include: {model: AnsweredPoll, include: [{model: Answer, include: [Question, PossibleOption]}, User]}})
    .then((polls) => {
      dataset = [];
      polls.map((poll) => {
        poll.AnsweredPolls.map((answeredpoll) => {
          answeredpoll.Answers.map((answer) => {
            var answerValue = null;
            if(answer.string_value !== null) answerValue = answer.string_value;
            else if (answer.number_value !== null) answerValue = answer.number_value;
            else if (answer.boolean_value !== null) answerValue = answer.boolean_value;
            else if (answer.possible_option_id !== null) answerValue = answer.PossibleOption.value;
            var data = {
              poll_id: poll.id,
              poll_name: poll.name,
              poll_description: poll.description,
              question_id: answer.Question.id,
              question_text: answer.Question.text,
              question_type: answer.Question.type,
              answer_id: answer.id,
              value: answerValue,
              user_id: answeredpoll.User.id,
              user_age: ageCalculator.calculateAge(answeredpoll.User.birthdate),
              user_gender: answeredpoll.User.gender
            }
            dataset.push(data);
          })
        })
      })
      res.setHeader('Content-Type', 'application/vnd.ms-excel');
      res.setHeader("Content-Disposition", "attachment; filename=" + "Reporte_por_pregunta.xlsx");
      res.send(excelReporter.buildExcel(dataset, 'poll'));
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json(error);
    })
  },
  getByEmployee(req, res) {
    Employee.findAll({where: {company_id: req.params.company_id}, include: {model: AnsweredPoll, include: [{model: Answer, include: [Question, PossibleOption]}, User]}})
    .then((employees) => {
      dataset = [];
      employees.map((employee) => {
        employee.AnsweredPolls.map((answeredpoll) => {
          answeredpoll.Answers.map((answer) => {
            var answerValue = null;
            if(answer.string_value !== null) answerValue = answer.string_value;
            else if (answer.number_value !== null) answerValue = answer.number_value;
            else if (answer.boolean_value !== null) answerValue = answer.boolean_value;
            else if (answer.possible_option_id !== null) answerValue = answer.PossibleOption.value;
            var data = {
              employee_id: employee.id,
              employee_name: employee.name,
              employee_last_name: employee.last_name,
              question_id: answer.Question.id,
              question_text: answer.Question.text,
              question_type: answer.Question.type,
              answer_id: answer.id,
              value: answerValue,
              user_id: answeredpoll.User.id,
              user_age: ageCalculator.calculateAge(answeredpoll.User.birthdate),
              user_gender: answeredpoll.User.gender
            }
            dataset.push(data);
          })
        })
      })
      res.setHeader('Content-Type', 'application/vnd.ms-excel');
      res.setHeader("Content-Disposition", "attachment; filename=" + "Reporte_por_pregunta.xlsx");
      res.send(excelReporter.buildExcel(dataset, 'employee'));
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json(error);
    })
  },
  getAll(req, res) {
    Poll.findAll({where: {company_id: req.params.company_id}, include: {model: AnsweredPoll, include: [{model: Answer, include: [Question, PossibleOption]}, User, SellPoint, Employee]}})
    .then((polls) => {
      dataset = [];
      polls.map((poll) => {
        poll.AnsweredPolls.map((answeredpoll) => {
          answeredpoll.Answers.map((answer) => {
            var answerValue = null;
            if(answer.string_value !== null) answerValue = answer.string_value;
            else if (answer.number_value !== null) answerValue = answer.number_value;
            else if (answer.boolean_value !== null) answerValue = answer.boolean_value;
            else if (answer.possible_option_id !== null) answerValue = answer.PossibleOption.value;
            var data = {
              sell_point_id: answeredpoll.SellPoint.id,
              sell_point_name: answeredpoll.SellPoint.location,
              employee_id: answeredpoll.Employee.id,
              employee_name: answeredpoll.Employee.name,
              employee_last_name: answeredpoll.Employee.last_name,
              poll_id: poll.id,
              poll_name: poll.name,
              poll_description: poll.description,
              question_id: answer.Question.id,
              question_text: answer.Question.text,
              question_type: answer.Question.type,
              answer_id: answer.id,
              value: answerValue,
              user_id: answeredpoll.User.id,
              user_age: ageCalculator.calculateAge(answeredpoll.User.birthdate),
              user_gender: answeredpoll.User.gender
            }
            dataset.push(data);
          })
        })
      })
      res.setHeader('Content-Type', 'application/vnd.ms-excel');
      res.setHeader("Content-Disposition", "attachment; filename=" + "Reporte_por_pregunta.xlsx");
      res.send(excelReporter.buildExcel(dataset, 'all'));
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json(error);
    })
  }
};
