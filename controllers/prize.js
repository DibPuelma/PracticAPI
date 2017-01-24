var util = require('util');
var Contest = require('../models/').Contest;
var Prize   = require('../models/').Prize;

var schema = {
  'name': {
    notEmpty: true,
    isLength: { options: [{ min: 1, max: 30 }] }
  },
  'description': {
    optional: true
  }
};

var schemaUpdate = {
  'name': {
    optional: true,
    isLength: { options: [{ min: 1, max: 30 }] }
  },
  'description': {
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
    Prize.findAll({ where: { contest_id: req.params.contest_id } }).then(function (prizes) {
      res.status(200).json(prizes);
    }).catch(function (error) {
      res.status(500).json(error);
    });
  },

  show(req, res) {
    Contest.findById(req.params.companyId).then(function (contest) {
      Prize.findById(req.params.id).then(function (prize) {
        res.status(200).json(prize);
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

      Contest.findById(req.params.contest_id).then(function (contest) {
        Prize.create(data).then(function (newPrize) {
            newPrize.setContest(contest).then(function() {
              res.status(200).json(newPrize);
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

      Contest.findById(req.params.contest_id).then(function (contest) {
        Prize.update(data, {
          where: {
            id: req.params.id
          }
        }).then(function (updatedPrize) {
          res.status(200).json(updatedPrize);
        }).catch(function (error){
          res.status(500).json(error);
        });
      }).catch(function (error) {
        res.status(500).json(error);
      }); 
    });
  },

  delete(req, res) {
    Contest.findById(req.params.companyId).then(function (contest) {
      Prize.destroy({ where: { id: req.params.id } }).then(function (deletedPrize) {
        res.status(200).json(deletedPrize);
      }).catch(function (error){
        res.status(500).json(error);
      });
    }).catch(function (error) {
      res.status(500).json(error);
    }); 
  }
};

