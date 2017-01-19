var Company = require('../models/company.js');
var Contest = require('../models/contest.js');

var schema = {
  'name': {
    notEmpty: true,
    isLength: { options: [{ min: 1, max: 30 }] },
    errorMessage: 'Invalid name'
  },
  'draw_date': {
    notEmpty: true,
    toDate: true
  },
  'start_date': {
    notEmpty: true,
    toDate: true
  }
};

module.exports = {
  index(req, res) {
    Company.findById(req.params.companyId).then(function (company) {
      Contest.findAll().then(function (contests) {
        res.status(200).json(contests);
      }).catch(function (error) {
        res.status(500).json(error);
      });
    }).catch(function (error) {
      res.status(500).json(error);
    });  
  },

  show(req, res) {
    Company.findById(req.params.companyId).then(function (company) {
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
    req.checkParams(schema);

    req.getValidationResult().then(function(result) {
      Company.findById(req.params.companyId).then(function (company) {
        Contest.create(req.body).then(function (newContest) {
          res.status(200).json(newContest);
        }).catch(function (error){
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
        Contest.update(req.body, {
          where: {
            id: req.params.id
          }
        }).then(function (updatedContest) {
          res.status(200).json(updatedContest);
        }).catch(function (error){
          res.status(500).json(error);
        });
      }).catch(function (error) {
        res.status(500).json(error);
      });
    });
  },

  delete(req, res) {
    Company.findById(req.params.companyId).then(function (company) {
      Contest.destroy({
        where: {
          id: req.params.id
        }
      }).then(function (deletedContest) {
        res.status(200).json(deletedContest);
      }).catch(function (error){
        res.status(500).json(error);
      });
    }).catch(function (error) {
      res.status(500).json(error);
    });  
  }
};
