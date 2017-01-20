var Company = require('../models/company.js');
var Contest = require('../models/contest.js');
var Prize   = require('../models/prize.js');

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
  var keys = schema.keys();

  var data = {};
  for (var param in req.body)
    if (keys.indexOf(param) > -1) 
      data[type] = req.body[param];

  return data;
}

module.exports = {
  index(req, res) {
    Company.findById(req.params.companyId).then(function (company) {
      Contest.findById(req.params.companyId).then(function (contest) {
        Prize.findAll().then(function (prizes) {
            res.status(200).json(prizes);
          }).catch(function (error) {
            res.status(500).json(error);
          });
      }).catch(function (error) {
        res.status(500).json(error);
      }); 
    }).catch(function (error) {
      res.status(500).json(error);
    });  
  },

  show(req, res) {
    Company.findById(req.params.companyId).then(function (company) {
      Contest.findById(req.params.companyId).then(function (contest) {
        Prize.findById(req.params.id).then(function (prize) {
          res.status(200).json(prize);
        }).catch(function (error){
          res.status(500).json(error);
        });
      }).catch(function (error) {
        res.status(500).json(error);
      }); 
    }).catch(function (error) {
      res.status(500).json(error);
    });  
  },

  create(req, res) {
    req.checkParams(schema);

    req.getValidationResult().then(function(result) {
      if (!result.isEmpty()) {
        res.status(400).send('There have been validation errors: ' + util.inspect(result.array()));
        return;
      }
      var data = filterParams(req);

      Company.findById(req.params.companyId).then(function (company) {
        Contest.findById(req.params.companyId).then(function (contest) {
          Prize.create(data).then(function (newPrize) {
              newPrize.setCompany(company).then(function() {
                newPrize.setContest(contest).then(function() {
                  res.status(200).json(newPrize);
                });
              });
            }).catch(function (error){
              res.status(500).json(error);
            });
        }).catch(function (error) {
          res.status(500).json(error);
        }); 
      }).catch(function (error) {
        res.status(500).json(error);
      });
    });
  },

  update(req, res) {
    req.checkParams(schemaUpdate);

    req.getValidationResult().then(function(result) {
      if (!result.isEmpty()) {
        res.status(400).send('There have been validation errors: ' + util.inspect(result.array()));
        return;
      }
      var data = filterParams(req);

      Company.findById(req.params.companyId).then(function (company) {
        Contest.findById(req.params.companyId).then(function (contest) {
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
      }).catch(function (error) {
        res.status(500).json(error);
      });
    });
  },

  delete(req, res) {
    Company.findById(req.params.companyId).then(function (company) {
      Contest.findById(req.params.companyId).then(function (contest) {
        Prize.destroy({
          where: {
            id: req.params.id
          }
        }).then(function (deletedPrize) {
          res.status(200).json(deletedPrize);
        }).catch(function (error){
          res.status(500).json(error);
        });
      }).catch(function (error) {
        res.status(500).json(error);
      }); 
    }).catch(function (error) {
      res.status(500).json(error);
    });  
  }
};

