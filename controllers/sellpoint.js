var util = require('util');
var Company  = require('../models/').Company;
var SellPoint = require('../models/').SellPoint;
var Employee = require('../models/').Employee;
var Poll = require('../models/').Poll;
var Question = require('../models/').Question;
var Contest = require('../models/').Contest;
var OptionsContainer = require('../models/').OptionsContainer;
var PossibleOption = require('../models/').PossibleOption;

var schema = {
  'location': {
    notEmpty: true,
    isLength: { options: [{ min: 1, max: 30 }] },
    errorMessage: 'Invalid location'
  },
  'code': {
    notEmpty: true
  }
};

var schemaUpdate = {
  'location': {
    optional: true,
    isLength: { options: [{ min: 1, max: 30 }] },
    errorMessage: 'Invalid location'
  },
  'code': {
    optional: true
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
  index(req, res) {
    SellPoint.findAll({ where: { company_id: req.params.company_id }, include: [{model: Poll, as: 'AttendedPoll'}, {model: Poll, as: 'UnattendedPoll'}, Contest] }).then(function (sellpoints) {
      res.status(200).json(sellpoints);
    }).catch(function (error) {
      console.log(error);
      res.status(500).json(error);
    });
  },

  show(req, res) {
      SellPoint.find({where: {id: req.params.id, company_id: req.params.company_id}})
      .then( (sellpoint) => {
        res.status(200).json(sellpoint);
      }).catch(function (error){
        res.status(500).json(error);
      });
  },

  showByCode(req, res) {
    SellPoint.find({where: {code: req.params.code}, include: Employee})
    .then( (sellpoint) => {
      res.status(200).json(sellpoint);
    }).catch(function (error){
      res.status(500).json(error);
    });
  },

  create(req, res) {
    req.checkBody(schema);

    req.getValidationResult().then(function(result) {
      if (!result.isEmpty()) {
        res.status(400).send('There have been validation errors: ' + util.inspect(result.array()));
        return;
      }
      var data = filterParams(req);
      console.log(data);
      Company.findById(req.params.company_id).then(function (company) {
        SellPoint.create(data).then(function (newSellPoint) {
          newSellPoint.setCompany(company).then(function() {
            res.status(200).json(newSellPoint);
          });
        }).catch(function (error){
          res.status(500).json(error);
        });
      }).catch(function (error) {
        res.status(500).json(error);
      });
    });
  },

  update(req, res) {
    req.checkBody(schemaUpdate);

    req.getValidationResult().then(function(result) {
      if (!result.isEmpty()) {
        res.status(400).send('There have been validation errors: ' + util.inspect(result.array()));
        return;
      }
      var data = filterParams(req);

      Company.findById(req.params.company_id).then(function (company) {
        SellPoint.update(data, { where: { id: req.params.id } }).then(function (updatedSellPoint) {
          res.status(200).json(updatedSellPoint);
        }).catch(function (error){
          res.status(500).json(error);
        });
      }).catch(function (error) {
        res.status(500).json(error);
      });
    });
  },

  delete(req, res) {
    Company.findById(req.params.company_id).then(function (company) {
      SellPoint.destroy({
        where: {
          id: req.params.id
        }
      }).then(function (deletedSellPoint) {
        res.status(200).json(deletedSellPoint);
      }).catch(function (error){
        res.status(500).json(error);
      });
    }).catch(function (error) {
      res.status(500).json(error);
    });
  },

  setActiveAttendedPoll(req, res) {
    SellPoint.findOne({where: {id: req.params.sell_point_id, company_id: req.params.company_id}})
    .then((sellPoint) => {
      if (req.params.poll_id === '0') {
        sellPoint.setAttendedPoll(null);
        return res.status(200).json(sellpoint);
      }

      Poll.findOne({where: {id: req.params.poll_id, company_id: req.params.company_id}})
      .then((poll) => {
        sellPoint.setAttendedPoll(poll);
        res.status(200).json(sellpoint);
      })
      .catch(function(error) {
        res.status(500).json(error);
      })
    })
    .catch(function(error) {
      res.status(500).json(error);
    })
  },

  getActiveAttendedPoll(req, res) {
    SellPoint.findOne({where: {id: req.params.sell_point_id, company_id: req.params.company_id}})
    .then((sellPoint) => {
      sellPoint.getAttendedPoll({include: {model:Question, include: {model: OptionsContainer, include: PossibleOption}}})
      .then((poll) => {
        res.status(200).json(poll);
      });
    })
    .catch(function(error) {
      console.log(error);
      res.status(500).json(error);
    })
  },

  setActiveUnattendedPoll(req, res) {
    SellPoint.findOne({where: {id: req.params.sell_point_id, company_id: req.params.company_id}})
    .then((sellPoint) => {
      if (req.params.poll_id === '0') {
        sellPoint.setUnattendedPoll(null);
        return res.status(200).json(sellpoint);
      }

      Poll.findOne({where: {id: req.params.poll_id, company_id: req.params.company_id}})
      .then((poll) => {
        sellPoint.setUnattendedPoll(poll);
        res.status(200).json(sellpoint);
      })
      .catch(function(error) {
        res.status(500).json(error);
      })
    })
    .catch(function(error) {
      res.status(500).json(error);
    })
  },

  getActiveUnattendedPoll(req, res) {
    SellPoint.findOne({where: {id: req.params.sell_point_id, company_id: req.params.company_id}})
    .then((sellPoint) => {
      sellPoint.getUnattendedPoll({include: {model:Question, include: {model: OptionsContainer, include: PossibleOption}}})
      .then((poll) => {
        res.status(200).json(poll);
      });
    })
    .catch(function(error) {
      console.log(error);
      res.status(500).json(error);
    })
  },

  setActiveContest(req, res) {
    Contest.findOne({where: {id: req.params.contest_id, company_id: req.params.company_id}})
    .then((contest) => {
      SellPoint.findOne({where: {id: req.params.sell_point_id, company_id: req.params.company_id}})
      .then((sellPoint) => {
        sellPoint.setContest(contest);
        res.status(200).json(contest);
      })
      .catch(function(error) {
        res.status(500).json(error);
      })
    })
    .catch(function(error) {
      res.status(500).json(error);
    })
  },

  getActiveContest(req, res) {
    SellPoint.findOne({where: {id: req.params.sell_point_id, company_id: req.params.company_id}})
    .then((sellPoint) => {
      sellPoint.getContest()
      .then((contest) => {
        res.status(200).json(contest);
      });
    })
    .catch(function(error) {
      res.status(500).json(error);
    })
  }
};
