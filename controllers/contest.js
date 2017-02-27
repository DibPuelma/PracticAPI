var util = require('util');
var Company  = require('../models/').Company;
var Contest = require('../models/').Contest;
var Prize = require('../models/').Prize;
var SellPoint = require('../models/').SellPoint;

var schema = {
  'name': {
    notEmpty: true,
    isLength: { options: [{ min: 1, max: 30 }] },
    errorMessage: 'Invalid name'
  },
  'draw_date': {
    notEmpty: true,
    isDate: true,
    errorMessage: 'Invalid draw date'
  },
  'start_date': {
    optional: true,
    isDate: true,
    errorMessage: 'Invalid start date'
  }
};

var schemaUpdate = {
  'name': {
    optional: true,
    isLength: { options: [{ min: 1, max: 30 }] },
    errorMessage: 'Invalid name'
  },
  'draw_date': {
    optional: true,
    isDate: true,
    errorMessage: 'Invalid draw date'
  },
  'start_date': {
    optional: true,
    isDate: true,
    errorMessage: 'Invalid start date'
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
    Contest.findAll({ where: { company_id: req.params.company_id }, include: [SellPoint, Prize] }).then(function (contests) {
      res.status(200).json(contests);
    }).catch(function (error) {
      res.status(500).json(error);
    });
  },

  show(req, res) {
    Company.findById(req.params.company_id, {include: [SellPoint, Prize]}).then(function (company) {
      Contest.findById(req.params.id).then(function (contest) {
        res.status(200).json(contest);
      }).catch(function (error){
        res.status(500).json(error);
      });
    }).catch(function (error) {
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
      var promises = [];
      Company.findById(req.params.company_id).then(function (company) {
        var contestCreate = Contest.create(data).then(function (newContest) {
          var setCompany = newContest.setCompany(company);
          promises.push(setCompany);

          if(req.body.newPrizes.length > 0) {
            req.body.newPrizes.map((prizeData) => {
              Prize.create(prizeData)
              .then((prize) => {
                prize.setContest(newContest);
              })
              .catch((error) => {
                console.log(error);
                res.status(500).json(error);
              })
            })
          }

          if (req.body.newSellpoints.length > 0) {
            req.body.newSellpoints.map((sellpoint_id) => {
              var getSellpoint = SellPoint.findById(sellpoint_id)
              .then((sellpoint) => {
                sellpoint.setContest(newContest);
              })
              .catch((error) => {
                console.log(error);
                res.status(500).json(error);
              })
              promises.push(getSellpoint);
            });
          }
          Promise.all(promises)
          .then(() => {
            res.status(200).json(newContest);
          })
          .catch((error) => {
            console.log(error);
          })
        }).catch(function (error){
          console.log(error);
          res.status(500).json(error);
        });

      }).catch(function (error) {
        console.log(error);
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
      var promises = [];
      Company.findById(req.params.company_id).then(function (company) {
        Contest.findById(req.params.id).then(function (updatedContest) {

          var updateContest = updatedContest.update(data);
          promises.push(updateContest);
          // Add sellpoints
          if (req.body.newSellpoints.length > 0) {
            req.body.newSellpoints.map((sellpoint_id) => {
              var getSellpoint = SellPoint.findById(sellpoint_id)
              .then((sellpoint) => {
                sellpoint.setContest(updatedContest);
              })
              .catch((error) => {
                res.status(500).json(error);
              })
              promises.push(getSellpoint);
            });
          }

          // Remove sellpoints
          if (req.body.deletedSellpoints.length > 0) {
            req.body.deletedSellpoints.map((sellpoint_id) => {
              var getSellpoint = SellPoint.findById(sellpoint_id)
              .then((sellpoint) => {
                sellpoint.setContest(null);
              })
              .catch((error) => {
                console.log(error);
                res.status(500).json(error);
              })
              promises.push(getSellpoint);
            });
          }
          Promise.all(promises)
          .then(() => {
            res.status(200).json(updatedContest);
          })
        }).catch(function (error){
          console.log(error);
          res.status(500).json(error);
        });
      }).catch(function (error) {
        console.log(error);
        res.status(500).json(error);
      });
    });
  },

  delete(req, res) {
    var promises = [];
    Company.findById(req.params.company_id).then(function (company) {
      Contest.findById(req.params.id)
      .then((contest) => {
        contest.getPrizes()
        .then((prizes) => {
          prizes.map((prize) => {
            var destroyPrizes = prize.destroy()
            promises.push(destroyPrizes);
          })
        })
        contest.getSellPoints()
        .then((sellPoints) => {
          sellPoints.map((sellPoint) => {
            var removeContestFromSellPoint = sellPoint.setContest(null);
            promises.push(removeContestFromSellPoint);
          })
        })
        Promise.all(promises)
        .then(() => {
          contest.destroy()
          .then((deletedContest) => {
            res.status(200).json(deletedContest);
          })
          .catch((error) => {
            res.status(500).json(error);
          });
        })
      })
    }).catch(function (error) {
      res.status(500).json(error);
    });
  }
};
