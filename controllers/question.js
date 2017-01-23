var Question = require('../models/').Question;
var OptionsContainer = require('../models').OptionsContainer;
var Poll = require('../models').Poll;
var Company = require('../models').Company;

module.exports = {
  create(req, res){
    promises = [];
    var newQuestion;
    var createQuestion = Question.create({text: req.body.text, type: req.body.type})
    .then((question) => {
      newQuestion = question;
      var addToCompany = Company.findById(req.params.company_id)
      .then((company) => {
        company.addQuestion(question);
        if(req.body.type === 'options'){
          var setOptCont = OptionsContainer.findById(req.body.optionsContainer)
          .then((optcont) => {
            question.setOptionsContainer(optcont);
            company.addOptionsContainer(optcont);
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
      promises.push(addToCompany);
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
  },
  show(req, res) {
    Question.findById(req.params.id, {include: OptionsContainer})
    .then((question) => {
      res.status(200).json(question);
    })
    .catch(function(error) {
      res.status(500).json(error);
    })
  },
  update(req, res) {
    Question.findById(req.params.id)
    .then((question) => {
      question.update({text: req.body.text, type: req.body.type})
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
