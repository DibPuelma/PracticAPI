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
      Company.findById(req.params.companyId).then(function (company) {
        Contest.findById(req.params.companyId).then(function (contest) {
          Prize.create(req.body).then(function (newPrize) {
              res.status(200).json(newPrize);
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
    req.checkParams(schema);

    req.getValidationResult().then(function(result) {
      Company.findById(req.params.companyId).then(function (company) {
        Contest.findById(req.params.companyId).then(function (contest) {
          Prize.update(req.body, {
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

